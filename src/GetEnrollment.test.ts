import EnrollStudent from "./EnrollStudent";
import { EnrollStudentDTO } from "./EnrollStudentDTO";
import GetEnrollment from "./GetEnrollment";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;

beforeEach(() => {
    const respositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudent = new EnrollStudent(respositoryMemoryFactory);
    getEnrollment = new GetEnrollment(respositoryMemoryFactory);
});

test.only("Shold get enrollment with balance", () => {
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
    const getEnrollmentOutputData = getEnrollment.execute("2021EM3A0001");
    expect(getEnrollmentOutputData.code).toBe("2021EM3A0001");
    expect(getEnrollmentOutputData.balance).toBe(16999.99);
})
