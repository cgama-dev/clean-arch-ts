import ClassesRespositoryMemory from "./ClassesRespositoryMemory"
import EnrollmentRepositoryMemorySingleton from "./EnrollmentRepositoryMemorySingleton"
import LevelRespositoryMemory from "./LevelRespositoryMemory"
import ModuleRespositoryMemory from "./ModuleRespositoryMemory"
import RepositoryAbstractFactory from "../../../domain/contracts/repositories/RepositoryAbstractFactory"

export default class RepositoryMemoryFactory implements RepositoryAbstractFactory {

    constructor() {
        EnrollmentRepositoryMemorySingleton.destroy();
    }
    createLevelRepository() {
        return new LevelRespositoryMemory()
    }
    createModuleRepository() {
        return new ModuleRespositoryMemory()
    }
    createClassRoomRepository() {
        return new ClassesRespositoryMemory()
    }
    createEnrollmentRepository() {
        return EnrollmentRepositoryMemorySingleton.getInstance()
    }
}
