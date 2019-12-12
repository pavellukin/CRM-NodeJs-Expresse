const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if(candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult) {
            const _token = jwt.sign(
                {
                    email: candidate.email,
                    userId: candidate._id
                }, 
                keys.JWT_SECRET, 
                {expiresIn: 60 * 60}
            );
            res.status(200).json({
                token: `Bearer ${_token}`
            });
        } else {
            res.status(401).json({
                message: 'Das Passwrot stimmt leider nicht!'
            });
        }
    } else {
        res.status(404).json({
            message: `Der User mit der Email ${req.body.email} wurde nicht gefunden!`
        });
    }
};

module.exports.register= async function(req, res) {
    const condidate = await User.findOne({
       email: req.body.email
    });
    if(condidate) {
        res.status(409).json({
            message: 'Diese EMail-Adresse ist schon vorhanden!'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const _password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(_password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch(e) {
            errorHandler(res, e);
        }
    }
};