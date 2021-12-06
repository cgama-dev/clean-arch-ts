import EnrollStudent from "./EnrollStudent";
import GetEnrollment from "./GetEnrollment";
import PayInvoice from "./PayInvoice";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";
import { EnrollStudentDTO } from "./EnrollStudentDTO";
import { PayInvoiceDTO } from "./PayInvoiceDTO";

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let payInvoice: PayInvoice;

beforeEach(function () {
    const repositoryMemoryFactory = new RepositoryMemoryFactory()
    enrollStudent = new EnrollStudent(repositoryMemoryFactory);
    getEnrollment = new GetEnrollment(repositoryMemoryFactory);
    payInvoice = new PayInvoice(repositoryMemoryFactory);
});

test.only("Should pay enrollment invoice", function () {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Ana Maria",
        studentCpf: "864.464.227-84",
        studentBirthDate: "2002-10-10",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    enrollStudent.execute(enrollmentRequest);
    payInvoice.execute(new PayInvoiceDTO.Input({
        code: "2021EM3A0001",
        month: 7,
        year: 2021,
        amount: 1416.66,
        paymentDate: new Date("2021-06-20")
    }));

    const getEnrollmentOutputData = getEnrollment.execute("2021EM3A0001", new Date("2021-06-20"));
    expect(getEnrollmentOutputData.code).toBe("2021EM3A0001");
    expect(getEnrollmentOutputData.balance).toBe(15583.33);
});

test.only("Should pay overdue invoice", function () {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Ana Maria",
        studentCpf: "864.464.227-84",
        studentBirthDate: "2002-10-10",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    enrollStudent.execute(enrollmentRequest);
    const getEnrollmentOutputDataBefore = getEnrollment.execute("2021EM3A0001", new Date("2021-06-20"));
    payInvoice.execute(new PayInvoiceDTO.Input({
        code: "2021EM3A0001",
        month: 1,
        year: 2021,
        amount: 3895.82,
        paymentDate: new Date("2021-06-20")
    }));
    const getEnrollmentOutputDataAfter = getEnrollment.execute("2021EM3A0001", new Date("2021-06-20"));
    expect(getEnrollmentOutputDataAfter.code).toBe("2021EM3A0001");
    expect(getEnrollmentOutputDataAfter.invoices[0].balance).toBe(0);
});