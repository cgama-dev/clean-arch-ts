import Student from "./Student";
import EnrollmentRepository from "./EnrollmentRepository";
import LevelRespository from "./LevelRespository";
import ModuleRespository from "./ModuleRespository";
import ClassesRespository from "./ClassesRespository";
import Enrollment from "./Enrollment";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";
import { EnrollStudentDTO } from "./EnrollStudentDTO";

export default class EnrollStudent {
    levelRespository: LevelRespository;
    enrollmentRespository: EnrollmentRepository;
    moduleRespository: ModuleRespository;
    classesRespository: ClassesRespository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRespository = repositoryFactory.createEnrollmentRepository();
        this.levelRespository = repositoryFactory.createLevelRepository();
        this.moduleRespository = repositoryFactory.createModuleRepository();
        this.classesRespository = repositoryFactory.createClassRoomRepository();
    }

    execute(enrollmentDTOInput: EnrollStudentDTO.Input): EnrollStudentDTO.Output {
        const level = this.levelRespository.findByCode(enrollmentDTOInput.level);
        const module = this.moduleRespository.findByLevelAndCode(enrollmentDTOInput.level, enrollmentDTOInput.module);
        const classRoom = this.classesRespository.findByLevelAndModuleAndCode(enrollmentDTOInput.level, enrollmentDTOInput.module, enrollmentDTOInput.classroom);
        const student = new Student(enrollmentDTOInput.studentName, enrollmentDTOInput.studentCpf, enrollmentDTOInput.studentBirthDate);
        const quantityStudentInClassRoon = this.enrollmentRespository.findAllByClass(level, module, classRoom).length;
        if (quantityStudentInClassRoon === classRoom.capacity) throw new Error("Class is over capacity");
        const existingEnrollment = this.enrollmentRespository.findByCpf(enrollmentDTOInput.studentCpf);
        const sequenceEnrollment = this.enrollmentRespository.count() + 1;
        const issueDate = new Date(); // Data atual ...
        if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");

        const enrollment = new Enrollment(
            student,
            level,
            module,
            classRoom,
            issueDate,
            sequenceEnrollment,
            enrollmentDTOInput.installments
        );
        this.enrollmentRespository.save(enrollment);
        const enrollmentStudentDTOOutput = new EnrollStudentDTO.Output(enrollment.code.value);
        for (const invoice of enrollment.invoices) {
            enrollmentStudentDTOOutput.invoices = [...enrollmentStudentDTOOutput.invoices, invoice];
        }
        return enrollmentStudentDTOOutput;
    }
}
