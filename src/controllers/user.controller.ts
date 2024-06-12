import { Request, Response } from 'express';
import { errorMessage } from '../utils/HandleError';
import UserService from '../services/user.service';
import { CODE } from '../utils/constants';

class UserController {
	public register = async (req: Request, res: Response) => {
		try {
			const { body } = req;
			const response = await UserService.createUser(body);
			res
				.status(CODE.CREATED)
				.json({ data: response, message: 'Usuario Creado Correctamente' });
		} catch (error) {
			errorMessage(res, error);
		}
	};

	public login = async (req: Request, res: Response) => {
		try {
			const { body } = req;
			const token = await UserService.login(body);
			res
				.status(CODE.ACCEPTED)
				.json({ token, message: 'Logeado Correctamente' });
		} catch (error) {
			errorMessage(res, error);
		}
	};

	public getSession = async (req: Request, res: Response) => {
		try {
			const id = String(req.user?.id);
			const user = await UserService.getById(id);
			res.status(CODE.OK).json(user);
		} catch (error) {
			errorMessage(res, error);
		}
	};

	public update = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { body } = req;
			const updatedUser = await UserService.update(id!, body);

			res
				.status(CODE.ACCEPTED)
				.json({
					data: updatedUser,
					message: 'Usuario Actualizado correctamente'
				});
		} catch (error) {
			errorMessage(res, error);
		}
	};
}

export default new UserController();
