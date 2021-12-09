const db = require("../models");
const Matakuliah = db.matakuliah;

exports.create = (req, res) => {
  const matakuliah = new Matakuliah({
    nama: req.body.nama,
    kode: req.body.kode,
    sks: req.body.sks,
    jumlahPertemuan: req.body.jumlahPertemuan,
  });

  // Save Matakuliah in the database
  Matakuliah.find({
    kode: req.body.kode,
  }).then((data) => {
    if (!data.length > 0) {
      matakuliah
        .save(matakuliah)
        .then((data1) => {
          res.send(data1);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Matakuliah.",
          });
        });
    } else {
      res.status(412).send({
        message: "Kode " + req.body.kode + " Sudah Terdaftar",
      });
    }
  });
};

exports.findAll = (req, res) => {
  const nama = req.query.nama;
  var condition = nama
    ? { nama: { $regex: new RegExp(nama), $options: "i" } }
    : {};

  Matakuliah.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });


};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Matakuliah.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving with id=" + id });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  var checkKode;
  Matakuliah.find({
    _id: id,
  })
    .then((data) => {
      checkKode = data[0].kode;
      Matakuliah.find({
        kode: req.body.kode,
      }).then((data) => {
        if (!data.length > 0 || checkKode == req.body.kode) {
          Matakuliah.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then((data) => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update Matakuliah with id=${id}. Maybe Matakuliah was not found!`,
                });
              } else res.send({ message: "Matakuliah was updated successfully." });
            })
            .catch((err) => {
              res.status(500).send({
                message: "Error updating Matakuliah with id=" + id,
              });
            });
        } else {
          res.status(412).send({
            message: "Kode " + req.body.kode + " Sudah Terdaftar",
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving with id=" + id });
    });



};
exports.delete = (req, res) => {
  const id = req.params.id;

  Matakuliah.softDelete({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Matakuliah with id=${id}. Maybe Matakuliah was not found!`,
        });
      } else {
        res.send({
          message: "Matakuliah was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Matakuliah with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => { };

exports.findAllPublished = (req, res) => { };

