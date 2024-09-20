import React from "react"
import axiosInstance from "../../axios.js";
import "../../styles/CRUDTour.scss";
import CommomUtils from "../../utils/CommomUtils.js";
import { Buffer } from 'buffer';

//import { Form, Button, Container, Row, Col } from 'react-bootstrap';
class CRUDTour extends React.Component {
    state = {
        tour: [],
        loading: true,
        error: null,
        id: '',
        TourName: '',
        TourImg: '',
        Duration: '',
        Transportation: '',
        DepartureLocation: '',
        Price: '',
        Description: '',
        previewImg: '',
        isEdit: false,
    }
    componentDidMount() {
        axiosInstance.get('http://localhost:8081/api/getTour')
            .then(response => {
                this.setState({ tour: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }
    handleSubmit = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleChangeFile = async (event) => {
        event.preventDefault();
        let data = event.target.files;

        let file = data[0];
        let objUrl = URL.createObjectURL(file);

        if (file) {
            let base64 = await CommomUtils.getBase64(file);

            this.setState({
                TourImg: base64,
                previewImg: objUrl
            })
        }
    }
    handleSign = async (event) => {

        let { TourName, TourImg, Duration, Transportation, DepartureLocation, Price, Description } = this.state;
        //console.log('email: ', this.state.email)
        try { await axiosInstance.post('/post-Tour', { TourName, TourImg, Duration, Transportation, DepartureLocation, Price, Description }); }
        catch (e) {
            console.log("loi", e)
        }

    }
    handleSave = async (event) => {
        event.preventDefault()
        let { id, TourName, TourImg, Duration, Transportation, DepartureLocation, Price, Description } = this.state;

        try { await axiosInstance.post('/put-Tour', { id, TourName, TourImg, Duration, Transportation, DepartureLocation, Price, Description }); }
        catch (e) {
            console.log("loi", e)
        }
        this.setState({
            isEdit: false,
            id: '',
            TourName: '',
            TourImg: '',
            Duration: '',
            Transportation: '',
            DepartureLocation: '',
            Price: '',
            Description: '',
            previewImg: '',
        })
    }
    handleClickEdit = async (item) => {
        let imgBase64 = new Buffer(item.TourImg, 'base64').toString('binary');

        // let base64 = await CommomUtils.getBase64(item.TourImg[0]);
        this.setState({
            isEdit: true,
            id: item.id,
            TourName: item.TourName,
            TourImg: item.TourImg,
            Duration: item.Duration,
            Transportation: item.Transportation,
            DepartureLocation: item.DepartureLocation,
            Price: item.Price,
            Description: item.Description,
            previewImg: imgBase64,
        })

    }
    handleClickDelete = async (item) => {

        try { await axiosInstance.post('/delete-Tour', item); }
        catch (e) {
            console.log("loi", e)
        }

    }
    render() {
        let { TourName, TourImg, Duration, Transportation, DepartureLocation, Price, Description } = this.state;
        let { tour, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        //console.log("tour: ", tour)
        //console.log("isedit", this.state.isEdit)

        return (
            <>
                <div className="create">Create a new Tour</div>
                <form className="form-group">
                    <div className="contain">

                        <label htmlFor="TourName" className="label">TourName:</label>
                        <div className="div-inp">
                            <input name="TourName" type="text" className="inp" id="TourName"
                                value={TourName}
                                onChange={(event) => this.handleSubmit(event, "TourName")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Duration" className="label">Duration:</label>
                        <div className="div-inp">
                            <input name="Duration" type="text" className="inp" id="Duration"
                                value={Duration}
                                onChange={(event) => this.handleSubmit(event, "Duration")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Transportation" className="label">Transportation:</label>
                        <div className="div-inp">
                            <input name="Transportation" type="text" className="inp" id="Transportation"
                                value={Transportation}
                                onChange={(event) => this.handleSubmit(event, "Transportation")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="DepartureLocation" className="label">Start At:</label>
                        <div className="div-inp">
                            <input name="DepartureLocation" type="text" className="inp" id="DepartureLocation"
                                value={DepartureLocation}
                                onChange={(event) => this.handleSubmit(event, "DepartureLocation")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Price" className="label">Price:</label>
                        <div className="div-inp">
                            <input name="Price" type="number" className="inp" id="Price"
                                value={Price}
                                onChange={(event) => this.handleSubmit(event, "Price")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Description" className="label">Description:</label>
                        <div className="div-inp">
                            <input name="Description" type="text" className="inp" id="Description"
                                value={Description}
                                onChange={(event) => this.handleSubmit(event, "Description")} required />
                        </div>
                    </div>


                    <div className="contain">
                        <label htmlFor="TourImg" className="label">Image:</label>
                        <input type="file" id="TourImg" name="TourImg" accept="image/*" className="inp"

                            onChange={(event) => this.handleChangeFile(event)} required />
                        <div className="previewImg"
                            style={{ backgroundImage: `url(${this.state.previewImg})` }}></div>
                    </div>
                    <button type="submit" className="btn" onClick={(event) => { this.state.isEdit ? this.handleSave(event) : this.handleSign(event) }} >Save</button>
                </form>
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>TourName</th>
                                <th>Duration</th>
                                <th>Transportation</th>
                                <th>Departure Location</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {tour.map((item, index) => (

                                <tr>
                                    <td key={item.id}>{index + 1}</td>
                                    <td key={item.id}>{item.TourName}</td>
                                    <td key={item.id}>{item.Duration}</td>
                                    <td key={item.id}>{item.Transportation}</td>
                                    <td key={item.id}>{item.DepartureLocation}</td>
                                    <td key={item.id}>{item.Price}</td>
                                    <td key={item.id}>{item.Description}</td>
                                    <td key={item.id}>
                                        <a href="#" onClick={() => this.handleClickEdit(item)}>Edit</a>
                                        <a href="#" onClick={() => this.handleClickDelete(item)}>Delete</a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </>
        )
    }

}

export default CRUDTour;