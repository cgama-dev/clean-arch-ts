import RepositoryAbstractFactory from '../contracts/repositories/RepositoryAbstractFactory';

export default class Login {

    constructor(repositoryFactory: RepositoryAbstractFactory) {
    }

    async execute(username: string, password: string): Promise<string> {
        return "123456";
    }
}