const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function(req, res) {
    const _query = {
        user: req.user.id
    };

    if(req.query.start) { // Date Start
        _query.date = {
            // großer oder gleich
            $gte: req.query.start
        };
    }

    if(req.query.end) {
        if(!_query.date) {
            _query.date = {};
        }
        // kleiner oder gleich
        _query.date['$lte'] = req.query.end;
    }

    if(req.query.order) {
        _query.order = Number(req.query.order);
    }

    try {
        const orders = await Order
            .find(_query)
            .sort({
                date: -1
            })
            .skip(Number(req.query.offset))
            .limit(Number(req.query.limit));

            res.status(200).json(orders);
    } catch(e) {
        errorHandler(res, e)
    }
};
module.exports.create = async function(req, res) {
    try {
        const lastOrder = await Order
            .findOne({
                user: req.user.id
            })
            .sort({
                date: -1
            });

        let maxOrder = lastOrder ? lastOrder.order : 0;

        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save();
        res.status(200).json(order);
    } catch(e) {
        errorHandler(res, e)
    }
};