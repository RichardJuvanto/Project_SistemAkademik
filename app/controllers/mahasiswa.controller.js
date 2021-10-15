const db = require("../models");
const Mahasiswa = db.mahasiswa;

exports.create = (req, res) => {
  const mahasiswa = new Mahasiswa({
    foto: req.files[0].filename,
    nama: req.body.nama,
    nim: req.body.nim,
    nik: req.body.nik,
    jenisKelamin: req.body.jenisKelamin,
    id_programStudi: req.body.id_programStudi,
    id_kelas: req.body.id_kelas,
    email: req.body.email,
    alamat: req.body.alamat,
    noTelp: req.body.noTelp,
    alamatOrtu: req.body.alamatOrtu,
  });

  // Save Mahasiswa in the database
  mahasiswa
    .save(mahasiswa)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Mahasiswa.",
      });
    });
};

exports.findAll = (req, res) => {
  const nama = req.query.nama;
  var condition = nama
    ? { nama: { $regex: new RegExp(nama), $options: "i" } }
    : {};

  Mahasiswa.find(condition)
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

  Mahasiswa.findById(id)
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

  const mahasiswa2 = {
    foto: req.files[0].filename,
    nama: req.body.nama,
    nim: req.body.nim,
    nik: req.body.nik,
    jenisKelamin: req.body.jenisKelamin,
    id_programStudi: req.body.id_programStudi,
    id_kelas: req.body.id_kelas,
    email: req.body.email,
    alamat: req.body.alamat,
    noTelp: req.body.noTelp,
    alamatOrtu: req.body.alamatOrtu,
  };

  Mahasiswa.findByIdAndUpdate(id, mahasiswa2, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Mahasiswa with id=${id}. Maybe Mahasiswa was not found!`,
        });
      } else res.send({ message: "Mahasiswa was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Mahasiswa with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Mahasiswa.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Mahasiswa with id=${id}. Maybe Mahasiswa was not found!`,
        });
      } else {
        res.send({
          message: "Mahasiswa was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Mahasiswa with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => { };

exports.findAllPublished = (req, res) => { };

exports.findByKelas = (req, res) =>{
  Mahasiswa.find(
    {
      $match:
      {
        id_kelas:req.query.kelas,
      }
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};
