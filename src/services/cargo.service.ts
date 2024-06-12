import { Cargo } from '@prisma/client';
import { CargoBody, CargoUpdate } from '../types/cargo';
import { prisma } from '../database';
import { HttpException } from '../utils/HttpException';
import { CODE } from '../utils/constants';

class CargoService {
	public create = async (data: CargoBody) => {
		const newCargo = await prisma.cargo.create({ data });

		if (!newCargo) {
			throw new HttpException(CODE.BAD_REQUEST, 'No se pudo crear el cargo');
		}

		return newCargo;
	};

	public getAll = async () => {
		const cargos = await prisma.cargo.findMany({});

		if (!cargos || cargos.length === 0) {
			throw new HttpException(CODE.NOT_FOUND, 'No hay cargos a mostrar');
		}

		return cargos;
	};

	public getById = async (id: Cargo['id']) => {
		const cargo = await prisma.cargo.findUnique({ where: { id } });

		if (!cargo) {
			throw new HttpException(CODE.NOT_FOUND, 'El cargo no existe');
		}

		return cargo;
	};

	public update = async (id: Cargo['id'], data: CargoUpdate) => {
		const cargoFound = await this.getById(id);

		const updatedCargo = await prisma.cargo.update({
			where: { id: cargoFound.id },
			data
		});

		return updatedCargo;
	};

	public delete = async (id: Cargo['id']) => {
		const cargoFound = await this.getById(id);

		await prisma.cargo.delete({ where: { id: cargoFound.id } });

		return 'Cargo Borrado Satisfactoriamente';
	};
}

export default new CargoService();
