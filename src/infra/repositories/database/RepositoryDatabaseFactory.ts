import RepositoryAbstractFactory from "../../../domain/contracts/repositories/RepositoryAbstractFactory"
import LevelRepositoryDatabase from './LevelRepositoryDatabase'
import ModuleRepositoryDatabase from './ModuleRepositoryDatabase'
import ClassRepositoryDatabase from './ClassRepositoryDatabase'
import EnrollmentRepositoryDatabase from './EnrollmentRepositoryDatabase'

export default class RepositoryDatabaseFactory implements RepositoryAbstractFactory {

    constructor() {
    }
    createLevelRepository() {
        return new LevelRepositoryDatabase()
    }
    createModuleRepository() {
        return new ModuleRepositoryDatabase()
    }
    createClassRoomRepository() {
        return new ClassRepositoryDatabase()
    }
    createEnrollmentRepository() {
        return new EnrollmentRepositoryDatabase()
    }
}
