import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

class UsersController {
    async create(request: Request, response: Response){
        //desistruturação variável request body
        const { email } = request.body;

        //Extancia os service para cadastramentos
        const userService = new UsersService();

        try {

            const user = await userService.create({ email });

            return response.status(200).json(user);

        } catch (e){
            // retorna erro caso já exista usuário
            return response.status(404).json({
                message: e.message
            });
        }

    }
}

export { UsersController }