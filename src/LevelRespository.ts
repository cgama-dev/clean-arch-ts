import Level from "./Level";
export default interface LevelRespository {
    findByCode(code: string): Level;
}

