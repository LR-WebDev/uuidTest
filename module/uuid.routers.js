const uuidController = require("./uuidController")

exports.uuidRoutes = (app) => {
    app.post("/createUuid",uuidController.createUuid);
    app.patch("/updateSSL/:id",uuidController.updateSSL);
    app.get("/checkSsl",uuidController.checkSsl)
}
