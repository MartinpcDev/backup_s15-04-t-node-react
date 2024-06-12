import { Cargo } from '@prisma/client';

export type CargoBody = Pick<Cargo, 'nombre' | 'descripcion'>;
export type CargoUpdate = Partial<CargoBody>;
