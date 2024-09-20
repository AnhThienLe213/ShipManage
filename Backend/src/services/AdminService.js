import db from "../models/index";

let handleAdminLogin = (Email, Password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let adminData = {};
            let isExist = await checkAdminEmail(Email);
            if (isExist) {
                //compare Password
                let admin = await db.Admins.findOne({
                    // attributes: ['Email', 'Password'],
                    where: { Email: Email },
                    raw: true
                });
                if (admin) {
                    let check = (Password === admin.Password ? true : false)
                    if (check) {
                        adminData.errCode = 0;
                        adminData.errMessage = 'Login success';
                        delete admin.Password;
                        adminData.admin = admin;
                    } else {
                        adminData.errCode = 3;
                        adminData.errMessage = 'Wrong Password'
                    }
                } else {
                    adminData.errCode = 2;
                    adminData.errMessage = `Admin's not found`
                }

            } else {
                adminData.errCode = 1;
                adminData.errMessage = "Your Email isn't exist in our system."

            }
            resolve(adminData)
        } catch (e) {
            reject(e)
        }
    })
}


let checkAdminEmail = (adminEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let admin = await db.Admins.findOne({
                where: { Email: adminEmail }
            })
            if (admin) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleAdminLogin: handleAdminLogin
}