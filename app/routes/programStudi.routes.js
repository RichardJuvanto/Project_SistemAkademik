module.exports = (app) => {
    const programStudi = require("../controllers/programStudi.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", programStudi.create);
    
    router.get("/", programStudi.findAll);

    router.get("/:id", programStudi.findOne);

    router.put("/:id", programStudi.update);
    
    router.delete("/:id", programStudi.delete);
    
    app.use("/api/programStudi", router);
   };
   