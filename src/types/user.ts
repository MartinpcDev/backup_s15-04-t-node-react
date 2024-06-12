import { Usuario } from '@prisma/client';

export type AuthData = Pick<
	Usuario,
	'email' | 'password' | 'nombre' | 'apellido' | 'dni'
>;

export type UserResponse = Pick<
	Usuario,
	'id' | 'email' | 'nombre' | 'apellido' | 'dni' | 'rol'
>;

export type UserPayload = Pick<Usuario, 'id' | 'email' | 'rol' | 'dni'>;

export type UpdateData = Partial<
	Pick<
		Usuario,
		| 'password'
		| 'nombre'
		| 'apellido'
		| 'ciudad'
		| 'codigo_postal'
		| 'direccion'
		| 'rol'
		| 'empresa_id'
		| 'telefono'
		| 'dni'
	>
>;
