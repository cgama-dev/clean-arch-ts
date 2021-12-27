import ClassRepository from '../../../domain/contracts/repositories/ClassRepository';
import ClassRoom from '../../../domain/entity/ClassRoom';
import ConnectionPool from '../../connectDB/connectionPool';

export default class ClassroomRepositoryDatabase implements ClassRepository {
    async findByLevelAndModuleAndCode(level: string, module: string, code: string): Promise<ClassRoom> {
        const classData = await ConnectionPool.one("select * from system.classroom where level = $1 and code = $2", [code, level])
        return new ClassRoom({
            level: classData.level,
            module: classData.module,
            code: classData.code,
            capacity: classData.capacity,
            startDate: classData.start_date,
            endDate: classData.end_date
        })
    }
}