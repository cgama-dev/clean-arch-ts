import ClassRoom from "./ClassRoom";
export default interface ClassesRespository{
    findByLevelAndModuleAndCode(level: string, module: string, code: string): ClassRoom;
}