import db from "../models/index";

let updateTourData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tour = await db.Tours.findOne({
                where: { id: data.id },

            })
            if (tour) {
                tour.TourName = data.TourName
                tour.TourImg = data.TourImg
                tour.Duration = data.Duration
                tour.Transportation = data.Transportation
                tour.DepartureLocation = data.DepartureLocation
                tour.Price = data.Price
                tour.Description = data.Description
                // tour.previewImg=data.previewImg
                console.log(tour)
                await tour.save();
                let allTour = await db.Tours.findAll();
                resolve(allTour);
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e)
        }
    })
}
let getTourInfoById = (TourId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tour = await db.Tours.findOne({
                where: { id: TourId },
                raw: true
            })
            if (tour) {
                resolve(tour)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllTour = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let tour = await db.Tours.findAll({
                raw: true
            });
            // console.log(tour);
            resolve(tour);
        } catch (e) {
            reject(e)
        }
    })
}
let createNewTour = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Tours.create({
                TourName: data.TourName,
                TourImg: data.TourImg,
                Duration: data.Duration,
                Transportation: data.Transportation,
                DepartureLocation: data.DepartureLocation,
                Price: data.Price,
                Description: data.Description,
            })
            resolve("Create success")
        }
        catch (e) {
            reject(e)
        }
    })

}
let deleteTourById = (tourId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tour = await db.Tours.findOne({
                where: { id: tourId }
            })
            if (tour) {
                await tour.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    updateTourData: updateTourData,
    getTourInfoById: getTourInfoById,
    getAllTour: getAllTour,
    createNewTour: createNewTour,
    deleteTourById: deleteTourById,
}