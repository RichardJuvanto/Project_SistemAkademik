module.exports = (app) => {
    const absensi = require("../controllers/absensi.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", absensi.create);
    
    router.get("/", absensi.findAll);

    router.get("/:id", absensi.findOne);

    router.put("/:id", absensi.update);
    
    router.delete("/:id", absensi.delete);
    
    app.use("/api/absensi", router);
   };
   