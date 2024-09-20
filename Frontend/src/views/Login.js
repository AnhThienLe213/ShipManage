import React from "react";
import "../styles/Login.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Navigation from "./Navigation"
import axiosInstance from "../axios";
import CRUDTour from "../system/admin/CRUDTour";
import CRUDAttraction from "../system/admin/CRUDAttraction";
import CRUDCruise from "../system/admin/CRUDCruise";
import CRUDHotel from "../system/admin/CRUDHotel";
import CRUDUser from "../system/admin/CRUDUser";
import Tour from "./Tour";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import CRUDSupport from "../system/admin/CRUDSupport";
import Log from "./Log";
import { NavLink } from "react-router-dom";
class Login extends React.Component {

    state = {
        email: '',
        password: '',
        isLogin: false
    }


    handleLogin = async () => {
        this.setState({
            isLogin: !this.state.isLogin
        })
    }


    render() {
        let { isLogin } = this.state;
        console.log(isLogin)
        return (
            <>
                {window.location.pathname === "/" ?
                    <Navigation /> :
                    <>{isLogin === false ?
                        <>
                            <Routes>
                                <Route path="/admin" element={<Log log={this.handleLogin} />} />
                            </Routes>
                            {/* <NavLink to="/admin">Đăng Nhập</NavLink> */}
                        </>
                        :
                        <><div className="admin">
                            <NavLink to="/system/attractions" className="alt">Attraction</NavLink>
                            <NavLink to="/system/tours" className="alt">Tour</NavLink>
                            <NavLink to="/system/supports" className="alt">Support</NavLink>
                            <NavLink to="/system/cruises" className="alt">Cruise</NavLink>
                            <NavLink to="/system/hotels" className="alt">Hotel</NavLink>
                            <NavLink to="/system/users" className="alt">User</NavLink>
                        </div>
                            <Routes>
                                <Route path="/system/attractions" element={<CRUDAttraction />} />
                                <Route path="/system/tours" element={<CRUDTour />} />
                                <Route path="/system/supports" element={<CRUDSupport />} />
                                <Route path="/system/cruises" element={<CRUDCruise />} />
                                <Route path="/system/hotels" element={<CRUDHotel />} />
                                <Route path="/system/users" element={<CRUDUser />} />
                            </Routes>
                        </>}
                    </>
                }
            </>
        )
    }

}
export default Login;