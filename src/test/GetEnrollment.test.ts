import EnrollStudent from "../domain/usecase/EnrollStudent";
import { EnrollStudentDTO } from "../domain/contracts/dto/EnrollStudentDTO";
import GetEnrollment from "../domain/usecase/GetEnrollment";
import RepositoryMemoryFactory from "../infra/repositories/memory/RepositoryMemoryFactory";

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;

beforeEach(() => {
    const respositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudent = new EnrollStudent(respositoryMemoryFactory);
    getEnrollment = new GetEnrollment(respositoryMemoryFactory);
});

test("Shold get enrollment with balance", async () => {
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
    const getEnrollmentOutputData = await getEnrollment.execute("2021EM3A0001", new Date("2021-11-14"));
    expect(getEnrollmentOutputData.code).toBe("2021EM3A0001");
    expect(getEnrollmentOutputData.balance).toBe(16999.99);
})

test("Shold calculate due date and return status open or overdue for each invoce", async () => {
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
    const getEnrollmentOutputData = await getEnrollment.execute("2021EM3A0001", new Date("2021-11-14"));
    expect(getEnrollmentOutputData.code).toBe("2021EM3A0001");
    expect(getEnrollmentOutputData.invoices[0].dueDate.toISOString()).toBe("2021-01-05T03:00:00.000Z");
    expect(getEnrollmentOutputData.invoices[0].status).toBe("overdue");
    expect(getEnrollmentOutputData.invoices[11].dueDate.toISOString()).toBe("2021-12-05T03:00:00.000Z");
    expect(getEnrollmentOutputData.invoices[11].status).toBe("open");
})
test("Shold calculate due date and interests", async () => {
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
    const getEnrollmentOutputData = await getEnrollment.execute("2021EM3A0001", new Date("2021-11-14"));
    expect(getEnrollmentOutputData.code).toBe("2021EM3A0001");
    expect(getEnrollmentOutputData.invoices[0].dueDate.toISOString()).toBe("2021-01-05T03:00:00.000Z");
    expect(getEnrollmentOutputData.invoices[0].status).toBe("overdue");
    expect(getEnrollmentOutputData.invoices[0].penalty).toBe(141.67);
    expect(getEnrollmentOutputData.invoices[0].interests).toBe(4419.98);
    expect(getEnrollmentOutputData.invoices[11].penalty).toBe(0);
    expect(getEnrollmentOutputData.invoices[11].interests).toBe(0);

    console.log(getEnrollmentOutputData.invoices[0])
})
