import EnrollStudent from "./EnrollStudent";
import { EnrollStudentDTO } from "./EnrollStudentDTO";
import GetEnrollment from "./GetEnrollment";
import PayInvoce from "./PayInvoice";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let payInvoce: PayInvoce;

beforeEach(() => {
    const respositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudent = new EnrollStudent(respositoryMemoryFactory);
    getEnrollment = new GetEnrollment(respositoryMemoryFactory);
    payInvoce = new PayInvoce(respositoryMemoryFactory);
});

test.only("Shold pay enrollment invoice", () => {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    enrollStudent.execute(enrollmentRequest);
    payInvoce.execute("2021EM3A0001", 1, 2021, 1416.73)
    const getEnrollmentOutputData = getEnrollment.execute("2021EM3A0001");
    expect(getEnrollmentOutputData.code).toBe("2021EM3A0001");
    expect(getEnrollmentOutputData.balance).toBe(15583.4);
})
