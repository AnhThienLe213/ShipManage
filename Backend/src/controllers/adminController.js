import AdminService from "../services/AdminService"

let handleLogin = async (req, res) => {
    let Email = req.body.Email;
    let Password = req.body.Password;
    if (!Email || !Password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let adminData = await AdminService.handleAdminLogin(Email, Password);
    return res.status(200).json({
        errCode: adminData.errCode,
        message: adminData.errMessage,
        admin: adminData.admin
    })
}

module.exports = {
    handleLogin: handleLogin
}