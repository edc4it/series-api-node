import express from 'express';
import series from '../model/series-service.mjs';
const router = express.Router();

router.route('/series')
    .get((req, res) => {
        const rs = series.all(req.query.sort==="year", req.query.titlePattern);
        res.json(rs);
    });

router.route('/series/:id')
    .get((req, res) => {
        series.findById(req.params.id)
            .cata(()=>res.status(404).send('Not found'),(r)=>res.json(r))
    });

export default router;
