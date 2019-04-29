import express from 'express';
import series from '../model/recipe-service.mjs';
const router = express.Router();

router.route('/series')
    .get((req, res) => {
        series.all(req.query.sort==="datePublished", req.query.titlePattern, function (error, recipes) {
            res.json(recipes)
        });
    });

router.route('/series/:id')
    .get((req, res) => {
        series.findById(req.params.id)
            .cata(()=>res.status(404).send('Not found'),(r)=>res.json(r))
    });

export default router;
