import LevelRespository from "./LevelRespository";

export default class LevelRespositoryMemory implements LevelRespository{
    levels: any[];
    constructor(){
        this.levels = [
            {
                code: "EF1",
                description: "Ensino Fundamental I"
            },
            {
                code: "EF2",
                description: "Ensino Fundamental II"
            },
            {
                code: "EM",
                description: "Ensino Médio"
            }
        ];
    }
    findByCode(code: string) {
        const level =  this.levels.find(item => item.code === code);
        if(!level) throw new Error("Invalid level");
        return level
    }
}