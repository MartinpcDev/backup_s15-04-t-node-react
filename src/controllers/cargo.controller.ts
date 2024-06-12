import CargoService from '../services/cargo.service';
import { CODE } from '../utils/constants';
import { errorMessage } from '../utils/HandleError';
import { Request, Response } from 'express';

class CargoController {
	public getAll = async (req: Request, res: Response) => {
		try {
			const cargos = await CargoService.getAll();
			res.status(CODE.OK).json({ data: cargos, message: 'Cargos encontrados' });
		} catch (error) {
			errorMessage(res, error);
		}
	};

	public getById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const cargo = await CargoService.getById(id!);

			res.status(CODE.OK).json({ data: cargo, message: 'Cargo encontrado' });
		} catch (error) {
			errorMessage(res, error);
		}
	};

	public create = async (req: Request, res: Response) => {
		try {
			const { body } = req;
			const newCargo = await CargoService.create(body);

			res
				.status(CODE.CREATED)
				.json({ data: newCargo, message: 'Cargo Creado' });
		} catch (error) {
			errorMessage(res, error);
		}
	};

	public update = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { body } = req;
			const updateCargo = await CargoService.update(id!, body);

			res
				.status(CODE.ACCEPTED)
				.json({ data: updateCargo, message: 'Cargo Actualizado' });
		} catch (error) {
			errorMessage(res, error);
		}
	};

	public delete = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const response = await CargoService.delete(id!);

			res.status(CODE.ACCEPTED).json({ message: response });
		} catch (error) {
			errorMessage(res, error);
		}
	};
}

export default new CargoController();
