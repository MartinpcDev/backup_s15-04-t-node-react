import dotenv from "dotenv";

dotenv.config();

export const PORT: number = Number(process.env.PORT) || 3000;
export const JWT_SECRET: string = process.env.JWT_SECRET || "";

export enum CODE {
	BAD_REQUEST = 400,
	NOT_FOUND = 404,
	CREATED = 201,
	OK = 200,
	INTERNAL_SERVER_ERROR = 500,
	UNAUTHORIZED_ACCESS = 401,
	FORBIDDEN = 403,
	ACCEPTED = 202,
	NOT_MODIFIED = 304
}

export enum ROLE {
	USER = "USER",
	EMPLEADO = "EMPLEADO",
	ADMIN = "ADMIN"
}
