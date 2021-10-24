import EnrollmentRepository from "./EnrollmentRepository";
import Enrollment from "./Enrollment";
import Module from "./Module";
import Level from "./Level";
import ClassRoom from "./ClassRoom";

export default class EnrollmentRepositoryMemory implements EnrollmentRepository{
    enrollments: Enrollment[];
    uuid: Number;
    constructor(){
        this.enrollments = []
        this.uuid = Math.floor(Math.random() * 100)
    }
    get(code: string): Enrollment | undefined {
        const enrollment = this.enrollments.find(enrollment => {
            return enrollment.code.value === code
        })
        return enrollment;
    }
    save(enrollment: Enrollment) {
        this.enrollments.push(enrollment);
    }    
    findAllByClass(level:Level, module: Module, classRoom: ClassRoom):Enrollment[] {
       return this.enrollments.filter((enrollment: Enrollment) => {
            return enrollment.level.code === level.code && enrollment.module.code === module.code && enrollment.classRoom.code === classRoom.code;
       })
    }
    findByCpf(cpf: string): Enrollment | undefined{
        return this.enrollments.find(enrollment => enrollment.student.cpf.value === cpf);
    }
    count() {
        return this.enrollments.length;
    }
}