import ClassesRespository from "./ClassesRespository"
import EnrollmentRepository from "./EnrollmentRepository"
import LevelRespository from "./LevelRespository"
import ModuleRespository from "./ModuleRespository"

export default interface RepositoryAbstractFactory {
    createLevelRepository(): LevelRespository;
    createModuleRepository(): ModuleRespository;
    createClassRoomRepository(): ClassesRespository;
    createEnrollmentRepository(): EnrollmentRepository
}