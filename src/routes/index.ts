import {Router} from 'express';
import {Request, Response, NextFunction} from "express-serve-static-core";

const router: Router = Router();
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.json({ok: true});
});

export = router;
