import db from "../models/index";
import EmailService from "./EmailService";
const crypto = require('crypto');

let createNewBookCruise = async (data) => {
    // return new Promise(async (resolve, reject) => {
    //     try {
    //         await db.Bookings.create({
    //             Name: data.Name,
    //             Image: data.Image,
    //             Email: data.Email,
    //             Tel: data.Tel,

    //         })
    //         resolve("Create success")
    //     }
    //     catch (e) {
    //         reject(e)
    //     }
    // })
    console.log("Data nay ", data)
    const { UserName, Email, BookingDate, item, Phone } = data;
    console.log("BookingDate: ", BookingDate)
    try {
        let user = await db.Users.findOne({ where: { Email } });

        if (!user) {
            user = await db.Users.create({ UserName, Email, Phone });

        }

        const ConfirmationCode = crypto.randomBytes(20).toString('hex');
        const bookings = await db.BookCruises.create({
            UserID: user.id,
            CruiseID: item.id,
            BookingDate: BookingDate,
            ConfirmationCode: ConfirmationCode,
        });
        console.log("booking tao duoc ", bookings)

        const confirmationLink = `http://localhost:8081/api/bookCruises/confirm/${ConfirmationCode}`;

        EmailService.sendBookingConfirmation(Email, { bookings, item }, confirmationLink);

        return { message: 'Booking created. Please check your email to confirm the booking.' };
    } catch (error) {
        console.error(error);
        return { message: 'Server error' };
    }
}
let confirmBookCruise = async (data) => {
    const { ConfirmationCode } = data.params;
    console.log(data.params)
    try {
        const bookings = await db.BookCruises.findOne({ where: { ConfirmationCode } });

        if (!bookings) {
            return data.status(404).json({ message: 'Booking not found or already confirmed' });
        }

        bookings.IsConfirmed = true;
        bookings.ConfirmationCode = null;
        await bookings.save();

        return { message: 'Booking confirmed successfully' };
    } catch (error) {
        console.error(error);
        return { message: 'Server error' };
    }
}


let getAllBookCruise = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let sp = await db.BookCruises.findAll({
                raw: true
            });
            // console.log(user);
            resolve(sp);
        } catch (e) {
            reject(e)
        }
    })
}
let updateBookCruiseData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.BookCruises.findOne({
                where: { id: data.id },

            })
            if (booking) {
                booking.Name = data.Name
                booking.Email = data.Email
                booking.Tel = data.Tel
                booking.Image = data.Image

                // booking.previewImg=data.previewImg
                console.log(booking)
                await booking.save();
                let allBookCruise = await db.BookCruises.findAll();
                resolve(allBookCruise);
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e)
        }
    })
}
module.exports = {
    updateBookCruiseData: updateBookCruiseData,
    getAllBookCruise: getAllBookCruise,
    createNewBookCruise: createNewBookCruise,
    confirmBookCruise: confirmBookCruise,
}