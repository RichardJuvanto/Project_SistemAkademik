const { absensi, mongoose } = require("../models");
const db = require("../models");
const Absensi = db.absensi;

exports.create = (req, res) => {
  const absensi = new Absensi({
    id_kelas: req.body.id_kelas,
    id_matakuliah: req.body.id_matakuliah,
    id_dosen: req.body.id_dosen,
    tanggal: req.body.tanggal,
    'jam': req.body.jam,
    'absensi': req.body.absensi
  });
  // Save Absensi in the database
  absensi
    .save(absensi)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Absensi.",
      });
    });
};

exports.findAll = (req, res) => {
  Absensi.find().populate("id_matakuliah").populate("absensi.id_mahasiswa")
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

  Absensi.findById(id)
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

  Absensi.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Absensi with id=${id}. Maybe Absensi was not found!`,
        });
      } else res.send({ message: "Absensi was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Absensi with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Absensi.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Absensi with id=${id}. Maybe Absensi was not found!`,
        });
      } else {
        res.send({
          message: "Absensi was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Absensi with id=" + id,
      });
    });
};

exports.detail = (req, res) => {
  if (req.query.kelas && req.query.matakuliah && req.query.mahasiswa) {
    Absensi.aggregate([
      {
        $match: {
          id_kelas: mongoose.Types.ObjectId(req.query.kelas),
          id_matakuliah: mongoose.Types.ObjectId(req.query.matakuliah)
        }
      },
      {
        $unwind: "$absensi",
      },
      {
        $group: {
          _id: { id_mahasiswa: "$absensi.id_mahasiswa" },
          kelas: { $first: "$id_kelas" },
          jumlah: { $sum: 1 },
        }
      },
      {
        $project: {
          total: "$jumlah",
          //percent: { $multiply: [{ $divide: ["$jumlah", "$jumlah"] }, 100] },
        }
      },
    ]).then((data) => {
      Absensi.aggregate([
        {
          $match: {
            id_kelas: mongoose.Types.ObjectId(req.query.kelas),
            id_matakuliah: mongoose.Types.ObjectId(req.query.matakuliah),
          }
        },
        {
          $unwind: "$absensi",
        },
        {
          $group: {
            _id: { id_mahasiswa: "$absensi.id_mahasiswa", keterangan: "$absensi.keterangan" },
            kelas: { $first: "$id_kelas" },
            jumlah: { $sum: 1 },
          }
        }, {
          $match: {
            "_id.id_mahasiswa": mongoose.Types.ObjectId(req.query.mahasiswa),
          }
        },
        {
          $project: {
            _id: 1,
            kelas: 1,
            percent: { $multiply: [{ $divide: ["$jumlah", data[0].total] }, 100] },
          }
        },
      ]).populate("id_mahasiswa").then((data1) => {
        res.send(data1);
      });
    });

  }
}

exports.laporan = (req, res) => {
  if (req.query.kelas && req.query.matakuliah) {
    Absensi.aggregate([
      {
        $match: {
          id_kelas: mongoose.Types.ObjectId(req.query.kelas),
          id_matakuliah: mongoose.Types.ObjectId(req.query.matakuliah)
        }
      },
      {
        $unwind: "$absensi",
      },
      {
        $group: {
          _id: { id_mahasiswa: "$absensi.id_mahasiswa" },
          kelas: { $first: "$id_kelas" },
          jumlah: { $sum: 1 },
        }
      },
      {
        $project: {
          total: "$jumlah",
          //percent: { $multiply: [{ $divide: ["$jumlah", "$jumlah"] }, 100] },
        }
      },
    ]).then((data) => {
      Absensi.aggregate([

        {
          $match: {
            id_kelas: mongoose.Types.ObjectId(req.query.kelas),
            id_matakuliah: mongoose.Types.ObjectId(req.query.matakuliah),
          }
        },
        {
          $unwind: "$absensi",
        },
        {
          $group: {
            _id: { id_mahasiswa: "$absensi.id_mahasiswa", keterangan: "$absensi.keterangan" },
            kelas: { $first: "$id_kelas" },
            matakuliah: { $first: "$id_matakuliah" },
            mahasiswa: { $first: "$absensi.id_mahasiswa" },
            keterangan: { $first: "$absensi.keterangan" },
            jumlah: { $sum: 1 },
          }
        }, {
          $match: {
            "_id.keterangan": "Hadir",
          }
        },
        {
          $project: {
            kelas: 1,
            matakuliah: 1,
            mahasiswa: 1,
            keterangan: 1,
            percent: { $multiply: [{ $divide: ["$jumlah", data[0].total] }, 100] },
          }
        }, {
          $lookup: {
            from: "mahasiswas",
            localField: "mahasiswa",
            foreignField: "_id",
            as: "mahasiswa"
          }
        },
        {
          $lookup: {
            from: "kelas",
            localField: "kelas",
            foreignField: "_id",
            as: "kelas"
          }
        },
        {
          $lookup: {
            from: "matakuliahs",
            localField: "matakuliah",
            foreignField: "_id",
            as: "matakuliah"
          }
        },
      ]).then((data1) => {
        //res.send(data1);
        if (!data1) {
          res.status(503).send({
            message: "id_matakuliah or id_kelas was not found!"
          });
        }else{
          res.send(data1);
        }
      });
    }).catch((err)=>{
      res.status(500).send({
        message: "id_matakuliah or id_kelas not Found!"
      });
    });
  }
};

exports.deleteAll = (req, res) => { };

exports.findAllPublished = (req, res) => { };

