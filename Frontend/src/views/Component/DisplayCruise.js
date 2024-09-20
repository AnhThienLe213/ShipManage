import axiosInstance from "../../axios";
import React from 'react';
import { Buffer } from 'buffer';
import "../../styles/DisplayCruise.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faMoneyBillWave, faStar } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";

class DisplayCruise extends React.Component {
    state = {
        cruise: [],
        loading: true,
        error: null,
    };

    componentDidMount() {
        axiosInstance.get('http://localhost:8081/api/getCruise')
            .then(response => {
                this.setState({ cruise: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }
    EditImageUrl = (cruise) => {
        let imgBase64 = '';
        if (cruise.CruiseImg) {


            imgBase64 = new Buffer(cruise.CruiseImg, 'base64').toString('binary')
        }
        return imgBase64;
    }
    handleClickBook = (event, item) => {
        this.props.isBook(event, item)
    }
    findCruise = (item) => {

    }
    render() {

        const { cruise, loading, error } = this.state;
        let { tour } = this.props
        let displayCruise = cruise//.slice(0, 4);
        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        //console.log(displayCruise[0])
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
        };
        return (
            <>
                <div className="cruise-container">

                    {displayCruise.length <= 3 ? <div className="cruise-container1" style={{ display: "flex" }}>
                        {displayCruise.map(item => (


                            <div className="cruise-content" >

                                <div className="cruise-previewImg"
                                    style={{ backgroundImage: `url(${this.EditImageUrl(item)})` }}></div>

                                <div className="cruise-descri">{item.CruiseName}
                                    <span> <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} /></span>
                                </div>
                                <div className="cruise-time"><FontAwesomeIcon icon={faMapLocationDot} /> {item.Duration}</div>

                                <div className="cruise-price">
                                    <span><FontAwesomeIcon icon={faMoneyBillWave} /> {item.Price} đồng/1người lớn</span>
                                    <a href="#" onClick={(event) => this.handleClickBook(event, item)}>Đặt cruise</a>
                                </div>

                            </div>))}</div>
                        :

                        <Slider {...settings}>
                            {displayCruise.map(item => (


                                <div className="cruise-content">

                                    <div className="cruise-previewImg"
                                        style={{ backgroundImage: `url(${this.EditImageUrl(item)})` }}></div>

                                    <div className="cruise-descri">{item.CruiseName}
                                        <span> <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} /></span>
                                    </div>
                                    <div className="cruise-time">Thời gian: {item.Duration}</div>

                                    <div className="cruise-price">
                                        <span><FontAwesomeIcon icon={faMoneyBillWave} /> {item.Price} đồng/1người lớn</span>
                                        <a href="#" onClick={(event) => this.handleClickBook(event, item)}>Đặt tàu</a>
                                    </div>

                                </div>


                            ))}
                        </Slider>}


                </div>

            </>
        );
    }
};



export default DisplayCruise;