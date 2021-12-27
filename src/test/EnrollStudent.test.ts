import EnrollStudent from "../domain/usecase/EnrollStudent";
import { EnrollStudentDTO } from "../domain/contracts/dto/EnrollStudentDTO";
import RepositoryMemoryFactory from "../infra/repositories/memory/RepositoryMemoryFactory";

let enrollStudent: EnrollStudent;

beforeEach(() => {
    enrollStudent = new EnrollStudent(new RepositoryMemoryFactory());
});

test("Should not enroll without valid student name", async function () {

    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Ana",
        studentCpf: "213.345.654-10",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    await expect(() => enrollStudent.execute(enrollmentRequest)).rejects.toThrow(new Error("Invalid name"));
});
test("Should not enroll without valid student cpf", async function () {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Ana Maria",
        studentCpf: "213.345.654-10",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    await expect(() => enrollStudent.execute(enrollmentRequest)).rejects.toThrow(new Error("Invalid cpf"));
});
test("Should not enroll duplicated student", async function () {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Ana Maria",
        studentCpf: "864.464.227-84",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    await enrollStudent.execute(enrollmentRequest);
    await expect(() => enrollStudent.execute(enrollmentRequest)).rejects.toThrow(new Error("Enrollment with duplicated student is not allowed"));
});
test("Should generate enrollment code", async () => {

    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    const enrollment = await enrollStudent.execute(enrollmentRequest);
    await expect(enrollment.code).toBe("2021EM3A0001");
});
test("Should not enroll student below minimum age", async () => {

    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Maria Carolina Fonseca",
        studentCpf: "950.948.090-83",
        studentBirthDate: "2006-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    await expect(() => enrollStudent.execute(enrollmentRequest)).rejects.toThrow(new Error("Student below minimum age"));
});
test("Should not enroll student over class capacity", async () => {

    const enrollmentRequest1 = new EnrollStudentDTO.Input({
        studentName: "Samantha Sobrenome",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    const enrollmentRequest2 = new EnrollStudentDTO.Input({
        studentName: "Cleyton Sobrenome",
        studentCpf: "023.035.510-21",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    const enrollmentRequest3 = new EnrollStudentDTO.Input({
        studentName: "Luisa Sobrenome",
        studentCpf: "935.390.550-88",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    await enrollStudent.execute(enrollmentRequest1);
    await enrollStudent.execute(enrollmentRequest2);
    await expect(() => enrollStudent.execute(enrollmentRequest3)).rejects.toThrow(new Error("Class is over capacity"));
});
test("Não deve matricular depois do fim das aulas", async () => {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "1",
        classroom: "B",
        installments: 12
    })
    await expect(() => enrollStudent.execute(enrollmentRequest)).rejects.toThrow(new Error("Class is already finished"));
})
test("Não deve matricular depois de 25% do início das aulas", async () => {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "1",
        classroom: "C",
        installments: 12
    });
    await expect(() => enrollStudent.execute(enrollmentRequest)).rejects.toThrow(new Error("Class is already started"));
})
test("Deve gerar faturas", async () => {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });

    const enrollment = await enrollStudent.execute(enrollmentRequest)
    await expect(enrollment.invoices).toHaveLength(12);
    await expect(enrollment.invoices[0].amount).toBe(1416.66);
    await expect(enrollment.invoices[11].amount).toBe(1416.73);
})