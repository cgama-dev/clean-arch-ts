import Student from "../entity/Student";
import EnrollmentRepository from "../contracts/repositories/EnrollmentRepository";
import LevelRespository from "../contracts/repositories/LevelRepository";
import ModuleRespository from "../contracts/repositories/ModuleRepository";
import ClassesRespository from "../contracts/repositories/ClassRepository";
import Enrollment from "../entity/Enrollment";
import RepositoryAbstractFactory from "../contracts/repositories/RepositoryAbstractFactory";
import { EnrollStudentDTO } from "../contracts/dto/EnrollStudentDTO";

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

    async execute(enrollmentDTOInput: EnrollStudentDTO.Input): Promise<EnrollStudentDTO.Output> {
        const level = await this.levelRespository.findByCode(enrollmentDTOInput.level);
        const module = await this.moduleRespository.findByLevelAndCode(enrollmentDTOInput.level, enrollmentDTOInput.module);
        const classRoom = await this.classesRespository.findByLevelAndModuleAndCode(enrollmentDTOInput.level, enrollmentDTOInput.module, enrollmentDTOInput.classroom);
        const student = new Student(enrollmentDTOInput.studentName, enrollmentDTOInput.studentCpf, enrollmentDTOInput.studentBirthDate);
        const quantityStudentInClassRoon = await this.enrollmentRespository.findAllByClass(level, module, classRoom);
        if (quantityStudentInClassRoon!.length === classRoom.capacity) throw new Error("Class is over capacity");
        const existingEnrollment = await this.enrollmentRespository.findByCpf(enrollmentDTOInput.studentCpf);
        const sequenceEnrollment = await this.enrollmentRespository.count() + 1;
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
