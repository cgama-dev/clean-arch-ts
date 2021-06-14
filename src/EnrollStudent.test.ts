import EnrollStudent from "./EnrollStudent";

test("Should not enroll without valid student name", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Ana"
        },
        level: "EM",
        module: "3",
        classRoom: "A"
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid name"));  
});

test("Should not enroll without valid student cpf", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Ana Maria",
            cpf: "213.345.654-10"
        },
        level: "EM",
        module: "3",
        classRoom: "A"
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid cpf"));  
});

test("Should not enroll duplicated student", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Ana Maria",
            cpf: "864.464.227-84"
        },
        level: "EM",
        module: "3",
        classRoom: "A"
    };
    enrollStudent.execute(enrollmentRequest);
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"));
});

test("Should generate enrollment code", ()=> {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
            student: {
                name: "Maria Carolina Fonseca",
                cpf: "755.525.774-26",
                birthDate: "2002-03-12"
            },
            level: "EM",
            module: "3",
            classRoom: "A"
    }
    const enrollment  = enrollStudent.execute(enrollmentRequest);
    expect(enrollment.code).toBe("2002EM3A0001"); 
});
test("Should not enroll student below minimum age", ()=> {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
            student: {
                name: "Maria Carolina Fonseca",
                cpf: "950.948.090-83",
                birthDate: "2006-03-12"
            },
            level: "EM",
            module: "3",
            classRoom: "A"
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Student below minimum age"));
});
test("Should not enroll student over class capacity", ()=> {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest1 = {
            student: {
                name: "Samantha Sobrenome",
                cpf: "755.525.774-26",
                birthDate: "2002-03-12"
            },
            level: "EM",
            module: "3",
            classRoom: "A"
    }
    const enrollmentRequest2= {
            student: {
                name: "Cleyton Sobrenome",
                cpf: "023.035.510-21",
                birthDate: "2002-03-12"
            },
            level: "EM",
            module: "3",
            classRoom: "A"
    }
    const enrollmentRequest3= {
            student: {
                name: "Luisa Sobrenome",
                cpf: "935.390.550-88",
                birthDate: "2002-03-12"
            },
            level: "EM",
            module: "3",
            classRoom: "A"
    }
    enrollStudent.execute(enrollmentRequest1);
    enrollStudent.execute(enrollmentRequest2);
    expect(() => enrollStudent.execute(enrollmentRequest3)).toThrow(new Error("Class is over capacity"));
});