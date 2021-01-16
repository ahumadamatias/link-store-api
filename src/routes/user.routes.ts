import { Router } from "express";

let router = Router();

router.route('/users')
    .get((req, res) => {
        res.json({users: []})
    })

export default router;