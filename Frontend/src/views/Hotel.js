import React, { useEffect } from 'react';
import axiosInstance from "../axios";
import { Buffer } from 'buffer';
import '../styles/Hotel.scss'
import chonchungtoi from "../assets/images/chonchungtoi.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

class Hotel extends React.Component {

    state = {

        hotel: [],
        showHotel: {},
        loading: true,
        error: null,
        isShow: false,
    }

    componentDidMount() {
        axiosInstance.get('http://localhost:8081/api/getHotel')
            .then(response => {
                this.setState({ hotel: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
        if (window.FB) {
            window.FB.XFBML.parse();
        }

    }
    EditImageUrl = (item) => {
        let imgBase64 = '';

        if (item.HotelImg) {


            imgBase64 = new Buffer(item.HotelImg, 'base64').toString('binary')
        }

        return imgBase64;
    }
    handleDetailHotel = (event, item) => {
        this.setState({
            isShow: !this.state.isShow
        })
        if (item) {
            this.setState({
                showHotel: item
            })
        }
    }
    render() {
        let name = 'AnhThienLe';
        let { hotel, showHotel, isShow } = this.state
        //console.log("Call render")

        return (

            <><div className='hotel-container'>
                <div className='hotel-content'>
                    {isShow ?
                        <div className="show-detail">
                            <div className='show-list'>
                                <div className='show-img' style={{ backgroundImage: `url(${this.EditImageUrl(showHotel)})` }}></div>

                                <div className='show-info'>
                                    <div className='show-name'>{showHotel.HotelName}</div>
                                    <div className='show-text'>
                                        <div className="show-addr"><span style={{ fontWeight: 600 }}>Địa chỉ: </span>{showHotel.Location}</div>
                                        <div className="show-price"><span style={{ fontWeight: 600 }}>Giá: </span>{showHotel.Price === '0' ? <>Liên hệ</> : showHotel.Price}</div>
                                        <div className="show-descrip"><span style={{ fontWeight: 600 }}>Mô tả: </span>{showHotel.Description}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='out' onClick={(event) => this.handleDetailHotel(event, "")}><FontAwesomeIcon icon={faRightFromBracket} /></div>
                        </div>
                        :
                        <div className='hotel-left'>
                            <h2 className='hotel-cap'>Khách sạn Hạ Long</h2>
                            <div className='hotel-ad'>Vịnh Hạ Long nổi tiếng ở trong và ngoài nước và được công nhận là Di sản Thiên nhiên Thế giới với hàng nghìn hòn đảo được làm nên bởi tạo hoá kỳ vĩ và sống động. Với một lượng khách du lịch rất đông hàng năm đến với Vịnh Hạ Long, cho nên nơi đây là một điểm thu hút lượng lớn khách sạn và các khu nghỉ dưỡng đẳng cấp.</div>
                            <div className='hotel-ad'>Chúng tôi cung cấp một lượng lớn khách sạn giá tốt tại Hạ Long, từ tiêu chuẩn khách sạn 3 sao đến những khách sạn 5 sao sang trọng, ngoài ra chúng tôi cũng cung cấp những khách sạn 2 sao tiêu chuẩn để phục vụ cho những khách hàng mong muốn mức giá phải chăng nhất. Quý khách có thể lựa chọn danh sách khách sạn tại Hạ Long bên dưới hoặc liên lạc với chúng tôi theo số hotline: 0904 871 262 hoặc gửi email vào info@dulichhalong.net để được sự phục vụ nhanh chóng và chu đáo. Chúng tôi cam kết giá phòng rẻ hơn so với Quý khách đặt trực tiếp!</div>
                            {hotel.map(item => (
                                <div className='hotel-list'>
                                    <div className='hotel-name' onClick={(event) => this.handleDetailHotel(event, item)}>{item.HotelName}</div>
                                    <div className='hotel-info'>
                                        <div className='hotel-img' style={{ backgroundImage: `url(${this.EditImageUrl(item)})` }} onClick={(event) => this.handleDetailHotel(event, item)} ></div>
                                        <div className='hotel-text'>
                                            <div className="hotel-addr"><span style={{ fontWeight: 600 }}>Địa chỉ: </span>{item.Location}</div>
                                            <div className="hotel-price"><span style={{ fontWeight: 600 }}>Giá: </span>{item.Price === '0' ? <>Liên hệ</> : item.Price}</div>
                                            <div className="hotel-descrip"><span style={{ fontWeight: 600 }}>Mô tả: </span>{item.Description}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div >}
                    <div className='hotel-right'>
                        <div className='fanpage-container'>
                            <div className='fanpage-fb'>Fanpage Facebook</div>
                            <iframe
                                src="https://www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FIrisHalongcruise&width=268&height=258&colorscheme=light&show_faces=true&header=false&stream=false&show_border=false"
                                scrolling="no"
                                frameBorder="0"
                                style={{ border: 'none', overflow: 'hidden', width: '268px', height: '132px' }}
                                allowTransparency="true"
                                className='fanpage-plugin'>
                            </iframe>
                        </div>
                        <div class="select-us">
                            <div style={{ backgroundImage: `url(${chonchungtoi})` }} className='select-us-img'></div>
                            <div class="select-us-content">
                                <div class="select-us-text">
                                    <ul className="select-us-list">
                                        <li className="tick">Chúng tôi là Công ty lữ hành chuyên tour du lịch Hạ Long được cấp đầy đủ Giấy phép Kinh doanh và Giấy phép kinh doanh Lữ hành quốc tế.</li>
                                        <li className="tick">Đội ngũ nhân viên chuyên nghiệp, kinh nghiệm về Hạ Long nhiệt tình sẽ tư vấn và hỗ trợ bạn để có một trải nghiệm thú vị qua những chuyến đi.</li>
                                        <li className="tick">Mối quan hệ lâu năm với các nhà tàu, khách sạn Hạ Long để có được giá tốt nhất.</li>
                                        <li className="tick">Cam kết đưa ra các sản phẩm và dịch vụ tốt nhất xứng đáng với chi phí bạn bỏ ra.</li>
                                        <li className="tick">Hình thức thanh toán thuận tiện, dễ dàng, nhanh chóng và đảm bảo.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
            </>
        )
    }
}

export default Hotel;