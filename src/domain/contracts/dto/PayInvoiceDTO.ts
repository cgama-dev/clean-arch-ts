export namespace PayInvoiceDTO {

    export type InputRequestModel = {
        code: string;
        month: number;
        year: number;
        amount: number;
        paymentDate: Date;
    }

    export class Input {
        code: string;
        month: number;
        year: number;
        amount: number;
        paymentDate: Date;
        constructor({ code, month, year, amount, paymentDate }: InputRequestModel) {
            this.code = code;
            this.month = month;
            this.year = year;
            this.amount = amount;
            this.paymentDate = paymentDate;
        }
    }
}