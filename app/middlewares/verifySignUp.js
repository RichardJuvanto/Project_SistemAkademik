const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({
                message: "Username Sudah Pernah Terdaftar",
            });
            return;
        }

        User.findOne({
            email: req.body.email,
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({
                    message: "Email Sudah Pernah Terdaftar",
                });
                return;
            }

            next();
        });
    });
}


const verifySignUp = { checkDuplicateUsernameOrEmail };
module.exports = verifySignUp;
