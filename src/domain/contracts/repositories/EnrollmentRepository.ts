import ClassRoom from "../../entity/ClassRoom";
import Enrollment from "../../entity/Enrollment";
import Level from "../../entity/Level";
import Module from "../../entity/Module";

export default interface EnrollmentRepository {
    save(enrollment: any): any;
    findAllByClass(level: Level, module: Module, classRoom: ClassRoom): Promise<Enrollment[] | undefined>;
    findByCpf(cpf: string): Promise<Enrollment | undefined>;
    get(code: string): Promise<Enrollment | undefined>;
    getAll(): Promise<Enrollment[]>;
    count(): Promise<number>;
}