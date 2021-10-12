const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const Kelas = mongoose.model("kelas",
        mongoose.Schema({
            nama: String,
            id_matakuliah:[{
                type: Schema.Types.ObjectId,
                ref: 'matakuliah',
            }],
        }, {
            timestamps: true
        })
    );
    return Kelas;
}