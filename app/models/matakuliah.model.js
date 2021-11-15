const { Schema } = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose")
module.exports = (mongoose) => {

    const MatakuliahSchema = mongoose.Schema({
        nama: String,
        kode: String,
        sks: String,
        jumlahPertemuan: String,
    }, {
        timestamps: true
    });
    MatakuliahSchema.plugin(softDeletePlugin);
    const Matakuliah = mongoose.model("matakuliah", MatakuliahSchema);
    return Matakuliah;
}