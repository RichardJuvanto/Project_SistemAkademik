const db = require("../models");
const ProgramStudi = db.programStudi;
 
exports.create = (req, res) => {
 const programStudi = new ProgramStudi({
   nama: req.body.nama,
   id_kelas: req.body.id_kelas,
 });
 
 // Save ProgramStudi in the database
 programStudi
   .save(programStudi)
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while creating the ProgramStudi.",
     });
   });
};
 
exports.findAll = (req, res) => {
 const nama = req.query.nama;
 var condition = nama
   ? { nama: { $regex: new RegExp(nama), $options: "i" } }
   : {};
 
 ProgramStudi.find(condition).populate("id_kelas")
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
 
 ProgramStudi.findById(id)
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
 
 ProgramStudi.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot update ProgramStudi with id=${id}. Maybe ProgramStudi was not found!`,
       });
     } else res.send({ message: "ProgramStudi was updated successfully." });
   })
   .catch((err) => {
     res.status(500).send({
       message: "Error updating ProgramStudi with id=" + id,
     });
   });
};
exports.delete = (req, res) => {
 const id = req.params.id;
 
 ProgramStudi.findByIdAndRemove(id)
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot delete ProgramStudi with id=${id}. Maybe ProgramStudi was not found!`,
       });
     } else {
       res.send({
         message: "ProgramStudi was deleted successfully!",
       });
     }
   })
   .catch((err) => {
     res.status(500).send({
       message: "Could not delete ProgramStudi with id=" + id,
     });
   });
};
 
exports.deleteAll = (req, res) => {};
 
exports.findAllPublished = (req, res) => {};
 
