import Student from "./Student";

export default class Enrollment {
    student: Student;
    level: string;
    module: string;
    classRoom: string;
    code: string;
    constructor(student: Student,
                 level: string, 
                 module: string, 
                 classRoom: string, 
                 code: string){
                    
                    this.student = student;
                    this.level = level;
                    this.module = module;
                    this.classRoom = classRoom;
                    this.code = code;
    }
}