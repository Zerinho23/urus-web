import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reviewsRouter from "./reviews";
import paypalRouter from "./paypal";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reviewsRouter);
router.use(paypalRouter);

export default router;
