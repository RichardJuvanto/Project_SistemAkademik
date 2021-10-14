module.exports = (app) => {
    const kelas = require("../controllers/kelas.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", kelas.create);
    
    router.get("/", kelas.findAll);

    router.get("/:id", kelas.findOne);

    router.put("/:id", kelas.update);
    
    router.delete("/:id", kelas.delete);
    
    app.use("/api/kelas", router);
   };
   