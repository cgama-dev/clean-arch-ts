import ModuleRepository from '../../../domain/contracts/repositories/ModuleRepository';
import Module from '../../../domain/entity/Module';
import ConnectionPool from '../../connectDB/connectionPool';

export default class ModuleRespositoryData implements ModuleRepository {
    async findByLevelAndCode(level: string, code: string): Promise<Module> {
        const moduleData = await ConnectionPool.one("select * from system.module where level = $1 and code = $2", [level, code])
        return new Module({
            level: moduleData.level,
            code: moduleData.code,
            description: moduleData.description,
            price: moduleData.price,
            minimumAge: moduleData.minimum_age
        })
    }
}