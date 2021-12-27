import EnrollmentRepository from "../contracts/repositories/EnrollmentRepository";
import RepositoryAbstractFactory from "../contracts/repositories/RepositoryAbstractFactory";

export default class CancellEnrollment {

    enrollmentRespository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRespository = repositoryFactory.createEnrollmentRepository();
    }

    async execute(code: string): Promise<void> {
        const enrollment = await this.enrollmentRespository.get(code)
        if (!enrollment) throw new Error("Enrollment not found")
        enrollment.status = "cancel"
    }
}
