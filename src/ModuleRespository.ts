import Module from "./Module";
export default interface ModuleRespository{
    findByLevelAndCode(level: string, code: string): Module
}