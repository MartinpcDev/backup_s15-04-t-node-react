import { AuthData, UpdateData, UserPayload } from '../types/user';
import { prisma } from '../config/prisma';
import { HttpException } from '../utils/HttpException';
import { CODE } from '../utils/constants';
import {
	comparePassword,
	generateJwt,
	hashPassword
} from '../utils/authHandler';
import { Usuario } from '@prisma/client';

class UserService {
	public findByEmail = async (email: AuthData['email']) => {
		const user = await prisma.usuario.findUnique({
			where: { email }
		});

		if (!user) {
			return null;
		}

		return true;
	};

	public getById = async (id: UserPayload['id']) => {
		const user = await prisma.usuario.findUnique({
			where: { id },
			include: {
				contrato: { where: { status: 'ACTIVO' } },
				empresa: true,
				solicitudesLicencia: true
			}
		});

		if (!user) {
			throw new HttpException(CODE.NOT_FOUND, 'Usuario no Existe');
		}

		return user;
	};

	public createUser = async (data: AuthData) => {
		const userExists = await this.findByEmail(data.email);

		if (userExists) {
			throw new HttpException(CODE.BAD_REQUEST, 'El usuario ya existe');
		}

		data.password = await hashPassword(data.password);

		const newUser = await prisma.usuario.create({
			data,
			select: {
				id: true,
				email: true,
				apellido: true,
				nombre: true,
				dni: true,
				rol: true
			}
		});

		if (!newUser) {
			throw new HttpException(CODE.BAD_REQUEST, 'No se pudo crear el usuario');
		}

		return newUser;
	};

	public login = async (data: AuthData) => {
		const userFound = await prisma.usuario.findUnique({
			where: { email: data.email }
		});

		if (!userFound) {
			throw new HttpException(
				CODE.UNAUTHORIZED_ACCESS,
				'El email es incorrecto'
			);
		}

		const isPassword = await comparePassword(data.password, userFound.password);

		if (!isPassword) {
			throw new HttpException(
				CODE.UNAUTHORIZED_ACCESS,
				'La password es incorrecta'
			);
		}

		const payload: UserPayload = {
			id: userFound.id,
			email: userFound.email,
			rol: userFound.rol,
			dni: userFound.dni
		};

		const token = generateJwt(payload);

		return token;
	};

	public update = async (id: Usuario['id'], data: UpdateData) => {
		const userFound = await this.getById(id);

		const updatedUser = await prisma.usuario.update({
			where: { id: userFound.id },
			data
		});

		if (!updatedUser) {
			throw new HttpException(
				CODE.BAD_REQUEST,
				'No se pudo actualizar el usuario'
			);
		}

		return updatedUser;
	};
}

export default new UserService();
