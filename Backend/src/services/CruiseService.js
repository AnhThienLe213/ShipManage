import db from "../models/index";

let updateCruiseData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cruise = await db.Cruises.findOne({
                where: { id: data.id },

            })
            if (cruise) {
                cruise.CruiseName = data.CruiseName
                cruise.CruiseImg = data.CruiseImg
                cruise.Duration = data.Duration
                cruise.Price = data.Price
                cruise.Description = data.Description
                // cruise.previewImg=data.previewImg
                console.log(cruise)
                await cruise.save();
                let allCruise = await db.Cruises.findAll();
                resolve(allCruise);
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e)
        }
    })
}
let getCruiseInfoById = (CruiseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cruise = await db.Cruises.findOne({
                where: { id: CruiseId },
                raw: true
            })
            if (cruise) {
                resolve(cruise)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllCruise = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let cruise = await db.Cruises.findAll({
                raw: true
            });

            // console.log(user);
            resolve(cruise);
        } catch (e) {
            reject(e)
        }
    })
}
let createNewCruise = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Cruises.create({
                CruiseName: data.CruiseName,
                CruiseImg: data.CruiseImg,
                Duration: data.Duration,
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
let deleteCruiseById = (cruiseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cruise = await db.Cruises.findOne({
                where: { id: cruiseId }
            })
            if (cruise) {
                await cruise.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    updateCruiseData: updateCruiseData,
    getCruiseInfoById: getCruiseInfoById,
    getAllCruise: getAllCruise,
    createNewCruise: createNewCruise,
    deleteCruiseById: deleteCruiseById,
}