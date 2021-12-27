import ClassRoom from "../../entity/ClassRoom";
export default interface ClassRepository {
    findByLevelAndModuleAndCode(level: string, module: string, code: string): Promise<ClassRoom>;
}