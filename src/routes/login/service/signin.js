const express = require('express');
const router = express.Router();
//const crypto = require('crypto-promise');
const createToken = require('../../../middlewares/token').createToken;
const db = require('../../../sequelize/models/index');


router.post('/', async (req, res, next) => {
    try {
        let { user_id, user_pwd } = req.body;
        if (!user_id || !user_pwd) throw Error();

        db.user.findOne({id: user_id})
        .then( user =>{
            const accessToken = createToken(user.id);
            res.cookie('user_id', accessToken);
            res.status(201).json(accessToken);
        })
        .catch(err => {
            res.status(400).send(err);
        })

    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;