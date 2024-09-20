import React from "react";
import "../styles/Home.scss"
import DisplayTour from "./Component/DisplayTour.js";
import DisplayAttraction from "./Component/DisplayAttraction.js";
import DisplayCruise from "./Component/DisplayCruise.js";
import ReactPlayer from 'react-player'
import contact from "../assets/images/contact.png"
import axiosInstance from "../axios.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faStar, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Buffer } from 'buffer';

class Home extends React.Component {
    state = {
        tour: [],
        cruise: [],
        loading: true,
        error: null,
        isBook: false,
        UserName: '',
        Email: '',
        Phone: '',
        Count: '',
        UserId: '',
        BookingDate: '',
        User: [],
        message: '',
    }
    componentDidMount() {
        axiosInstance.get('http://localhost:8081/api/getTour')
            .then(response => {
                this.setState({ tour: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
        axiosInstance.get('http://localhost:8081/api/getCruise')
            .then(response => {
                this.setState({ cruise: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }
    EditImageUrl = (item, field) => {
        let imgBase64 = '';
        switch (field) {
            case "tour":
                if (item.CruiseImg) {


                    imgBase64 = new Buffer(item.CruiseImg, 'base64').toString('binary')
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
        console.log(" UserName, Email, Phone, Count", UserName, Email, Phone, Count, item)
        if (!UserName || !Email || !Phone || !Count || !BookingDate)
            alert("Thieu thong tin");

        else {
            //console.log("user laf ", UserName, Email, Phone, Count)
            try { await axiosInstance.post('/post-BookCruise', { UserName, Email, Phone, Count, BookingDate, item }); }
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

    handleBook = async (event, item) => {
        event.preventDefault();
        await this.setState({
            isBook: !this.state.isBook,
            cruise: item
        })

    }
    render() {
        let { tour, loading, error, isBook, cruise } = this.state
        let { UserName, Email, Phone, Count, BookingDate, message } = this.state;

        return (
            <>
                <div className="ads">
                    <h1>Vi vu Hạ Long </h1>
                    <p className="ads-des">Những du thuyền 5 sao được mệnh danh là “Thành phố giải trí trên biển” khi tích hợp tất cả những điều bạn mơ ước: Nghỉ ngơi tại phòng khách sạn sang trọng trên đại dương trong suốt chuyến đi, thế giới ẩm thực phong phú từ Á đến Âu phục vụ 24/24, hàng loạt những công nghệ giải trí đẳng cấp phục vụ du khách như: những vở nhạc kịch kinh điển, khiêu vũ cùng ly Champaign nồng nàn, lướt sóng và leo núi trên đại dương, thử vận may tại Casino hoàng gia hay shopping miễn thuế đầy hấp dẫn với những mặt hàng thời trang từ các thương hiệu nổi tiếng.</p>
                </div>
                {isBook === false ?
                    <div className="halong-info">
                        <div className="tophalong">
                            <div className="dtgiatot">
                                <h3>Tour du lịch</h3>
                                <DisplayTour tour={tour} loading={loading} error={error} />
                            </div>
                        </div>
                        <div className="tophalong">
                            <h3>Du thuyền giá tốt</h3>
                            <DisplayCruise tour={tour} isBook={this.handleBook} />
                        </div>
                        <div className="tophalong">
                            <h3>Top điểm du lịch</h3>
                        </div>
                        <div className="top-attractions">

                            <DisplayAttraction />
                        </div>
                    </div>
                    :
                    <>
                        <div className="ct">
                            <div className="ct-left">
                                <div className="content-tour">
                                    <div className="previewImg"
                                        style={{ backgroundImage: `url(${this.EditImageUrl(cruise, "tour")})` }}></div>
                                    <div className="tour-info">
                                        <div className="descri">{cruise.CruiseName}</div>
                                        <div className="star">
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                        </div>

                                        <div className="time"><span style={{ fontWeight: 700 }}>Thời gian:</span> {cruise.Duration}</div>
                                        <div className="desti"><span style={{ fontWeight: 700 }}>Khởi hành:</span> {cruise.DepartureLocation}</div>
                                        <div className="price">
                                            <span><FontAwesomeIcon icon={faMoneyBillWave} /> {cruise.Price} đồng/1người lớn</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="tour-des">
                                    {cruise.Description}
                                </div>
                            </div>
                        </div>
                        {message && <p>{message}</p>}
                        <div className='out' onClick={(event) => this.handleBook(event, "")}><FontAwesomeIcon icon={faRightFromBracket} /></div>
                        <div className="create">Thông tin liên hệ</div>
                        <form className="form-group">
                            <div className="contain">

                                <label htmlFor="UserName" className="label">UserName:</label>
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
                                <label htmlFor="Phone" className="label">Phone:</label>
                                <div className="div-inp">
                                    <input name="Phone" type="text" className="inp" id="Phone"
                                        value={Phone}
                                        onChange={(event) => this.handleChange(event, "Phone")} required />
                                </div>
                            </div>
                            <div className="contain">
                                <label htmlFor="Count" className="label">Count:</label>
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
                            <button type="submit" className="btn1" onClick={(event) => this.handleSend(event, cruise)} >Gửi thông tin</button>
                        </form>

                    </>
                }
                <div className="video">
                    <ReactPlayer url="https://www.youtube.com/watch?v=yNM7ZtuSnF4" controls className="video-content" />
                    <div className="video-info">
                        <h2>Vịnh Hạ Long</h2>
                        <p>Vịnh Hạ Long được Unesco nhiều lần công nhận là di sản thiên nhiên Thế Giới với hàng nghìn hòn đảo được làm nên bởi tạo hoá kỳ vĩ như một bức tranh thủy mạc sống động. Cùng với hệ thống hang động thạch nhũ đá vôi đẹp lung linh nằm sâu trong lòng vịnh càng làm cho sức hấp dẫn đặc biệt với du khách. Vịnh Hạ Long có thể được ví như biểu tượng của du lịch Việt Nam nhờ phong cảnh tuyệt đẹp tráng lệ, nơi đây đã trở thành một điểm du lịch rất hấp dẫn nhất với du khách trong nước và quốc tế.</p>
                        <p>Nhờ vẻ đẹp có một không hai của Hạ Long mà ngày nay có nhiều loại hình du lịch được triển khai và được du khách yêu thích như: các tour du lịch Hạ Long trong ngày kết hợp với các điểm vui chơi trên bờ, các tour du thuyền Hạ Long - tour ngủ đêm trên tàu cùng các hoạt động thú vị trên vịnh. Ngoài ra Vịnh Hạ Long còn là điểm kết nối để du khách dễ dàng đặt các tour kết hợp với các điểm lân cận khác như: tour Hạ Long Cát Bà, tour Hạ Long Yên Tử, tour Hạ Long Tuần Châu, tour Hạ Long Sapa... khởi hành từ Hà Nội.</p>
                    </div>
                </div>
                <div className="footer">
                    <div className="footer-img" style={{ backgroundImage: `url(${contact})` }}></div>
                    <div className="footer-content">
                        <div className="footer-content1">HỖ TRỢ 24/7</div>
                        <div className="footer-content2">Hỗ trợ đặt du thuyền Hạ Long & tư vấn dịch vụ miễn phí</div>
                        <div className="footer-content3"><span className="footer-phone">0329527188</span> - Hotline / Zalo: HN: 0969 504 955 - SG: 0982 767 501</div>
                    </div>
                </div>

            </>
        )
    }
}

export default Home;