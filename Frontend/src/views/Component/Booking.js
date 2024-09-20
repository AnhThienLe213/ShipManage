import React from "react"
import '../../styles/Booking.scss'
import axiosInstance from "../../axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faStar } from '@fortawesome/free-solid-svg-icons';
import { Buffer } from 'buffer';

class Booking extends React.Component {
    state = {
        attract: [],
        loading: true,
        error: null,
        id: '',
        UserName: '',
        Email: '',
        Phone: '',
        Count: '',
        UserId: '',
        BookingDate: '',
        User: [],
        obj: {},
        message: '',
    }
    EditImageUrl = (item, field) => {
        let imgBase64 = '';
        switch (field) {
            case "tour":
                if (item.TourImg) {


                    imgBase64 = new Buffer(item.TourImg, 'base64').toString('binary')
                }
                break;
            case "support":
                if (item.Image) {


                    imgBase64 = new Buffer(item.Image, 'base64').toString('binary')
                }
                break;
        }
        return imgBase64;
    }
    handleChange = (event, field) => {
        let filteredProducts = event.target.value;

        switch (field) {
            case "UserName":
                this.setState({
                    UserName: filteredProducts
                })
                break;
            case "Email":
                this.setState({
                    Email: filteredProducts
                })
                break;
            case "Phone":
                this.setState({
                    Phone: filteredProducts
                })
                break;
            case "Count":
                this.setState({
                    Count: filteredProducts
                })
                break;
            case "Date":
                this.setState({
                    BookingDate: filteredProducts
                })
                break;
            default:
                return
            // Thực hiện hành động nếu không có case nào khớp
        }
    };
    handleSend = async (event, item) => {
        event.preventDefault()
        let { UserName, Email, Phone, Count, BookingDate } = this.state;
        //console.log(" UserName, Email, Phone, Count", UserName, Email, Phone, Count, item)
        if (!UserName || !Email || !Phone || !Count || !BookingDate)
            alert("Thieu thong tin");

        else {
            //console.log("user laf ", UserName, Email, Phone, Count)
            try { await axiosInstance.post('/post-BookTour', { UserName, Email, Phone, Count, BookingDate, item }); }
            catch (e) {
                console.log("loi", e)
            }
            this.setState({
                message: 'Booking successful! Please check your email to confirm the booking.',
                UserName: '',
                Email: '',
                Phone: '',
                BookingDate: '',
                Count: '',
            });
        }
    }

    render() {
        let { item } = this.props
        let { UserName, Email, Phone, Count, BookingDate, message } = this.state;
        return (
            <>
                <div className="ct">
                    <div className="ct-left">
                        <div className="content-tour">
                            <div className="previewImg"
                                style={{ backgroundImage: `url(${this.EditImageUrl(item, "tour")})` }}></div>
                            <div className="tour-info">
                                <div className="descri">{item.TourName}</div>
                                <div className="star">
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                </div>

                                <div className="time"><span style={{ fontWeight: 700 }}>Thời gian:</span> {item.Duration}</div>
                                <div className="desti"><span style={{ fontWeight: 700 }}>Khởi hành:</span> {item.DepartureLocation}</div>
                                <div className="price">
                                    <span><FontAwesomeIcon icon={faMoneyBillWave} /> {item.Price} đồng/1người lớn</span>
                                </div>

                            </div>
                        </div>
                        <div className="tour-des">
                            {item.Description}
                        </div>
                    </div>
                </div>
                {message && <p>{message}</p>}
                <div className="create">Thông tin liên hệ</div>
                <form className="form-group">
                    <div className="contain">

                        <label htmlFor="UserName" className="label">Họ tên:</label>
                        <div className="div-inp">
                            <input name="UserName" type="text" className="inp" id="UserName"
                                value={UserName}
                                onChange={(event) => this.handleChange(event, "UserName")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Email" className="label">Email:</label>
                        <div className="div-inp">
                            <input name="Email" type="email" className="inp" id="Email"
                                value={Email}
                                onChange={(event) => this.handleChange(event, "Email")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Phone" className="label">Số điện thoại:</label>
                        <div className="div-inp">
                            <input name="Phone" type="text" className="inp" id="Phone"
                                value={Phone}
                                onChange={(event) => this.handleChange(event, "Phone")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Count" className="label">Số người:</label>
                        <div className="div-inp">
                            <input name="Count" type="number" className="inp" id="Count" min="1"
                                value={Count}
                                onChange={(event) => this.handleChange(event, "Count")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Date" className="label">Ngày:</label>
                        <div className="div-inp">
                            <input name="Date" type="date" className="inp" id="Date"
                                value={BookingDate}
                                onChange={(event) => this.handleChange(event, "Date")} required />
                        </div>
                    </div>
                    <button type="submit" className="btn1" onClick={(event) => this.handleSend(event, item)} >Gửi thông tin</button>
                </form>
            </>
        )
    }

}

export default Booking;