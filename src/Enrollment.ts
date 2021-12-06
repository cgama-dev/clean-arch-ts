import ClassRoom from "./ClassRoom";
import Level from "./Level";
import Module from "./Module";
import Student from "./Student";
import EnrollmentCode from "./EnrollmentCode";
import Invoice from "./Invoice";
import InvoiceEvent from "./InvoiceEvent";
export default class Enrollment {
    student: Student;
    level: Level;
    module: Module;
    classRoom: ClassRoom;
    sequence: number;
    issueDate: Date;
    code: EnrollmentCode;
    installments: number;
    invoices: Invoice[];
    status: string;
    constructor(
        student: Student,
        level: Level,
        module: Module,
        classRoom: ClassRoom,
        issueDate: Date, //Data atual
        sequence: number,
        installments: number = 12
    ) {
        const studentIsMinimumAge = student.getAge() < module.minimumAge;
        if (studentIsMinimumAge) throw new Error("Student below minimum age");
        if (classRoom.IsFinished(issueDate)) throw new Error("Class is already finished");
        if (classRoom.getProgress(issueDate) > 25) throw new Error("Class is already started")
        this.student = student;
        this.level = level;
        this.module = module;
        this.classRoom = classRoom;
        this.sequence = sequence;
        this.issueDate = issueDate;
        this.code = new EnrollmentCode(level.code, module.code, classRoom.code, issueDate, sequence)
        this.invoices = [];
        this.installments = installments;
        this.status = 'active';
        this.generateInvoices()
    }

    generateInvoices() {
        let installmentAmount = Math.trunc((this.module.price / this.installments) * 100) / 100;
        for (let i = 1; i <= this.installments; i++) {
            this.invoices.push(new Invoice(this.code.value, i, this.issueDate.getFullYear(), installmentAmount));
        }
        const total = this.invoices.reduce((total, invoice) => {
            total += invoice.amount;
            return total;
        }, 0);
        const rest = Math.trunc((this.module.price - total) * 100) / 100
        this.invoices[this.installments - 1].amount = installmentAmount + rest;
    }

    getInvoiceBalance() {
        return this.invoices.reduce((total, invoice) => {
            total += invoice.getBalance();
            return total
        }, 0);
    }

    getInvoice(month: number, year: number): Invoice | undefined {
        const invoice = this.invoices.find(invoice => invoice.month === month && invoice.year === year)
        return invoice;
    }

    payInvoice(month: number, year: number, amount: number, paymentDate: Date): void{
        const invoice = this.getInvoice(month, year);
        if (!invoice) throw new Error("Invalid invoice");
        if (invoice.getStatus(paymentDate) === "overdue") {
            const penalty = invoice.getPenalty(paymentDate);
            const interests = invoice.getInterests(paymentDate);
            invoice.addEvent(new InvoiceEvent("penalty", penalty));
            invoice.addEvent(new InvoiceEvent("interests", interests));
        }
        invoice.addEvent(new InvoiceEvent("payment", amount));
    }
}