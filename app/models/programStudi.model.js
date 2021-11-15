const { Schema } = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose")
module.exports = (mongoose) => {

    const ProgramStudiSchema = mongoose.Schema({
        nama: String,
        id_kelas: [{
            type: Schema.Types.ObjectId,
            ref: 'kelas',
        }]
    }, {
        timestamps: true
    })
    ProgramStudiSchema.plugin(softDeletePlugin)
    const ProgramStudi = mongoose.model("programStudi", ProgramStudiSchema);
    return ProgramStudi;
}