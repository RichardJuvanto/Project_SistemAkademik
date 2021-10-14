module.exports = (app) => {
    const mahasiswa = require("../controllers/mahasiswa.controller.js");
    var router = require("express").Router();
    
    var multer = require("multer");
    var path = require("path");
    const generateFileName = () => {
        const dateNow = Date.now();
        const random = Math.floor(Math.random() * 9000000000000) + 1000000000000;
        return `${dateNow}-${random}`;
    };
    var upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, "./uploads/gambar");
            },
            filename: function (req, file, callback) {
                callback(
                    null,
                    Date.now() +
                    Math.floor(Math.random() * 9000000000000) +
                    1000000000000 +
                    path.extname(file.originalname)
                );
            },
        }),
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if (
                ext !== ".png" &&
                ext !== ".jpg" &&
                ext !== ".gif" &&
                ext !== ".jpeg"
            ) {
                return callback(/*res.end('Only images are allowed')*/ null, false);
            }
            callback(null, true);
        },
    });
    router.post("/", upload.any(),mahasiswa.create);
    
    router.get("/", mahasiswa.findAll);

    router.get("/:id", mahasiswa.findOne);

    router.put("/:id", mahasiswa.update);
    
    router.delete("/:id", mahasiswa.delete);
    
    app.use("/api/mahasiswa", router);
   };
   