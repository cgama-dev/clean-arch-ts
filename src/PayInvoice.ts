import EnrollmentRepository from "./EnrollmentRepository";
import { PayInvoiceDTO } from './PayInvoiceDTO';
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";

export default class PayInvoce {

    enrollmentRespository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRespository = repositoryFactory.createEnrollmentRepository();
    }

    execute({ code, month, year, amount, paymentDate }: PayInvoiceDTO.Input): any {
        const enrollment = this.enrollmentRespository.get(code)
        if (!enrollment) throw new Error("Enrollment not found");
        enrollment.payInvoice(month, year, amount,paymentDate);
    }
}
