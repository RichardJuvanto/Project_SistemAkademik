module.exports = (app) => {
    const dosen = require("../controllers/dosen.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", dosen.create);
    
    router.get("/", dosen.findAll);

    router.get("/:id", dosen.findOne);

    router.put("/:id", dosen.update);
    
    router.delete("/:id", dosen.delete);
    
    app.use("/api/dosen", router);
   };
   