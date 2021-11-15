const { Schema } = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose")

module.exports = (mongoose) => {
    const DosenSchema = mongoose.Schema({
        nama: String,
        nip: String,
        email: String,
        kompetensi: [String],
        id_matakuliah: [{
            type: Schema.Types.ObjectId,
            ref: 'matakuliah'
        }],
        isDeleted: Boolean,
    }, {
        timestamps: true
    });
    DosenSchema.plugin(softDeletePlugin);
    const Dosen = mongoose.model("dosen", DosenSchema);
    return Dosen;
}