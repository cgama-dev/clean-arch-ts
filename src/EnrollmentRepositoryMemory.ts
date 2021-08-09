import EnrollmentRepository from "./EnrollmentRepository";
import Enrollment from "./Enrollment";
import Module from "./Module";
import Level from "./Level";
import ClassRoom from "./ClassRoom";

export default class EnrollmentRepositoryMemory implements EnrollmentRepository{
    enrollments: Enrollment[];
    constructor(){
        this.enrollments = []
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