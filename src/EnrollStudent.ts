import Student from "./Student";
import EnrollmentRepository from "./EnrollmentRepository";
import LevelRespository from "./LevelRespository";
import ModuleRespository from "./ModuleRespository";
import ClassesRespository from "./ClassesRespository";
import Enrollment from "./Enrollment";

export default class EnrollStudent {
    levelRespository: LevelRespository;
    enrollmentRespository:EnrollmentRepository;
    moduleRespository : ModuleRespository;
    classesRespository : ClassesRespository;

    constructor (levelRespository:LevelRespository,
                 moduleRespository: ModuleRespository, 
                 classesRespository: ClassesRespository, 
                 enrollmentRespository: EnrollmentRepository) {
        this.enrollmentRespository = enrollmentRespository;
        this.levelRespository = levelRespository;
        this.moduleRespository = moduleRespository;
        this.classesRespository = classesRespository;
    }
    
    execute (enrollmentRequest: any) {

        const level = this.levelRespository.findByCode(enrollmentRequest.level);
        const module = this.moduleRespository.findByLevelAndCode(enrollmentRequest.level, enrollmentRequest.module);
        const classRoom = this.classesRespository.findByLevelAndModuleAndCode(enrollmentRequest.level, enrollmentRequest.module, enrollmentRequest.classRoom);
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf, enrollmentRequest.student.birthDate);
        const quantityStudentInClassRoon = this.enrollmentRespository.findAllByClass(level, module, classRoom).length;
        if(quantityStudentInClassRoon === classRoom.capacity) throw new Error("Class is over capacity");
        const existingEnrollment = this.enrollmentRespository.findByCpf(enrollmentRequest.student.cpf);
        const sequenceEnrollment = this.enrollmentRespository.count() + 1;
        const issueDate = new Date();
        if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");
        const enrollment = new Enrollment(
            student,
            level,
            module,
            classRoom,
            issueDate,
            sequenceEnrollment,
            enrollmentRequest.installments
        );
        this.enrollmentRespository.save(enrollment);
        return enrollment;
    }
}
