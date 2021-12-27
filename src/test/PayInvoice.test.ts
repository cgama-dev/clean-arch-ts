import EnrollStudent from "../domain/usecase/EnrollStudent";
import GetEnrollment from "../domain/usecase/GetEnrollment";
import PayInvoice from "../domain/usecase/PayInvoice";
import RepositoryMemoryFactory from "../infra/repositories/memory/RepositoryMemoryFactory";
import { EnrollStudentDTO } from "../domain/contracts/dto/EnrollStudentDTO";
import { PayInvoiceDTO } from "../domain/contracts/dto/PayInvoiceDTO";

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let payInvoice: PayInvoice;

beforeEach(function () {
    const repositoryMemoryFactory = new RepositoryMemoryFactory()
    enrollStudent = new EnrollStudent(repositoryMemoryFactory);
    getEnrollment = new GetEnrollment(repositoryMemoryFactory);
    payInvoice = new PayInvoice(repositoryMemoryFactory);
});

test.only("Should pay enrollment invoice", async function () {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Ana Maria",
        studentCpf: "864.464.227-84",
        studentBirthDate: "2002-10-10",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    await enrollStudent.execute(enrollmentRequest);
    payInvoice.execute(new PayInvoiceDTO.Input({
        code: "2021EM3A0001",
        month: 7,
        year: 2021,
        amount: 1416.66,
        paymentDate: new Date("2021-06-20")
    }));

    const getEnrollmentOutputData = await getEnrollment.execute("2021EM3A0001", new Date("2021-06-20"));
    expect(getEnrollmentOutputData.code).toBe("2021EM3A0001");
    expect(getEnrollmentOutputData.balance).toBe(15583.33);
});

test("Should pay overdue invoice", async function () {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Ana Maria",
        studentCpf: "864.464.227-84",
        studentBirthDate: "2002-10-10",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    await enrollStudent.execute(enrollmentRequest);
    getEnrollment.execute("2021EM3A0001", new Date("2021-06-20"));
    payInvoice.execute(new PayInvoiceDTO.Input({
        code: "2021EM3A0001",
        month: 1,
        year: 2021,
        amount: 3895.82,
        paymentDate: new Date("2021-06-20")
    }));
    const getEnrollmentOutputDataAfter = await getEnrollment.execute("2021EM3A0001", new Date("2021-06-20"));
    expect(getEnrollmentOutputDataAfter.code).toBe("2021EM3A0001");
    expect(getEnrollmentOutputDataAfter.invoices[0].balance).toBe(0);
});