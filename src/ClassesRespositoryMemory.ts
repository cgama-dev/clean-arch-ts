import ClassesRespository from "./ClassesRespository";

export default class ClassesRespositoryMemory implements ClassesRespository{

    classes: any[];

    constructor(){
        this.classes = [
            {
                level: "EM",
                module: "3",
                code: "A",
                capacity: 2
            }
        ]
    }
    findByLevelAndModuleAndCode(level: string, module: string, code: string) {
        const classRoom = this.classes.find(item => item.level === level && item.module === module && item.code === code);    
        if(!classRoom) throw new Error("Invalid class Room");
        return classRoom;
    }

}