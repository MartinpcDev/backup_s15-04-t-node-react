import { Contrato } from '@prisma/client';

export type ContractData = Pick<
	Contrato,
	| 'usuarioId'
	| 'cargoId'
	| 'salario'
	| 'descripcion'
	| 'fecha_fin'
	| 'fecha_inicio'
>;

export type ContractUpdateData = Partial<ContractData>;
