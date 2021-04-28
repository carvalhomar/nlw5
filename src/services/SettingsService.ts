import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";


/**
 * Tipagem de dados para classe
 */
interface ISettingsCreate {
    chat: boolean,
    username: string;
}

/**
 * Toda regra de negócio que corresponde a tabela Settings
 */
class SettingsService {
    private settingsRepository: Repository<Setting>;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }:ISettingsCreate){

        const userAlreadyExists = await this.settingsRepository.findOne({ username });

        if (userAlreadyExists){
            throw new Error("User already exists!");
        }

        const settings = this.settingsRepository.create({
            chat,
            username
        });

        await this.settingsRepository.save(settings);

        return settings;
    }

    async findByUsername( username:string ){
        const settings = await this.settingsRepository.findOne({ 
            username 
        });
        console.log(settings);
        return settings;
    }

    async update(username: string, chat: boolean){

        await this.settingsRepository.createQueryBuilder().update(Setting).set({ chat }).where("username = :username", { username }).execute();
        
        const settings = this.settingsRepository.findOne({ username });
        
        return settings;

    }
}

export { SettingsService };