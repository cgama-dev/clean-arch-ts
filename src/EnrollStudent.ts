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
        const {level, module, classRoom } = enrollmentRequest;
        const levelExist = this.levelRespository.findByCode(level);
        const moduleExist = this.moduleRespository.findByLevelAndCode(level, module);
        const classRoomExist = this.classesRespository.findByLevelAndModuleAndCode(level, module, classRoom);
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf, enrollmentRequest.student.birthDate);
        const studentIsMinimumAge = student.getAge() < moduleExist.minimumAge;
        if(studentIsMinimumAge) throw new Error("Student below minimum age");
        const quantityStudentInClassRoon = this.enrollmentRespository.findAllByClass(level, module, classRoom).length;
        if(quantityStudentInClassRoon === classRoomExist.capacity) throw new Error("Class is over capacity");
        const existingEnrollment = this.enrollmentRespository.findByCpf(enrollmentRequest.student.cpf);
        const sequenceEnrollment = `${this.enrollmentRespository.count() + 1}`.padStart(4,"0");
        const code = `${student.birthDate.getFullYear()}${level}${module}${classRoom}${sequenceEnrollment}`;
        if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");
        const enrollment = new Enrollment(
            student,
            level,
            module,
            classRoom,
            code
        );
        this.enrollmentRespository.save(enrollment);
        return enrollment;
    }
}
