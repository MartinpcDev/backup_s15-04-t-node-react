import { Router } from "express";
import userRouter from "./user.router";
import companyRouter from "./company.router";
import cargoRouter from "./cargo.router";
import licenseApplicationRouter from "./licenseAplication.router";
import contractRouter from "./contract.router";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/companys", companyRouter);
router.use("/cargo", cargoRouter);
router.use("/licenseAplication", licenseApplicationRouter);
router.use("/contract", contractRouter);

export default router;
