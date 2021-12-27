import CancellEnrollment from '../domain/usecase/CancellEnrollment';
import EnrollStudent from "../domain/usecase/EnrollStudent";
import { EnrollStudentDTO } from "../domain/contracts/dto/EnrollStudentDTO";
import GetEnrollment from "../domain/usecase/GetEnrollment";
import RepositoryMemoryFactory from "../infra/repositories/memory/RepositoryMemoryFactory";

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let cancellEnrollment: CancellEnrollment;

beforeEach(() => {
    const respositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudent = new EnrollStudent(respositoryMemoryFactory);
    getEnrollment = new GetEnrollment(respositoryMemoryFactory);
    cancellEnrollment = new CancellEnrollment(respositoryMemoryFactory);
});

test("Shold cancell enrollment", async () => {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    await enrollStudent.execute(enrollmentRequest);
    cancellEnrollment.execute("2021EM3A0001");
    const getEnrollmentOutputData = await getEnrollment.execute("2021EM3A0001", new Date("2021-11-14"));
    expect(getEnrollmentOutputData.status).toBe("cancel");
})
