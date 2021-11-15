import EnrollmentRepository from "./EnrollmentRepository";
import { EnrollStudentDTO } from './EnrollStudentDTO';
import { GetEnrollmentDTO } from './GetEnrollmentDTO';
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";

export default class GetEnrollment {

    enrollmentRespository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRespository = repositoryFactory.createEnrollmentRepository();
    }

    execute(code: string, currentDate: Date): GetEnrollmentDTO.Output {
        const enrollment = this.enrollmentRespository.get(code);
        if (!enrollment) throw new Error("Enrollment not found");
        const balance = enrollment?.getInvoiceBalance();

        const getEnrollmentOutputData = new GetEnrollmentDTO.Output({
            code: enrollment.code.value,
            balance,
            status: enrollment.status,
            invoices: []
        });

        for (const invoice of enrollment.invoices) {
            getEnrollmentOutputData.invoices.push({
                amount: invoice.amount,
                status: invoice.getStatus(currentDate),
                dueDate: invoice.dueDate,
                penalty: invoice.getPenalty(currentDate),
                interests: invoice.getInterests(currentDate),
                balance: invoice.getBalance()
            });
        }

        return getEnrollmentOutputData;
    }
}
