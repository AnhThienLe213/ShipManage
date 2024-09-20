import db from "../models/index";

let createNewSupport = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Supports.create({
                Name: data.Name,
                Image: data.Image,
                Email: data.Email,
                Tel: data.Tel,

            })
            resolve("Create success")
        }
        catch (e) {
            reject(e)
        }
    })

}
let getAllSupport = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let sp = await db.Supports.findAll({
                raw: true
            });
            // console.log(user);
            resolve(sp);
        } catch (e) {
            reject(e)
        }
    })
}
let updateSupportData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let support = await db.Supports.findOne({
                where: { id: data.id },

            })
            if (support) {
                support.Name = data.Name
                support.Email = data.Email
                support.Tel = data.Tel
                support.Image = data.Image

                // support.previewImg=data.previewImg
                console.log(support)
                await support.save();
                let allSupport = await db.Supports.findAll();
                resolve(allSupport);
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e)
        }
    })
}
let deleteSupportById = (supportId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let support = await db.Supports.findOne({
                where: { id: supportId }
            })
            if (support) {
                await support.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    updateSupportData: updateSupportData,
    getAllSupport: getAllSupport,
    createNewSupport: createNewSupport,
    deleteSupportById: deleteSupportById,
}