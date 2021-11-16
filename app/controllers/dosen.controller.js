const db = require("../models");
const Dosen = db.dosen;

exports.create = (req, res) => {
  const dosen = new Dosen({
    nama: req.body.nama,
    nip: req.body.nip,
    email: req.body.email,
    kompetensi: req.body.kompetensi,
    id_matakuliah: req.body.id_matakuliah,
  });

  // Save Dosen in the database
  Dosen.find({
    nip: req.body.nip,
  }).then((data) => {
    if (!data.length > 0) {
      dosen
        .save(dosen)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Dosen.",
          });
        });
    } else {
      res.status(412).send({
        message: "Dosen dengan NIP " + req.body.nip + " Sudah Terdaftar",
      })
    }
  });
};

exports.findAll = (req, res) => {
  const nama = req.query.nama;
  var condition = nama
    ? { nama: { $regex: new RegExp(nama), $options: "i" } }
    : {};

 /* Dosen.find(condition).populate('id_matakuliah')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });*/
    Dosen.aggregate([
      {
        $match:{isDeleted:false},
      },
      {
        $lookup: {
          from: "matakuliahs",
          localField: "id_matakuliah",
          foreignField: "_id",
          as: "id_matakuliah"
        }
      },
    ]).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Dosen.findById(id)
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

  Dosen.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Dosen with id=${id}. Maybe Dosen was not found!`,
        });
      } else res.send({ message: "Dosen was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Dosen with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  /*Dosen.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Dosen with id=${id}. Maybe Dosen was not found!`,
        });
      } else {
        res.send({
          message: "Dosen was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Dosen with id=" + id,
      });
    });*/

  Dosen.softDelete({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Dosen with id=${id}. Maybe Dosen was not found!`,
        });
      } else {
        res.send({
          message: "Dosen was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Dosen with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => { };

exports.findAllPublished = (req, res) => { };

