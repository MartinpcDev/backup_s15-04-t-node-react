import { Router } from 'express';
import CargoController from '../controllers/cargo.controller';
import { body, param } from 'express-validator';
import { HandleInputErrors } from '../middlewares/validationInput';
import { isAdmin } from '../middlewares/validateAdmin';

const router: Router = Router();

router.use(isAdmin);

router.get('/', CargoController.getAll);

router.post(
	'/',
	body('nombre')
		.notEmpty()
		.withMessage('El nombre no puede ir vació')
		.isString()
		.withMessage('el nombre debe ser un string'),
	body('descripcion')
		.notEmpty()
		.isString()
		.withMessage('La descripcion no puede ir vació')
		.isString()
		.withMessage('el nombre debe ser un string'),
	HandleInputErrors,
	CargoController.create
);

router.get(
	'/:id',
	param('id').isUUID().withMessage('El id debe ser un UUID'),
	HandleInputErrors,
	CargoController.getById
);

router.put(
	'/:id',
	param('id').isUUID().withMessage('El id debe ser un UUID'),
	body('nombre')
		.optional()
		.isString()
		.withMessage('el nombre debe ser un string'),
	body('descripcion')
		.optional()
		.isString()
		.withMessage('la descripcion de be ser un string'),
	HandleInputErrors,
	CargoController.update
);

router.delete(
	'/:id',
	param('id').isUUID().withMessage('El id debe ser un UUID'),
	HandleInputErrors,
	CargoController.delete
);

export default router;
