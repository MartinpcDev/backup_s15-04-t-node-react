import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { body, param } from 'express-validator';
import { HandleInputErrors } from '../middlewares/validationInput';
import { isLogged } from '../middlewares/validateSession';

const router: Router = Router();

router.post(
	'/register',
	body('email').isEmail().withMessage('Email no valido'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('El password es muy corto, mínimo de 8 caracteres'),
	body('nombre')
		.isLength({ min: 3 })
		.withMessage('El nombre es muy corto, mínimo de 4 caracteres'),
	body('apellido')
		.isLength({ min: 3 })
		.withMessage('El apellido es muy corto,mínimo de 5 caracteres'),
	body('dni')
		.isInt({ min: 10000000, max: 99999999 })
		.withMessage('El dni debe estar entre 10000000 y 99999999'),
	HandleInputErrors,
	UserController.register
);
router.post(
	'/login',
	body('email').isEmail().withMessage('Email no valido'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('El password es muy corto, mínimo de 8 caracteres'),
	HandleInputErrors,
	UserController.login
);

router.put(
	'/:id',
	isLogged,
	param('id').isUUID().withMessage('Id no valido debe ser un UUID'),
	body('password')
		.optional()
		.isLength({ min: 8 })
		.withMessage('El password es muy corto, mínimo de 8 caracteres'),
	body('nombre')
		.optional()
		.isLength({ min: 3 })
		.withMessage('El nombre es muy corto, mínimo de 4 caracteres'),
	body('apellido')
		.optional()
		.isLength({ min: 3 })
		.withMessage('El apellido es muy corto,mínimo de 5 caracteres'),
	body('dni')
		.optional()
		.isInt({ min: 10000000, max: 99999999 })
		.withMessage('El dni debe estar entre 10000000 y 99999999'),
	body('telefono')
		.optional()
		.isMobilePhone('es-AR')
		.withMessage('debe cumplir el formato de telefono ES-AR'),
	body('direccion')
		.optional()
		.isString()
		.withMessage('La direccion debe ser un string'),
	body('ciudad')
		.optional()
		.isString()
		.withMessage('La ciudad debe ser un string'),
	HandleInputErrors,
	UserController.update
);

router.get('/', isLogged, UserController.getSession);

export default router;
