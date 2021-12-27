import Level from "../../../domain/entity/Level";
import LevelRespository from "../../../domain/contracts/repositories/LevelRepository";
export default class LevelRespositoryMemory implements LevelRespository {
    levels: Level[];
    constructor() {
        this.levels = [
            new Level({
                code: "EF1",
                description: "Ensino Fundamental I"
            }),
            new Level({
                code: "EF2",
                description: "Ensino Fundamental II"
            }),
            new Level({
                code: "EM",
                description: "Ensino Médio"
            })
        ];
    }
    async findByCode(code: string) {
        const level = this.levels.find(item => item.code === code);
        if (!level) throw new Error("Invalid level");
        return level
    }
}