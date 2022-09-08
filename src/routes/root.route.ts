import {Request, Response, Router} from 'express';
import {onlyIfTesting} from '../middlewares/environment';
import {respond} from '../utilities/respond';

// route imports
import user from './user.route';
import diagnostic from './diagnostic.route';

// setup router
const router = Router();
router.get('/', onlyIfTesting, (_: Request, response: Response) => {
  respond.success(response, 'PONG', {});
});

// main routes
router.use('/user', user);

// diagnostic routes (to be used in tests)
router.use('/diagnostic', onlyIfTesting, diagnostic);

export default router;
