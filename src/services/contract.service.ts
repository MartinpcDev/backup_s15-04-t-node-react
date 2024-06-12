import { prisma } from '../database';
import { ContractData, ContractUpdateData } from '../types/contract';
import userService from './user.service';
import cargoService from './cargo.service';
import { HttpException } from '../utils/HttpException';
import { CODE } from '../utils/constants';
import { Contrato } from '@prisma/client';

class ContractService {
	public create = async (data: ContractData) => {
		const usuarioFound = await userService.getById(data.usuarioId!);

		if (usuarioFound.contrato.length !== 0) {
			throw new HttpException(CODE.BAD_REQUEST, 'Ya hay un contrato Activo');
		}

		const cargoFound = await cargoService.getById(data.cargoId!);

		const contract = await prisma.contrato.create({
			data: {
				salario: data.salario,
				status: 'ACTIVO',
				descripcion: data.descripcion,
				fecha_inicio: new Date(data.fecha_inicio),
				fecha_fin: new Date(data.fecha_fin),
				usuarioId: usuarioFound.id,
				cargoId: cargoFound.id
			}
		});

		await userService.update(usuarioFound.id, { rol: 'EMPLEADO' });

		return contract;
	};

	public getAll = async () => {
		const contracts = await prisma.contrato.findMany({
			include: { Cargo: true, Usuario: true }
		});

		if (contracts.length === 0) {
			throw new HttpException(CODE.NOT_FOUND, 'No hay contratos que mostrar');
		}

		return contracts;
	};

	public getById = async (id: Contrato['id']) => {
		const contract = await prisma.contrato.findUnique({
			where: { id },
			include: { Cargo: true, Usuario: true }
		});

		if (!contract) {
			throw new HttpException(CODE.NOT_FOUND, 'El contrato no existe');
		}

		return contract;
	};

	public update = async (id: Contrato['id'], data: ContractUpdateData) => {
		const contractFound = await this.getById(id);

		let updatedContract = {};

		if (data.cargoId && data.usuarioId) {
			Promise.allSettled([
				cargoService.getById(data.cargoId),
				userService.getById(data.usuarioId),
				userService.update(contractFound.usuarioId!, { rol: 'USER' }),
				userService.update(data.usuarioId, { rol: 'EMPLEADO' })
			]);

			updatedContract = await prisma.contrato.update({
				where: { id: contractFound.id },
				data
			});
		} else if (data.cargoId) {
			await cargoService.getById(data.cargoId);

			updatedContract = await prisma.contrato.update({
				where: { id: contractFound.id },
				data
			});
		} else if (data.usuarioId) {
			Promise.allSettled([
				userService.getById(data.usuarioId),
				userService.update(contractFound.usuarioId!, { rol: 'USER' }),
				userService.update(data.usuarioId, { rol: 'EMPLEADO' })
			]);

			updatedContract = await prisma.contrato.update({
				where: { id: contractFound.id },
				data
			});
		} else {
			updatedContract = await prisma.contrato.update({
				where: { id: contractFound.id },
				data
			});
		}

		return updatedContract;
	};

	public delete = async (id: Contrato['id']) => {
		const contract = await this.getById(id);
		let message = '';
		await prisma.contrato.delete({ where: { id } });

		message = 'Contrato eliminado';

		if ((contract.status = 'ACTIVO')) {
			await userService.update(contract.usuarioId!, { rol: 'USER' });
			message = 'Contrato Eliminado y Rol de usuario Cambiado a User';
		}

		return message;
	};
}

export default new ContractService();
