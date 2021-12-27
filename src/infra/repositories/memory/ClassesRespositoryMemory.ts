import ClassesRespository from "../../../domain/contracts/repositories/ClassRepository";
import ClassRoom from "../../../domain/entity/ClassRoom";

export default class ClassesRespositoryMemory implements ClassesRespository {
    classes: ClassRoom[];
    constructor() {
        this.classes = [
            new ClassRoom({
                level: "EM",
                module: "3",
                code: "A",
                capacity: 2,
                startDate: new Date(), // Essa classe sempre inicia do dia atual(o dia que esta testando ...)
                endDate: new Date("2022-11-15")
            }),
            new ClassRoom({
                level: "EM",
                module: "1",
                code: "B",
                capacity: 5,
                startDate: new Date("2021-05-01"),
                endDate: new Date("2021-05-30")
            }),
            new ClassRoom({
                level: "EM",
                module: "1",
                code: "C",
                capacity: 5,
                startDate: new Date("2021-08-09"),
                endDate: new Date("2022-02-31") // Deve ser maior que a data atual
            })
        ]
    }
    async findByLevelAndModuleAndCode(level: string, module: string, code: string): Promise<ClassRoom> {
        const classRoom = this.classes.find(item => item.level === level && item.module === module && item.code === code);
        if (!classRoom) throw new Error("Invalid class Room");
        return classRoom;
    }

}