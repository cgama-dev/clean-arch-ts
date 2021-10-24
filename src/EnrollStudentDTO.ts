export namespace EnrollStudentDTO {
    export type InputRequestModel = {
        studentName: string,
        studentCpf: string,
        studentBirthDate: string,
        level: string,
        module: string,
        classroom: string,
        installments: number
    }
    export type OutputResponseModel = {
        code: string,
        invoices: any[]
    }
    export class Input {
        studentName: string;
        studentCpf: string;
        studentBirthDate: string;
        level: string;
        module: string;
        classroom: string;
        installments: number;
        constructor({ studentName, studentCpf, studentBirthDate, level, module, classroom, installments }: InputRequestModel) {
            this.studentName = studentName;
            this.studentCpf = studentCpf;
            this.studentBirthDate = studentBirthDate;
            this.level = level;
            this.module = module;
            this.classroom = classroom;
            this.installments = installments;
        }
    }
    export class Output {
        code: string;
        invoices: any[];
        constructor(code: string) {
            this.code = code;
            this.invoices = [];
        }
    }
}