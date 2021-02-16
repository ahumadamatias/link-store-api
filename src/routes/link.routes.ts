import { LinkController } from '../controllers/link.controller';
import { Router, Response } from 'express';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { ILink } from '../models/link';

let router = Router();

router
    .route('/links')
    .get(ensureAuthenticated, (req: any, res: Response) => {
        LinkController.getLinksByUser(req.userId)
            .then((result: any): void => {
                res.json(result);
            })
            .catch((error: any): void => {
                res.json({ error: error });
            });
    })
    .post(ensureAuthenticated, async (req: any, res: Response) => {
        const link: ILink = {
            linkName: req.body.linkName,
            linkUrl: req.body.linkUrl,
            userId: req.userId,
        };

        const linkRes = await LinkController.createLink(link);

        res.json(linkRes);
    });

router
    .route('/links/:id')
    .get(ensureAuthenticated, (req: any, res: Response) => {
        LinkController.getLink(req.params.id, req.userId)
            .then((result): void => {
                res.json(result);
            })
            .catch((error: any): void => {
                res.json({ error: error });
            });
    })
    .put(ensureAuthenticated, (req: any, res: Response) => {
        LinkController.getLink(req.params.id, req.userId)
            .then(async (link) => {
                let linkUpdated = await link.update(req.body);
                res.json(linkUpdated);
            })
            .catch((error: any): void => {
                res.json({ error: error });
            });
    })
    .delete(ensureAuthenticated, (req: any, res: Response) => {
        LinkController.getLink(req.params.id, req.userId)
            .then(async (link) => {
                link.destroy();
                res.json({ message: 'Link eliminado.' });
            })
            .catch((error: any): void => {
                res.json({ error: 'El link que intenta eliminar no existe.' });
            });
    });

export default router;
