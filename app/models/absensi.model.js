const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const Absensi = mongoose.model("absensi",
        mongoose.Schema({
            id_kelas:{
                type: Schema.Types.ObjectId,
                ref: 'kelas',
            },
            id_matakuliah:{
                type:Schema.Types.ObjectId,
                ref: 'matakuliah',
            },
            id_dosen:{
                type:Schema.Types.ObjectId,
                ref: 'dosen',
            },
            tanggal:String,
            jam:{
                masuk:String,
                keluar:String,
            },
            absensi:[{
                id_mahasiswa:{
                    type:Schema.Types.ObjectId,
                    ref: 'mahasiswa',
                },
                keterangan:String,
            }],
        }, {
            timestamps: true
        })
    );
    return Absensi;
}