module.exports = (app) => {
    const pegawai = require("../controllers/matakuliah.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", matakuliah.create);
    
    router.get("/", matakuliah.findAll);

    router.get("/:id", matakuliah.findOne);

    router.put("/:id", matakuliah.update);
    
    router.delete("/:id", matakuliah.delete);
    
    app.use("/api/matakuliah", router);
   };
   