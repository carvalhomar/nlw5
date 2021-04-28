import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

class MessagesController {

    async create(request: Request, response: Response){
        const { admin_id, text, user_id } = request.body;

        const messageService = new MessageService();

        try {

            const message = await messageService.create({
                admin_id,
                text,
                user_id
            });

            return response.status(200).json(message);

        }catch (e) {
            return response.status(404).json({
                message: e.message
            });
        }
    }

    async showByUser(request:Request, response:Response){
        const { id } = request.params;

        const messageService = new MessageService();

        const list = await messageService.listByUser(id);

        return response.status(200).json(list);
    }

}

export { MessagesController }