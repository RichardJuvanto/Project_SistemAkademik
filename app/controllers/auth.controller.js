const config = require("../auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        nama: req.body.nama,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user
        .save(user)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Absensi.",
            });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not Found!" });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password, user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            })
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            nama: user.nama,
        });

    });
}