export default interface EnrollmentRepository {
    save(enrollment: any): any;
    findAllByClass(level: any, module: string, classRoom:any): any;
    findByCpf(cpf: string): any;
    count(): any;
}