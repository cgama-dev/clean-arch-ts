import { EnrollStudentDTO } from '../../domain/contracts/dto/EnrollStudentDTO';
import { GetEnrollmentDTO } from '../../domain/contracts/dto/GetEnrollmentDTO';
import { GetEnrollmentsDTO } from '../../domain/contracts/dto/GetEnrollmentsDTO';
import { PayInvoiceDTO } from '../../domain/contracts/dto/PayInvoiceDTO';
import RepositoryAbstractFactory from '../../domain/contracts/repositories/RepositoryAbstractFactory';
import CancellEnrollment from '../../domain/usecase/CancellEnrollment';
import EnrollStudent from '../../domain/usecase/EnrollStudent';
import GetEnrollment from '../../domain/usecase/GetEnrollment';
import GetEnrollments from '../../domain/usecase/GetEnrollments';
import PayInvoice from '../../domain/usecase/PayInvoice';

export default class EnrollmentController {
    repositoryFactory: RepositoryAbstractFactory;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async enrollStudent(params: any, body: any): Promise<EnrollStudentDTO.Output> {
        const enrollStudent = new EnrollStudent(this.repositoryFactory);
        const enrollStudentInputData = new EnrollStudentDTO.Input(body);
        const enrollStudentOutputData = await enrollStudent.execute(enrollStudentInputData);
        return enrollStudentOutputData;
    }

    async getEnrollment(params: any, body: any): Promise<GetEnrollmentDTO.Output> {
        const code = params.code;
        const currentDate = new Date();
        const getEnrollment = new GetEnrollment(this.repositoryFactory);
        const getEnrollmentOutputData = await getEnrollment.execute(code, currentDate);
        return getEnrollmentOutputData;
    }

    async getEnrollments(params: any, body: any): Promise<GetEnrollmentsDTO.Output[]> {
        const currentDate = new Date();
        const getEnrollments = new GetEnrollments(this.repositoryFactory);
        const getEnrollmentsOutputData = await getEnrollments.execute(currentDate);
        return getEnrollmentsOutputData;
    }

    async cancelEnrollment(params: any, body: any): Promise<void> {
        const cancelEnrollment = new CancellEnrollment(this.repositoryFactory);
        await cancelEnrollment.execute(params.code);
        return;
    }

    async payInvoice(params: any, body: any): Promise<void> {
        const payInvoice = new PayInvoice(this.repositoryFactory);
        const payInvoiceInputData = new PayInvoiceDTO.Input(body);
        await payInvoice.execute(payInvoiceInputData);
        return;
    }
}

