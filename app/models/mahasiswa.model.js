const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const Mahasiswa = mongoose.model("mahasiswa",
        mongoose.Schema({
            foto: String,
            nama: String,
            nim: String,
            nik: String,
            jenisKelamin: String,
            id_programStudi:{ 
                type: Schema.Types.ObjectId,
                ref: 'programStudi',
            },
            id_kelas:{
                type: Schema.Types.ObjectId,
                ref: 'kelas',
            },
            email: String,
            alamat: String,
            noTelp: String,
            alamatOrtu: String,
        }, {
            timestamps: true
        })
    );
    return Mahasiswa;
}