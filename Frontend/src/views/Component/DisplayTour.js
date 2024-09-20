import axiosInstance from "../../axios";
import React from 'react';
import { Buffer } from 'buffer';
import "../../styles/DisplayTour.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faMoneyBillWave, faStar } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";

class DisplayTour extends React.Component {
    // state = {
    //     tour: [],
    //     loading: true,
    //     error: null,
    // };

    // componentDidMount() {
    //     axiosInstance.get('http://localhost:8081/api/getTour')
    //         .then(response => {
    //             this.setState({ tour: response.data, loading: false });
    //         })
    //         .catch(error => {
    //             this.setState({ error, loading: false });
    //         });
    // }
    EditImageUrl = (tour) => {
        let imgBase64 = '';
        if (tour.TourImg) {


            imgBase64 = new Buffer(tour.TourImg, 'base64').toString('binary')
        }
        return imgBase64;
    }

    render() {

        const { tour, loading, error } = this.props;
        let displayTour = tour.slice(0, 4);
        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        //console.log(displayTour[0])

        return (
            <>
                <div className="tour-container">

                    {displayTour.length <= 3 ?
                        <div className="tour-container1" style={{ display: "flex" }}>
                            {displayTour.map(item => (


                                <div className="tour-content" >

                                    <div className="tour-previewImg"
                                        style={{ backgroundImage: `url(${this.EditImageUrl(item)})` }}></div>

                                    <div className="tour-descri">{item.TourName}
                                        <span> <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} /></span>
                                    </div>
                                    <div className="tour-time"><FontAwesomeIcon icon={faMapLocationDot} /> {item.Duration}</div>
                                    <div className="tour-desti"><FontAwesomeIcon icon={faMapLocationDot} /> {item.DepartureLocation}</div>
                                    <div className="tour-price">
                                        <span><FontAwesomeIcon icon={faMoneyBillWave} /> {item.Price} đồng/1người lớn</span>

                                    </div>

                                </div>))}
                        </div>
                        :

                        <>
                            {displayTour.map(item => (


                                <div className="tour-content">

                                    <div className="tour-previewImg"
                                        style={{ backgroundImage: `url(${this.EditImageUrl(item)})` }}></div>

                                    <div className="tour-descri">{item.TourName}
                                        <span> <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} /></span>
                                    </div>
                                    <div className="tour-time"><span >Thời gian:</span> {item.Duration}</div>
                                    <div className="tour-desti"><span >Khởi hành:</span> {item.DepartureLocation}</div>
                                    <div className="tour-price">
                                        <span><FontAwesomeIcon icon={faMoneyBillWave} /> {item.Price} đồng/1người lớn</span>

                                    </div>

                                </div>


                            ))}
                        </>
                    }



                </div >
                <NavLink to="/todo" activeClassName="active" className="see-all">Xem tất cả</NavLink>
            </>
        );
    }
};



export default DisplayTour;