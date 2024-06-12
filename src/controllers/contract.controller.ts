import { Request, Response } from 'express';
import { errorMessage } from '../utils/HandleError';
import ContractService from '../services/contract.service';
import { CODE } from '../utils/constants';

class ContractController {
	public create = async (req: Request, res: Response) => {
		try {
			const { body } = req;
			const newContract = await ContractService.create(body);
			res
				.status(CODE.CREATED)
				.json({ data: newContract, message: 'Contrato Creado' });
		} catch (error) {
			errorMessage(res, error);
		}
	};

	public getAll = async (req: Request, res: Response) => {
		try {
			const response = await ContractService.getAll();

			res
				.status(CODE.OK)
				.json({ data: response, message: 'Contratos encontrados ' });
		} catch (error) {
			errorMessage(res, error);
		}
	};

	public getById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const response = await ContractService.getById(id!);

			res
				.status(CODE.OK)
				.json({ data: response, message: 'Contrato Encontrado' });
		} catch (error) {
			errorMessage(res, error);
		}
	};

	public update = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { body } = req;
			const updatedContract = await ContractService.update(id!, body);

			res
				.status(CODE.ACCEPTED)
				.json({ data: updatedContract, message: 'Contrato Actualizado' });
		} catch (error) {
			errorMessage(res, error);
		}
	};

	public delete = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const response = await ContractService.delete(id!);

			res.status(CODE.ACCEPTED).json({ message: response });
		} catch (error) {
			errorMessage(res, error);
		}
	};
}

export default new ContractController();
