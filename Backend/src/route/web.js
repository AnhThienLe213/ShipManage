const HomeController = require('../controllers/HomeController');
const express = require('express');
import adminController from "../controllers/adminController"
const multer = require('multer');
let router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
let initWebRoutes = (app) => {
    router.get("/", HomeController.getHomePage)
    router.get("/abc", HomeController.getAbcPage)
    router.get("/api/getUser", HomeController.getUser)
    //router.get("/edit-crud", HomeController.getEditUser)
    router.post("/put-User", HomeController.putUser)
    router.post("/post-User", HomeController.postUser)
    router.post("/delete-User", HomeController.deleteUser)
    //router.get("/display-crud", HomeController.displayUser)
    //router.get("/delete-crud", HomeController.deleteUser)

    router.get("/create-tour", HomeController.createTour)
    router.get("/api/getTour", HomeController.getTour)
    router.get("/display-Tour", HomeController.displayTour)
    router.post("/post-Tour", upload.single('img'), HomeController.postTour)
    router.post("/put-Tour", HomeController.putTour)
    router.post("/delete-Tour", HomeController.deleteTour)

    router.get("/api/getAttraction", HomeController.getAttraction)
    router.post("/post-Attraction", upload.single('img'), HomeController.postAttraction)
    router.post("/put-Attraction", HomeController.putAttraction)
    router.post("/delete-Attraction", HomeController.deleteAttraction)

    router.get("/api/getSupport", HomeController.getSupport)
    router.post("/put-Support", HomeController.putSupport)
    router.post("/post-Support", upload.single('img'), HomeController.postSupport)
    router.post("/delete-Support", HomeController.deleteSupport)

    router.get("/api/getCruise", HomeController.getCruise)
    router.post("/put-Cruise", HomeController.putCruise)
    router.post("/post-Cruise", upload.single('img'), HomeController.postCruise)
    router.post("/delete-Cruise", HomeController.deleteCruise)

    router.get("/api/getHotel", HomeController.getHotel)
    router.post("/put-Hotel", HomeController.putHotel)
    router.post("/post-Hotel", upload.single('img'), HomeController.postHotel)
    router.post("/delete-Hotel", HomeController.deleteHotel)

    router.get("/api/getBookTour", HomeController.getBookTour)
    router.post("/put-BookTour", HomeController.putBookTour)
    router.post("/post-BookTour", HomeController.postBookTour)
    router.get('/api/booktours/confirm/:ConfirmationCode', HomeController.confirmBookTour);

    router.get("/api/getBookCruise", HomeController.getBookCruise)
    router.post("/put-BookCruise", HomeController.putBookCruise)
    router.post("/post-BookCruise", HomeController.postBookCruise)
    router.get('/api/bookcruises/confirm/:ConfirmationCode', HomeController.confirmBookCruise);


    router.post("/api/login", adminController.handleLogin)

    return app.use("/", router)
}

module.exports = initWebRoutes;