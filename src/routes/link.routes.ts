import { Router } from "express";

let router = Router();

router.route('/links')
    .get((req, res) => {
        res.json({links: []})
    })

export default router;
