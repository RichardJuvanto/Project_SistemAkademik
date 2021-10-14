const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const Dosen = mongoose.model("dosen",
        mongoose.Schema({
            nama: String,
            nip: String,
            email: String,
            kompetensi: [String],
            id_matakuliah:[{
                type: Schema.Types.ObjectId,
                ref: 'matakuliah'
            }],
        }, {
            timestamps: true
        })
    );
    return Dosen;
}