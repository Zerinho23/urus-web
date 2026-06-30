import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reviewsRouter from "./reviews";
import checkoutRouter from "./checkout";
import tebexWebhookRouter from "./tebex-webhook";
import tebexAdminRouter from "./tebex-admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reviewsRouter);
router.use(checkoutRouter);
router.use(tebexWebhookRouter);
router.use(tebexAdminRouter);

export default router;
