const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const Matakuliah = mongoose.model("matakuliah",
        mongoose.Schema({
            nama: String,
            kode: String,
            sks: String,
            jumlahPertemuan: String,
        }, {
            timestamps: true
        })
    );
    return Matakuliah;
}