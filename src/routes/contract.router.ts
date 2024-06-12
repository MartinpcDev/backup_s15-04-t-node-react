import { Router } from 'express';
import ContractController from '../controllers/contract.controller';
import { body, param } from 'express-validator';
import { HandleInputErrors } from '../middlewares/validationInput';
import { isAdmin } from '../middlewares/validateAdmin';

const router: Router = Router();

router.use(isAdmin);

router.get('/', ContractController.getAll);

router.get(
	'/:id',
	param('id')
		.notEmpty()
		.withMessage('El param id no puede ir vació')
		.isUUID()
		.withMessage('ID no valido'),
	HandleInputErrors,
	ContractController.getById
);

router.post(
	'/',
	body('usuarioId')
		.notEmpty()
		.withMessage('El usuario_id no puede ir vació')
		.isUUID()
		.withMessage('ID no valido'),
	body('salario')
		.notEmpty()
		.isInt()
		.withMessage('el salario debe ser un entero'),
	body('descripcion')
		.notEmpty()
		.isString()
		.withMessage('La descripcion debe ser un string'),
	body('cargoId')
		.notEmpty()
		.isUUID()
		.withMessage('El cargo_id debe ser UUID valido'),
	body('fecha_inicio').notEmpty().isDate().withMessage('fecha requerida'),
	body('fecha_fin').notEmpty().isDate().withMessage('fecha requerida'),
	HandleInputErrors,
	ContractController.create
);

router.put(
	'/:id',
	param('id')
		.notEmpty()
		.withMessage('El param id no puede ir vació')
		.isUUID()
		.withMessage('ID no valido'),
	body('usuarioId').optional().isUUID().withMessage('ID no valido'),
	body('salario')
		.optional()
		.isInt()
		.withMessage('el salario debe ser un entero'),
	body('descripcion')
		.optional()
		.isString()
		.withMessage('La descripcion debe ser un string'),
	body('cargoId')
		.optional()
		.isUUID()
		.withMessage('El cargo_id debe ser UUID valido'),
	body('fecha_inicio').optional().isDate().withMessage('fecha requerida'),
	body('fecha_fin').optional().isDate().withMessage('fecha requerida'),
	HandleInputErrors,
	ContractController.update
);

router.delete(
	'/:id',
	param('id')
		.notEmpty()
		.withMessage('El param id no puede ir vació')
		.isUUID()
		.withMessage('ID no valido'),
	HandleInputErrors,
	ContractController.delete
);

export default router;
