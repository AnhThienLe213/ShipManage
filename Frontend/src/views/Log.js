import React from "react";
import "../styles/Log.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebook } from '@fortawesome/free-brands-svg-icons';
import axiosInstance from "../axios";

class Log extends React.Component {

    state = {
        Email: '',
        Password: '',
        isLogin: false
    }

    handleChangeEmail = (event) => {
        this.setState({
            Email: event.target.value
        })
    }
    handleChangePassword = (event) => {
        this.setState({
            Password: event.target.value
        })
    }
    handleClickLogin = async (event) => {
        event.preventDefault()

        let { Email, Password } = this.state;
        console.log("hihi")
        const response = await axiosInstance.post('/api/login', { Email, Password });
        console.log("hihi", response)

        if (!response.data.errCode) {
            this.props.log()

        }

    }
    render() {
        let { isLogin } = this.state;
        let { log } = this.props
        return (
            <div className="login1-background">
                <div className="login1-container">
                    <div className="login1-content">
                        <h2>Login</h2>
                        <form>
                            <div className="form1-group">
                                <label className="field" for="Email">Email address:</label>
                                <input type="Email" className="form1-control" id="Email" placeholder="Enter Email" onChange={(event) => this.handleChangeEmail(event)} required />
                            </div>
                            <div className="form1-group">
                                <label className="field1" for="Password">Password:</label>
                                <input type="Password" className="form1-control" id="Password" placeholder="Password" onChange={(event) => this.handleChangePassword(event)} required />
                            </div>
                            <button type="submit" className="btn1" onClick={(event) => this.handleClickLogin(event)}>Login</button>
                            <div className="fgpw1"><span className="forgot1">Forgot your Password?</span></div>
                            <div className="other-log1"><span>Or sign in with:</span>
                            </div>
                            <div className="icon1">
                                <FontAwesomeIcon icon={faGooglePlusG} className="icongg1" />
                                <FontAwesomeIcon icon={faFacebook} className="iconfb1" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>




        )
    }
}

export default Log;