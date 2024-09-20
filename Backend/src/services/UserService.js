import db from "../models/index"

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Users.create({

                UserName: data.UserName,
                Email: data.Email,
                Phone: data.Phone
            })
            resolve("Create success")
        }
        catch (e) {
            reject(e)
        }
    })

}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findAll({
                raw: true
            });
            // console.log(user);
            resolve(user);
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: data.id },

            })
            if (user) {
                user.email = data.email;
                user.password = data.password;
                // console.log(user)
                await user.save();
                let allUsera = await db.Users.findAll();
                resolve(allUsera);
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,

}