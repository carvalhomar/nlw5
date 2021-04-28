import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUsersCreate {
    email: string;
}

class UsersService{
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create({ email }:IUsersCreate){

        //Verificar se usuário existente
        const userExists = await this.usersRepository.findOne({ email});

        //Caso exista, retorna usuário
        if(userExists){
            return userExists;
        }

        //Caso não exissta, cadastra no banco de dados
        const user = this.usersRepository.create({ email });

        await this.usersRepository.save(user);

        return user;

    }

    async findByEmail({ email }: IUsersCreate){
        const list = await this.usersRepository.findOne(email);

        return list;
    }
}

export { UsersService };