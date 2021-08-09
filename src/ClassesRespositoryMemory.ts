import ClassesRespository from "./ClassesRespository";
import ClassRoom from "./ClassRoom";

export default class ClassesRespositoryMemory implements ClassesRespository{
    classes: ClassRoom[];
    constructor(){
        this.classes =[
           new ClassRoom({
                level: "EM",
                module: "3",
                code: "A",
                capacity: 2,
                startDate: new Date ("2021-09-01"),
                endDate: new Date ("2021-12-15")
            }),
           new ClassRoom({
                level: "EM",
                module: "1",
                code: "B",
                capacity: 5,
                startDate: new Date ("2021-05-01"),
                endDate: new Date("2021-05-30")
            }),
           new ClassRoom({
                level: "EM",
                module: "1",
                code: "C",
                capacity: 5,
                startDate: new Date("2021-07-09"),
                endDate: new Date("2021-10-07")
            })
        ]
    }
    findByLevelAndModuleAndCode(level: string, module: string, code: string) {
        const classRoom = this.classes.find(item => item.level === level && item.module === module && item.code === code);
        if(!classRoom) throw new Error("Invalid class Room");
        return classRoom;
    }

}