import db from "../models/index"

let getAllAttract = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let attract = await db.Attractions.findAll({
                //raw: true
            });
            // console.log(user);
            resolve(attract);
        } catch (e) {
            reject(e)
        }
    })
}
let createNewAttraction = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Attractions.create({

                AttractionName: data.AttractionName,
                AttractionImg: data.AttractionImg,
                Description: data.Description,
            })
            resolve("Create success")
        }
        catch (e) {
            reject(e)
        }
    })

}
let updateAttractionData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let attraction = await db.Attractions.findOne({
                where: { id: data.id },

            })
            if (attraction) {
                attraction.AttractionName = data.AttractionName
                attraction.AttractionImg = data.AttractionImg
                attraction.Description = data.description
                // attraction.previewImg=data.previewImg
                // console.log(attraction)
                await attraction.save();
                // let allTour = await db.Tour.findAll();
                let allAttract = await db.User.findAll();

                resolve(allAttract);
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e)
        }
    })
}
let deleteAttractionById = (attractionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let attraction = await db.Attractions.findOne({
                where: { id: attractionId }
            })
            if (attraction) {
                await attraction.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllAttract: getAllAttract,
    createNewAttraction: createNewAttraction,
    updateAttractionData: updateAttractionData,
    deleteAttractionById: deleteAttractionById,
}