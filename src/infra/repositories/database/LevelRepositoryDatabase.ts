import LevelRepository from '../../../domain/contracts/repositories/LevelRepository';
import Level from '../../../domain/entity/Level';
import ConnectionPool from '../../connectDB/connectionPool';

export default class LevelRepositoryDatabase implements LevelRepository {

    constructor() {
    }

    async findByCode(code: string) {
        const levelData = await ConnectionPool.one("select * from system.level where code = $1", [code]);
        return new Level({
            code: levelData.code,
            description: levelData.description
        });
    }
}