import EnrollStudent from "./EnrollStudent";
import { EnrollStudentDTO } from "./EnrollStudentDTO";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";

let enrollStudent: EnrollStudent;

beforeEach(()=>{
    enrollStudent = new EnrollStudent(new RepositoryMemoryFactory());
});

test("Should not enroll without valid student name", function () {
    
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Ana",
        studentCpf: "213.345.654-10",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid name"));  
});
test("Should not enroll without valid student cpf", function () {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Ana Maria",
        studentCpf: "213.345.654-10",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid cpf"));  
});
test("Should not enroll duplicated student", function () {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Ana Maria",
        studentCpf: "864.464.227-84",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });
    enrollStudent.execute(enrollmentRequest);
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"));
});
test("Should generate enrollment code", ()=> {
    
    const enrollmentRequest = new EnrollStudentDTO.Input({
            studentName: "Maria Carolina Fonseca",
            studentCpf: "755.525.774-26",
            studentBirthDate: "2002-03-12",
            level: "EM",
            module: "3",
            classroom: "A",
            installments: 12
    });
    const enrollment  = enrollStudent.execute(enrollmentRequest);
    expect(enrollment.code).toBe("2021EM3A0001"); 
});
test("Should not enroll student below minimum age", ()=> {
    
    const enrollmentRequest = new EnrollStudentDTO.Input({
            studentName: "Maria Carolina Fonseca",
            studentCpf: "950.948.090-83",
            studentBirthDate: "2006-03-12",
            level: "EM",
            module: "3",
            classroom: "A",
            installments: 12
    });
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Student below minimum age"));
});
test("Should not enroll student over class capacity", ()=> {
    
    const enrollmentRequest1 = new EnrollStudentDTO.Input({
            studentName: "Samantha Sobrenome",
            studentCpf: "755.525.774-26",
            studentBirthDate: "2002-03-12",
            level: "EM",
            module: "3",
            classroom: "A",
            installments: 12
    });
    const enrollmentRequest2= new EnrollStudentDTO.Input({
            studentName: "Cleyton Sobrenome",
            studentCpf: "023.035.510-21",
            studentBirthDate: "2002-03-12",
            level: "EM",
            module: "3",
            classroom: "A",
            installments: 12
    });
    const enrollmentRequest3= new EnrollStudentDTO.Input({
            studentName: "Luisa Sobrenome",
            studentCpf: "935.390.550-88",
            studentBirthDate: "2002-03-12",
            level: "EM",
            module: "3",
            classroom: "A",
            installments: 12
    });
    enrollStudent.execute(enrollmentRequest1);
    enrollStudent.execute(enrollmentRequest2);
    expect(() => enrollStudent.execute(enrollmentRequest3)).toThrow(new Error("Class is over capacity"));
});
test("Não deve matricular depois do fim das aulas", ()=> {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "1",
        classroom: "B",
        installments: 12
    })
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Class is already finished"));
})
test("Não deve matricular depois de 25% do início das aulas", ()=> {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "1",
        classroom: "C",
        installments: 12
    });
    expect(()=> enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Class is already started"));
})
test("Deve gerar faturas", ()=> {
    const enrollmentRequest = new EnrollStudentDTO.Input({
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    });

    const enrollment =  enrollStudent.execute(enrollmentRequest)
    expect(enrollment.invoices).toHaveLength(12);
    expect(enrollment.invoices[0].amount).toBe(1416.66);
    expect(enrollment.invoices[11].amount).toBe(1416.73);
})