export default interface ModuleRespository{
    findByLevelAndCode(level: string, code: string): any
}