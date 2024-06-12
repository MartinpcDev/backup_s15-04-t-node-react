import { Request, Response, NextFunction } from 'express';
import { errorMessage } from '../utils/HandleError';
import { HttpException } from '../utils/HttpException';
import { CODE, ROLE } from '../utils/constants';
import { verifyToken } from '../utils/authHandler';
import UserService from '../services/user.service';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bearer = req.headers.authorization!;
		if (!bearer) {
			throw new HttpException(CODE.UNAUTHORIZED_ACCESS, 'No autorizado');
		}

		const [, token] = bearer.split(' ');

		if (!token) {
			throw new HttpException(
				CODE.UNAUTHORIZED_ACCESS,
				'No se ha proporcionado un token'
			);
		}

		const decodedToken = verifyToken(token);

		if (typeof decodedToken === 'object' && decodedToken.id) {
			const user = await UserService.getById(decodedToken.id);

			if (!user) {
				throw new HttpException(CODE.UNAUTHORIZED_ACCESS, 'Toke no Valido');
			}
			if (user.rol !== ROLE.ADMIN) {
				throw new HttpException(
					CODE.UNAUTHORIZED_ACCESS,
					'Necesitas ser Administrador para completar la operación'
				);
			} else {
				req.user = user;
				next();
			}
		} else {
			res.status(CODE.UNAUTHORIZED_ACCESS).json({ message: 'Token no Valido' });
		}
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			res.status(CODE.UNAUTHORIZED_ACCESS).json({ message: 'Token Expirado' });
		}
		if (error instanceof JsonWebTokenError) {
			res.status(CODE.UNAUTHORIZED_ACCESS).json({ message: 'Token no valido' });
		} else {
			errorMessage(res, error);
		}
	}
};
