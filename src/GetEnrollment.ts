import EnrollmentRepository from "./EnrollmentRepository";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";

export default class GetEnrollment {
    
    enrollmentRespository:EnrollmentRepository;
    
    constructor (repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRespository = repositoryFactory.createEnrollmentRepository();
    }
    
    execute(code: string): any{
        const enrollment = this.enrollmentRespository.get(code)
        const balance = enrollment?.getInvoiceBalance();
        return {
            code: enrollment?.code.value,
            balance
        };
    }
}
