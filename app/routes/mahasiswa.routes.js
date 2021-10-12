module.exports = (app) => {
    const pegawai = require("../controllers/mahasiswa.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", mahasiswa.create);
    
    router.get("/", mahasiswa.findAll);

    router.get("/:id", mahasiswa.findOne);

    router.put("/:id", mahasiswa.update);
    
    router.delete("/:id", mahasiswa.delete);
    
    app.use("/api/mahasiswa", router);
   };
   