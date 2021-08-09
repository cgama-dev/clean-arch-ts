import ClassRoom from "./ClassRoom";
import Level from "./Level";
import Module from "./Module";
import Student from "./Student";
import EnrollmentCode from "./EnrollmentCode";
import Invoice from "./Invoice";
export default class Enrollment {
    student: Student;
    level: Level;
    module: Module;
    classRoom: ClassRoom;
    sequence: number;
    issueDate: Date;
    code: EnrollmentCode;
    installments: number;
    invoices: any[];
    constructor(
                student: Student,
                level: Level, 
                module: Module, 
                classRoom: ClassRoom, 
                issueDate: Date,
                sequence: number,
                installments: number
                 ){ 
                    const studentIsMinimumAge = student.getAge() < module.minimumAge;
                    if(studentIsMinimumAge) throw new Error("Student below minimum age");
                    if(classRoom.IsFinished(issueDate)) throw new Error("Class is already finished");
                    if(classRoom.getProgress(issueDate) > 25) throw new Error("Class is already started")
                    this.student = student;
                    this.level = level;
                    this.module = module;
                    this.classRoom = classRoom;
                    this.sequence = sequence;
                    this.issueDate = issueDate;
                    this.code = new EnrollmentCode(level.code,module.code,classRoom.code, issueDate, sequence)
                    this.invoices = [];
                    this.installments =  installments;
                    this.generateInvoices()
    }

    generateInvoices () {
        let installmentAmount = Math.trunc((this.module.price/this.installments)*100)/100;
        for (let i = 1; i <= this.installments; i++) {
            this.invoices.push(new Invoice(this.code.value, i, this.issueDate.getFullYear(), installmentAmount));
        }
        const total = this.invoices.reduce((total, invoice) => {
            total += invoice.amount;
            return total;
        }, 0);
        const rest = Math.trunc((this.module.price - total)*100)/100
        this.invoices[this.installments - 1].amount = installmentAmount + rest;
    }
}