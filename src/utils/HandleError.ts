import { HttpException } from "./HttpException";
import { Response } from "express";
import { CODE } from "./constants";

export const errorMessage = (res: Response, error: unknown): void => {
	if (error instanceof HttpException) {
		res.status(error.status).json({ message: error.message });
	} else {
		console.log(error);
		res.status(CODE.INTERNAL_SERVER_ERROR).json({ message: "Hubo un error" });
	}
};
