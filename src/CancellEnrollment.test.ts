import CancellEnrollment from './CancellEnrollment';
import EnrollStudent from "./EnrollStudent";
import { EnrollStudentDTO } from "./EnrollStudentDTO";
import GetEnrollment from "./GetEnrollment";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let cancellEnrollment: CancellEnrollment;

beforeEach(() => {
    const respositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudent = new EnrollStudent(respositoryMemoryFactory);
    getEnrollment = new GetEnrollment(respositoryMemoryFactory);
    cancellEnrollment = new CancellEnrollment(respositoryMemoryFactory);
});

test.only("Shold cancell enrollment", () => {
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
    cancellEnrollment.execute("2021EM3A0001");
    const getEnrollmentOutputData = getEnrollment.execute("2021EM3A0001", new Date("2021-11-14"));
    expect(getEnrollmentOutputData.status).toBe("cancel");
})
