const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const ProgramStudi = mongoose.model("programStudi",
        mongoose.Schema({
            nama: String,
            id_kelas:[{
                type: Schema.Types.ObjectId,
                ref: 'kelas',
            }]
        }, {
            timestamps: true
        })
    );
    return ProgramStudi;
}