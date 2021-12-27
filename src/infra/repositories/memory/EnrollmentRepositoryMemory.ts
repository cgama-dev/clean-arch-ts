import EnrollmentRepository from "../../../domain/contracts/repositories/EnrollmentRepository";
import Enrollment from "../../../domain/entity/Enrollment";
import Module from "../../../domain/entity/Module";
import Level from "../../../domain/entity/Level";
import ClassRoom from "../../../domain/entity/ClassRoom";

export default class EnrollmentRepositoryMemory implements EnrollmentRepository {
    enrollments: Enrollment[];
    uuid: Number;
    constructor() {
        this.enrollments = []
        this.uuid = Math.floor(Math.random() * 100)
    }
    async get(code: string): Promise<Enrollment | undefined> {
        const enrollment = this.enrollments.find(enrollment => {
            return enrollment.code.value === code
        })
        return enrollment;
    }
    save(enrollment: Enrollment) {
        this.enrollments.push(enrollment);
    }
    async findAllByClass(level: Level, module: Module, classRoom: ClassRoom): Promise<Enrollment[]> {
        return this.enrollments.filter((enrollment: Enrollment) => {
            return enrollment.level.code === level.code && enrollment.module.code === module.code && enrollment.classRoom.code === classRoom.code;
        })
    }
    async findByCpf(cpf: string): Promise<Enrollment | undefined> {
        return this.enrollments.find(enrollment => enrollment.student.cpf.value === cpf);
    }
    async getAll(): Promise<Enrollment[]> {
        return Promise.resolve(this.enrollments);
    }
    async count() {
        return this.enrollments.length;
    }
}