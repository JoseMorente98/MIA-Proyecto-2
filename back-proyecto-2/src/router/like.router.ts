import { Router } from "express";
import LikeController from "../controller/like.controller"
const router = Router();

router.get('/like', LikeController.getInstance().getAll);
router.get('/like/:id/:id2', LikeController.getInstance().getSingle);
router.post('/like', LikeController.getInstance().create);
router.put('/like/:id', LikeController.getInstance().update);
router.delete('/like/:id', LikeController.getInstance().delete);

export default router;