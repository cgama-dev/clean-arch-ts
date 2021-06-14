import Cpf from "./Cpf";
import Name from "./Name";

export default class Student {
    name: Name;
    cpf: Cpf;
    birthDate: Date;

    constructor (name: string, cpf: string, birthDate: Date) {
        this.name = new Name(name);
        this.cpf = new Cpf(cpf);
        this.birthDate = new Date(birthDate);
    }
}
