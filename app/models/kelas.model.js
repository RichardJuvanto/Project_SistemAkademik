const { Schema } = require("mongoose");
const {softDeletePlugin} = require("soft-delete-plugin-mongoose");
module.exports = (mongoose) => {
    const KelasSchema = mongoose.Schema({
            nama: String,
            id_matakuliah:[{
                type: Schema.Types.ObjectId,
                ref: 'matakuliah',
            }],
            isDeleted: Boolean,
        }, {
            timestamps: true
        })
    
    KelasSchema.plugin(softDeletePlugin,{ overrideMethods: 'all' });
    const Kelas = mongoose.model("kelas",KelasSchema);
    return Kelas;
}