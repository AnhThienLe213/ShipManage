import React from "react";
import '../styles/Tour.scss'
import axiosInstance from "../axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faStar, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Buffer } from 'buffer';
import Booking from "./Component/Booking";
import { NavLink } from "react-router-dom";
;
class Tour extends React.Component {

    state = {
        isSearch: false,
        support: [],
        duration: '',
        transportation: '',
        departureLocation: '',
        price: '',
        copy: [],
        tour: [],
        loading: true,
        error: null,
        isBooking: false,
        tourBooking: {},
        UserName: '',
        Email: '',
        Phone: '',
        Count: '',
        UserId: '',
        User: [],

    }

    componentDidMount() {
        axiosInstance.get('http://localhost:8081/api/getTour')
            .then(response => {
                this.setState({ tour: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
        axiosInstance.get('http://localhost:8081/api/getSupport')
            .then(response => {
                this.setState({ support: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });

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
            case "Duration":
                this.setState({
                    duration: filteredProducts
                })
                break;
            case "Transportation":
                this.setState({
                    transportation: filteredProducts
                })
                break;
            // ...
            case "DepartureLocation":
                this.setState({
                    departureLocation: filteredProducts
                })
                break;
            case "Price":
                this.setState({
                    price: filteredProducts
                })
                break;
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
            default:
                return
            // Thực hiện hành động nếu không có case nào khớp
        }
    };
    handleClickSearch = async () => {

        let { price, departureLocation, duration, transportation } = this.state;
        await this.setState({
            copy: this.state.tour,
            isSearch: false
        })

        if (price || duration || transportation || departureLocation) this.setState({
            isSearch: true
        })
        if (price) {
            await this.setState({

                copy: this.state.copy.filter(item => (
                    item.Price === price
                ))
            })
        }
        if (duration) {
            await this.setState({

                copy: this.state.copy.filter(item => (
                    item.Duration === duration
                ))
            })
        }
        if (transportation) {
            await this.setState({

                copy: this.state.copy.filter(item => (
                    item.Transportation === transportation
                ))
            })
        }
        if (departureLocation) {
            await this.setState({

                copy: this.state.copy.filter(item => (
                    item.DepartureLocation === departureLocation
                ))
            })
        }
        // console.log(this.state.isSearch)
    }
    handleSendInfo = async (event, item) => {
        event.preventDefault()
        let { UserName, Email, Phone, Count } = this.state;
        console.log("user laf ", UserName, Email, Phone, Count)
        try { await axiosInstance.post('/post-User', { UserName, Email, Phone }); }
        catch (e) {
            console.log("loi", e)
        }
        if (!UserName || !Email || !Phone || !Count) {
            alert("Thieu thong tin");
            return;
        }
        // await axiosInstance.get('http://localhost:8081/api/getUser')
        //     .then(response => {
        //         this.setState({ User: response.data, loading: false });

        //     })
        //     .catch(error => {
        //         this.setState({ error, loading: false });
        //     });
        //let FindUser = await this.state.User.find(item => item.Email === Email)
        // console.log("hihi ", this.state.User)
    }
    handleClickBook = async (event, item) => {
        event.preventDefault();
        await this.setState({
            isBooking: !this.state.isBooking,
            tourBooking: item
        })
    }


    render() {
        let { isSearch, tour, copy, support, isBooking, tourBooking, UserName, Email, Phone, Count } = this.state;

        let obj = {
            id: 1,
            name: 'Item Name',
            description: 'Item Description'
        }
        return (
            <>
                <div className="container">
                    <h1>Tour Hạ Long</h1>
                    <p>Vịnh Hạ Long nổi tiếng ở trong và ngoài nước và được công nhận là Di sản Thiên nhiên Thế Giới với hàng nghìn hòn đảo được làm nên bởi tạo hoá kỳ vĩ và sống động. Hạ Long còn có những đền chùa, miếu, di tích lịch sử văn hoá (núi Bài Thơ, danh thắng Yên Tử, đền Đức Ông, chùa Long Tiên…) làm cho phong cảnh hữu tình, nên thơ bởi cảnh quan thiên nhiên lại càng thêm hấp dẫn bởi bàn tay con người.

                        Chúng tôi chuyên tổ chức các tour du lịch Hạ Long, tour du thuyền ngủ đêm trên Vịnh, các tour Hạ Long khởi hành hàng ngày xuất phát từ Hà Nội, Đà Nẵng và Sài Gòn. Các tour du lịch Hạ Long liên kết với các điểm như du lịch đảo Cát Bà, du lịch khu nghỉ mát Tuần Châu, du lịch Yên Tử, du lịch Sapa… Hãy liên hệ với chúng tôi để nhận được sự phục vụ tốt nhất.
                    </p>
                    {isBooking === false ?
                        <div className="ct">
                            <div className="ct-left">
                                {isSearch === false ?
                                    tour.map(item => (
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
                                                    <a href="#" onClick={(event) => this.handleClickBook(event, item)}>Đặt tour</a>

                                                </div>
                                            </div>

                                        </div>
                                    ))
                                    :
                                    <>
                                        {copy.length === 0 ?
                                            <div>Không có chuyến cần tìm</div>
                                            :
                                            copy.map(item => (
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
                                                            <a href="#" onClick={(event) => this.handleClickBook(event, item)}>Đặt tour</a>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))
                                        }

                                    </>
                                }

                            </div>
                            <div className="ct-right">
                                <div className="search">
                                    <select onChange={(event) => this.handleChange(event, "DepartureLocation")}>
                                        <option value="">Điểm xuất phát</option>
                                        {tour.map(item => (
                                            <option key={item.id} value={item.DepartureLocation}>{item.DepartureLocation}</option>
                                        ))}
                                    </select>
                                    <select onChange={(event) => this.handleChange(event, "Duration")}>
                                        <option value="">Thời gian</option>
                                        {tour.map(item => (
                                            <option key={item.id} value={item.Duration}>{item.Duration}</option>
                                        ))}
                                    </select>
                                    <select onChange={(event) => this.handleChange(event, "Transportation")}>
                                        <option value="">Phương tiện</option>
                                        {tour.map(item => (
                                            <option key={item.id} value={item.Transportation}>{item.Transportation}</option>
                                        ))}
                                    </select>
                                    <select onChange={(event) => this.handleChange(event, "Price")}>
                                        <option value="">Giá</option>
                                        {tour.map(item => (
                                            <option key={item.id} value={item.Price}>{item.Price}</option>
                                        ))}
                                    </select>
                                    <button onClick={() => this.handleClickSearch()}>Search</button>
                                </div>
                                <div className="support">
                                    <div className="support-text">
                                        Hỗ trợ trực tuyến
                                    </div>

                                    {support.map(item => (
                                        <>
                                            <div className="support-staff">
                                                <div className="staff-img" style={{ backgroundImage: `url(${this.EditImageUrl(item, "support")})` }}></div>
                                                <div className="staff-info">
                                                    <div className="staff-name">{item.Name}</div>
                                                    <div className="staff-email">{item.Email}</div>
                                                    <div className="staff-phone">Tel/Zalo: {item.Tel}</div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>

                        </div>
                        :
                        <>
                            <Booking item={this.state.tourBooking} />
                            <div className='out' onClick={(event) => this.handleClickBook(event, "")}><FontAwesomeIcon icon={faRightFromBracket} /></div>
                        </>
                    }
                </div>

            </>
        )
    }
}
export default Tour;