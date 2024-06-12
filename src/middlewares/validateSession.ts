import { Usuario } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { CODE } from '../utils/constants';
import { errorMessage } from '../utils/HandleError';
import { HttpException } from '../utils/HttpException';
import { verifyToken } from '../utils/authHandler';
import UserService from '../services/user.service';

declare global {
	namespace Express {
		interface Request {
			user?: Usuario;
		}
	}
}

export const isLogged = async (
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

		const decoded = verifyToken(token);

		if (typeof decoded === 'object' && decoded.id) {
			const user = await UserService.findByEmail(decoded.email);

			if (!user) {
				throw new HttpException(CODE.UNAUTHORIZED_ACCESS, 'Toke no Valido');
			} else {
				const userFound = await UserService.getById(decoded.id);
				req.user = userFound;
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
