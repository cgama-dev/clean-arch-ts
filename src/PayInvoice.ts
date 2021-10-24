import EnrollmentRepository from "./EnrollmentRepository";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";

export default class PayInvoce {
    
    enrollmentRespository:EnrollmentRepository;
    
    constructor (repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRespository = repositoryFactory.createEnrollmentRepository();
    }
    
    execute(code: string, month: number, year: number, amount: number): any{
        const enrollment = this.enrollmentRespository.get(code)
        if (!enrollment) throw new Error("Enrollment not found");
        enrollment.payInvoice(month, year, amount);
    }
}
