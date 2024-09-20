import db from "../models/index";
import UserService from "../services/UserService";
import TourService from "../services/TourService";
import AttractionService from "../services/AttractionService"
import SupportService from "../services/SupportService"
import CruiseService from "../services/CruiseService"
import HotelService from "../services/HotelService"
import BookTourService from "../services/BookTourService"
import BookCruiseService from "../services/BookCruiseService"
const multer = require('multer');
let getHomePage = (req, res) => {
    return res.render("example.ejs")
}
let getAbcPage = (req, res) => {
    return res.send("Anh Thien Le")
}

let getAttraction = async (req, res) => {
    let data = await AttractionService.getAllAttract();
    return res.send(data);
}
let postAttraction = async (req, res) => {
    const img = await req.file ? req.file.buffer : null;
    let message = await AttractionService.createNewAttraction(req.body);


    return res.status(200).json({
        message: "ok"
    })
}
let putAttraction = async (req, res) => {
    let data = req.body;
    console.log(data)
    let getAllAttraction = await AttractionService.updateAttractionData(data);
}
let deleteAttraction = async (req, res) => {
    let id = req.body.id;
    await AttractionService.deleteAttractionById(id);
    return res.send('Delete the Attraction succeed')
}

let createTour = (req, res) => {
    return res.render("uploadTour.ejs")
}
let getTour = async (req, res) => {
    let data = await TourService.getAllTour();
    return res.send(data)
}
let displayTour = async (req, res) => {

    let data = await TourService.getAllTour();
    console.log("tour : ", data)
    return res.render("displayTour.ejs", {
        datatable: data
    })
}
let postTour = async (req, res) => {
    const img = await req.file ? req.file.buffer : null;
    let message = await TourService.createNewTour(req.body);


    return res.status(200).json({
        message: "ok"
    })
}
let putTour = async (req, res) => {
    let data = req.body;
    //console.log(data)
    let allTour = await TourService.updateTourData(data);
}
let deleteTour = async (req, res) => {
    let id = req.body.id;
    await TourService.deleteTourById(id);
    return res.send('Delete the user succeed')
}

let postUser = async (req, res) => {
    let message = await UserService.createNewUser(req.body);
    //await UserService.getUserInfoById(req.body.UserName)
    console.log("gui nay", req.body.UserName);
    return res.send(req.body.UserName);
}
// let getEditUser = async (req, res) => {
//     let userId = req.query.id;
//     if (userId) {
//         let userData = await UserService.getUserInfoById(userId);
//         console.log(userData)
//         return res.render("editUser.ejs", {
//             user: userData
//         })
//     } else {
//         return res.send("User not found")
//     }
// }
let putUser = async (req, res) => {
    let data = req.body;
    //console.log(data)
    let allUser = await UserService.updateUserData(data);
}
let getUser = async (req, res) => {
    let data = await UserService.getAllUser();
    //console.log("Cai nhan duoc ", req.qu)
    return res.send(data);
}
let deleteUser = async (req, res) => {
    console.log("asdfsffdsfd ", req.body)
    let id = req.body.id;
    await UserService.deleteUserById(id);
    return res.send('Delete the user succeed')
}

let getSupport = async (req, res) => {
    let data = await SupportService.getAllSupport();
    return res.send(data);
}
let putSupport = async (req, res) => {
    let data = req.body;
    //console.log(data)
    let allSupport = await SupportService.updateSupportData(data);
}
let postSupport = async (req, res) => {
    const img = await req.file ? req.file.buffer : null;
    let message = await SupportService.createNewSupport(req.body);


    return res.status(200).json({
        message: "ok"
    })
}
let deleteSupport = async (req, res) => {
    let id = req.body.id;
    await SupportService.deleteSupportById(id);
    return res.send('Delete the support succeed')
}

let getCruise = async (req, res) => {
    let data = await CruiseService.getAllCruise();
    return res.send(data);
}
let putCruise = async (req, res) => {
    let data = req.body;
    //console.log(data)
    let allCruise = await CruiseService.updateCruiseData(data);
}
let postCruise = async (req, res) => {
    const img = await req.file ? req.file.buffer : null;
    let message = await CruiseService.createNewCruise(req.body);


    return res.status(200).json({
        message: "ok"
    })
}
let deleteCruise = async (req, res) => {
    let id = req.body.id;
    await CruiseService.deleteCruiseById(id);
    return res.send('Delete the Cruise succeed')
}

let getHotel = async (req, res) => {
    let data = await HotelService.getAllHotel();
    return res.send(data);
}
let putHotel = async (req, res) => {
    let data = req.body;
    //console.log(data)
    let allHotel = await HotelService.updateHotelData(data);
}
let postHotel = async (req, res) => {
    const img = await req.file ? req.file.buffer : null;
    let message = await HotelService.createNewHotel(req.body);


    return res.status(200).json({
        message: "ok"
    })
}
let deleteHotel = async (req, res) => {
    let id = req.body.id;
    await HotelService.deleteHotelById(id);
    return res.send('Delete the user succeed')
}

let getBookTour = async (req, res) => {
    let data = await BookTourService.getAllBookTour();
    return res.send(data);
}
let putBookTour = async (req, res) => {
    let data = req.body;
    //console.log(data)
    let allBookTour = await BookTourService.updateBookTourData(data);
}
let postBookTour = async (req, res) => {
    const img = await req.file ? req.file.buffer : null;
    let message = await BookTourService.createNewBookTour(req.body);


    return res.status(200).json({
        message: "ok"
    })
}
let confirmBookTour = async (req, res) => {
    let mes = await BookTourService.confirmBookTour(req)
    res.send(mes.message)
}

let getBookCruise = async (req, res) => {
    let data = await BookCruiseService.getAllBookCruise();
    return res.send(data);
}
let putBookCruise = async (req, res) => {
    let data = req.body;
    //console.log(data)
    let allBookCruise = await BookCruiseService.updateBookCruiseData(data);
}
let postBookCruise = async (req, res) => {
    const img = await req.file ? req.file.buffer : null;
    let message = await BookCruiseService.createNewBookCruise(req.body);


    return res.status(200).json({
        message: "ok"
    })
}
let confirmBookCruise = async (req, res) => {
    let mes = await BookCruiseService.confirmBookCruise(req)
    res.send(mes.message)
}
module.exports = {
    getHomePage: getHomePage,
    getAbcPage: getAbcPage,
    getUser: getUser,
    postUser: postUser,
    // displayUser: displayUser,
    // getEditUser: getEditUser,
    putUser: putUser,
    deleteUser: deleteUser,
    createTour: createTour,
    postTour: postTour,
    getTour: getTour,
    displayTour: displayTour,
    putTour: putTour,
    deleteTour: deleteTour,
    getAttraction: getAttraction,
    postAttraction: postAttraction,
    putAttraction: putAttraction,
    deleteAttraction: deleteAttraction,
    getSupport: getSupport,
    putSupport: putSupport,
    postSupport: postSupport,
    deleteSupport: deleteSupport,
    getCruise: getCruise,
    putCruise: putCruise,
    postCruise: postCruise,
    deleteCruise: deleteCruise,
    getHotel: getHotel,
    putHotel: putHotel,
    postHotel: postHotel,
    deleteHotel: deleteHotel,
    getBookTour: getBookTour,
    putBookTour: putBookTour,
    postBookTour: postBookTour,
    confirmBookTour: confirmBookTour,
    getBookCruise: getBookCruise,
    putBookCruise: putBookCruise,
    postBookCruise: postBookCruise,
    confirmBookCruise: confirmBookCruise
}