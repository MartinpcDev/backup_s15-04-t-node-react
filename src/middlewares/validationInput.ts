import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { CODE } from "../utils/constants";

export const HandleInputErrors = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
	} else {
		next();
	}
};
