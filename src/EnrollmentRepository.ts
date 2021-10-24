import ClassRoom from "./ClassRoom";
import Enrollment from "./Enrollment";
import Level from "./Level";
import Module from "./Module";

export default interface EnrollmentRepository {
    save(enrollment: any): any;
    findAllByClass(level: Level, module: Module, classRoom:ClassRoom): Enrollment[];
    findByCpf(cpf: string): Enrollment | undefined;
    get(code: string): Enrollment | undefined;
    count(): number;
}