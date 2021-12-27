import ClassesRespository from "./ClassRepository"
import EnrollmentRepository from "./EnrollmentRepository"
import LevelRespository from "./LevelRepository"
import ModuleRespository from "./ModuleRepository"

export default interface RepositoryAbstractFactory {
    createLevelRepository(): LevelRespository;
    createModuleRepository(): ModuleRespository;
    createClassRoomRepository(): ClassesRespository;
    createEnrollmentRepository(): EnrollmentRepository
}