import db from "../models/index";

let updateHotelData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hotel = await db.Hotels.findOne({
                where: { id: data.id },

            })
            if (hotel) {
                hotel.HotelName = data.HotelName
                hotel.HotelImg = data.HotelImg
                hotel.Location = data.Location
                hotel.Price = data.Price
                hotel.Description = data.Description
                // hotel.previewImg=data.previewImg
                console.log(hotel)
                await hotel.save();
                let allHotel = await db.Hotels.findAll();
                resolve(allHotel);
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e)
        }
    })
}
let getHotelInfoById = (HotelId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hotel = await db.Hotels.findOne({
                where: { id: HotelId },
                raw: true
            })
            if (hotel) {
                resolve(hotel)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllHotel = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let hotel = await db.Hotels.findAll({
                raw: true
            });
            // console.log(user);
            resolve(hotel);
        } catch (e) {
            reject(e)
        }
    })
}
let createNewHotel = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Hotels.create({
                HotelName: data.HotelName,
                HotelImg: data.HotelImg,
                Location: data.Location,
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
let deleteHotelById = (hotelId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hotel = await db.Hotels.findOne({
                where: { id: hotelId }
            })
            if (hotel) {
                await hotel.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    updateHotelData: updateHotelData,
    getHotelInfoById: getHotelInfoById,
    getAllHotel: getAllHotel,
    createNewHotel: createNewHotel,
    deleteHotelById: deleteHotelById,
}