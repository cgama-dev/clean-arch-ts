import Student from "./Student";

export default class EnrollStudent {
    enrollments: any[];
    levels: any[];
    modules: any[];
    classes: any[];

    constructor () {
        this.enrollments = [];
        this.levels = [
            {
                code: "EF1",
                description: "Ensino Fundamental I"
            },
            {
                code: "EF2",
                description: "Ensino Fundamental II"
            },
            {
                code: "EM",
                description: "Ensino Médio"
            }
        ];
        this.modules = [
            {
                level: "EF1",
                code: "1",
                description: "1o Ano",
                minimumAge: 6,
                price: 15000
            },
            {
                level: "EF1",
                code: "2",
                description: "2o Ano",
                minimumAge: 7,
                price: 15000
            },
            {
                level: "EF1",
                code: "3",
                description: "3o Ano",
                minimumAge: 8,
                price: 15000
            },
            {
                level: "EF1",
                code: "4",
                description: "4o Ano",
                minimumAge: 9,
                price: 15000
            },
            {
                level: "EF1",
                code: "5",
                description: "5o Ano",
                minimumAge: 10,
                price: 15000
            },
            {
                level: "EF2",
                code: "6",
                description: "6o Ano",
                minimumAge: 11,
                price: 14000
            },
            {
                level: "EF2",
                code: "7",
                description: "7o Ano",
                minimumAge: 12,
                price: 14000
            },
            {
                level: "EF2",
                code: "8",
                description: "8o Ano",
                minimumAge: 13,
                price: 14000
            },
            {
                level: "EF2",
                code: "9",
                description: "9o Ano",
                minimumAge: 14,
                price: 14000
            },
            {
                level: "EM",
                code: "1",
                description: "1o Ano",
                minimumAge: 15,
                price: 17000
            },
            {
                level: "EM",
                code: "2",
                description: "2o Ano",
                minimumAge: 16,
                price: 17000
            },
            {
                level: "EM",
                code: "3",
                description: "3o Ano",
                minimumAge: 17,
                price: 17000
            }
        ];
        this.classes = [
            {
                level: "EM",
                module: "3",
                code: "A",
                capacity: 2
            }
        ]
    }
    
    execute (enrollmentRequest: any) {
        const {level, module, classRoom } = enrollmentRequest;
        const levelExist = this.levels.find(item => item.code === level);
        const moduleExist = this.modules.find(item => item.level === level && item.code === module);
        const classRoomExist = this.classes.find(item =>  item.level === level && item.module === module &&  item.code === classRoom);
        if(!levelExist) throw new Error("Invalid level")
        if(!moduleExist) throw new Error("Invalid module")
        if(!classRoomExist) throw new Error("Invalid class Room")
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf, enrollmentRequest.student.birthDate);
        const yearCurrent = new Date().getFullYear();
        const yearStudent = yearCurrent - student.birthDate.getFullYear();
        const studentIsMinimumAge = yearStudent < moduleExist.minimumAge;
        if(studentIsMinimumAge) throw new Error("Student below minimum age");
        const quantityStudentInClassRoon = this.enrollments.filter(enrollment => enrollment.level === level && enrollment.module === module && enrollment.classRoom === classRoomExist.code).length;
        if(quantityStudentInClassRoon === classRoomExist.capacity) throw new Error("Class is over capacity");
        const existingEnrollment = this.enrollments.find(enrollment => enrollment.student.cpf.value === enrollmentRequest.student.cpf);
        const sequenceEnrollment = `${this.enrollments.length + 1}`.padStart(4,"0");
        const code = `${student.birthDate.getFullYear()}${level}${module}${classRoom}${sequenceEnrollment}`;
        if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");

        const enrollment = {
            student,
            level,
            module,
            classRoom,
            code
        };

        this.enrollments.push(enrollment);
        return enrollment;
    }
}
