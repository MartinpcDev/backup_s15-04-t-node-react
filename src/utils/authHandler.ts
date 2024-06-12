import { compare, genSalt, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { UserPayload } from "../types/user";
import { JWT_SECRET } from "./constants";

export const hashPassword = async (password: string) => {
	const salt = await genSalt(10);
	return await hash(password, salt);
};

export const comparePassword = async (
	password: string,
	hashPassword: string
) => {
	return await compare(password, hashPassword);
};

export const generateJwt = (payload: UserPayload) => {
	return sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
	return verify(token, JWT_SECRET);
};
