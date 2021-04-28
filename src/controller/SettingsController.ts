import { Request, Response} from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController{

    async create(request: Request, response: Response){

        const { chat, username } = request.body;

        const settingsServices = new SettingsService();

        try{

            const settings = await settingsServices.create({ chat, username });

            return  response.status(200).json(settings);

        } catch (e) {
            return response.status(404).json({
                message: e.message
            });
        }
    }

    async findByUsername(request: Request, response: Response){
        const { username } = request.params;

        const settingsServices = new SettingsService();

        const settings = await settingsServices.findByUsername( username);

        return response.json(settings);
    }

    async update(request: Request, response: Response){
        const { username } = request.params;
        const { chat } = request.body;

        const settingsServices = new SettingsService();

        const settings = settingsServices.update(username, chat);

        return response.json(settings);
    }

}

export { SettingsController };