import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reviewsRouter from "./reviews";
import checkoutRouter from "./checkout";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reviewsRouter);
router.use(checkoutRouter);

export default router;
