const { Schema } = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose")
module.exports = (mongoose) => {

    const MahasiswaSchema = mongoose.Schema({
        foto: String,
        nama: String,
        nim: String,
        nik: String,
        jenisKelamin: String,
        id_programStudi: {
            type: Schema.Types.ObjectId,
            ref: 'programStudi',
        },
        id_kelas: {
            type: Schema.Types.ObjectId,
            ref: 'kelas',
        },
        email: String,
        alamat: String,
        noTelp: String,
        alamatOrtu: String,
        isDeleted: Boolean,
    }, {
        timestamps: true
    });
    MahasiswaSchema.plugin(softDeletePlugin);
    const Mahasiswa = mongoose.model("mahasiswa", MahasiswaSchema);
    return Mahasiswa;
}