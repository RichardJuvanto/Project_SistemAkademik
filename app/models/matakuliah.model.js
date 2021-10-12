const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const Kelas = mongoose.model("kelas",
        mongoose.Schema({
            nama: String,
            kode: String,
            sks: String,
            jumlahPertemuan: String,
        }, {
            timestamps: true
        })
    );
    return Kelas;
}