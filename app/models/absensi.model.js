const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const Absensi = mongoose.model("absensi",
        mongoose.Schema({
            prodi: String,

        }, {
            timestamps: true
        })
    );
    return Absensi;
}