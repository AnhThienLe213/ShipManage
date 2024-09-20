import React from "react";
import "../styles/Nav.scss"
import {
    Link,
    NavLink
} from "react-router-dom";
import logo from "../assets/images/logo.jpg"
import cskh from '../assets/images/cskh.jpg'
//import Login from "./Login";
import Hotel from "./Hotel.js";
import Tour from "./Tour.js";
import Home from './Home.js';
import Booking from "./Component/Booking.js";
import "../assets/images/backgr.jpg"
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

class Navigation extends React.Component {
    // state = {
    //     isLogin: false
    // }
    render() {
        // let { isLogin } = this.state;
        return (<>
            {/* {isLogin ? <> */}
            <div className="topnav">
                <div className="img_logo">
                    <img src={logo} alt="None" />
                    <div className="name">Iris Cruise</div>
                </div>
                <div className="taskbar">
                    <span >
                        <NavLink activeClassName="active" to="/" exact={true}>Home</NavLink>
                        <NavLink to="/todo" activeClassName="active">Tour</NavLink>
                        <NavLink to="/about" activeClassName="active">Hotel</NavLink>
                    </span>
                </div>
                <div className="img_logo">
                    <span><img src={cskh} alt="none" /></span>
                    <div className="phone">0123456789</div>
                </div>
            </div>
            <div className='backgr'>  </div>
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/todo" element={<Tour />} />
                <Route path="/about" element={<Hotel />} />
                <Route path="/booking-tour/:tourid" element={<Booking />} />
            </Routes>


            {/* </> :
                <Login />} */}
        </>
        )
    }
}

export default Navigation;