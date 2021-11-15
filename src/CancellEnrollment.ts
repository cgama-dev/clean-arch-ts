import EnrollmentRepository from "./EnrollmentRepository";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";

export default class CancellEnrollment {

    enrollmentRespository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRespository = repositoryFactory.createEnrollmentRepository();
    }

    execute(code: string): void {
        const enrollment = this.enrollmentRespository.get(code)
        if (!enrollment) throw new Error("Enrollment not found")
        enrollment.status = "cancel"
    }
}
