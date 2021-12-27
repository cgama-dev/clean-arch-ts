import EnrollmentRepository from "../contracts/repositories/EnrollmentRepository";
import { PayInvoiceDTO } from '../contracts/dto/PayInvoiceDTO';
import RepositoryAbstractFactory from "../contracts/repositories/RepositoryAbstractFactory";

export default class PayInvoce {

    enrollmentRespository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRespository = repositoryFactory.createEnrollmentRepository();
    }

    async execute({ code, month, year, amount, paymentDate }: PayInvoiceDTO.Input): Promise<any> {
        const enrollment = await this.enrollmentRespository.get(code)
        if (!enrollment) throw new Error("Enrollment not found");
        enrollment.payInvoice(month, year, amount, paymentDate);
    }
}
