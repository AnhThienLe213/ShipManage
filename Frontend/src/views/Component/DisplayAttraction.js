import "../../styles/DisplayAttraction.scss"
import React from "react"
import axiosInstance from "../../axios";
import { Buffer } from 'buffer';
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";


class DisplayAttraction extends React.Component {
    state = {
        attract: [],
        loading: true,
        error: null,
    };
    componentDidMount() {
        axiosInstance.get('http://localhost:8081/api/getAttraction')
            .then(response => {
                this.setState({ attract: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });

    }
    EditImageUrl = (attract) => {

        let imgBase64 = '';
        if (attract.AttractionImg) {


            imgBase64 = new Buffer(attract.AttractionImg, 'base64').toString('binary')
        }
        return imgBase64;
    }
    render() {
        let { attract } = this.state;
        //console.log("attract ", attract)
        return (
            <>
                <div className="attract-container">
                    <div className="attract-content">

                        {attract.map(item =>
                            <div className="attract-list">
                                <div className="attract-img" style={{ backgroundImage: `url(${this.EditImageUrl(item)})` }}></div>
                                <div className="attract-info">
                                    <span className="attract-name">{item.AttractionName}</span>
                                    <span className="attract-descrip">{item.Description}</span>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>
            </>
        )
    }

}

export default DisplayAttraction;