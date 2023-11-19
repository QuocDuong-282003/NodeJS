import express from "express";
import homController from "../controller/homController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homController.getHomPage);
    router.get('/about', homController.getAboutPage);


    router.get('/crud', homController.getCRUD);
    router.post('/post-crud', homController.postCRUD);
    router.get('/get-crud', homController.displayGetCRUD);
    router.get('/edit-crud', homController.getEditCRUD);
    router.post('/put-crud', homController.putCRUD);
    router.get('/delete-crud', homController.deleteCRUD);
    // rest api
    return app.use("/", router);
}
module.exports = initWebRoutes;