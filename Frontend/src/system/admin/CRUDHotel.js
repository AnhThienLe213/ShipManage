import React from "react"
import axiosInstance from "../../axios.js";
import "../../styles/CRUDTour.scss";
import CommomUtils from "../../utils/CommomUtils.js";
import { Buffer } from 'buffer';

//import { Form, Button, Container, Row, Col } from 'react-bootstrap';
class CRUDHotel extends React.Component {
    state = {
        hotel: [],
        loading: true,
        error: null,
        id: '',
        HotelName: '',
        HotelImg: '',
        Location: '',
        Price: '',
        Description: '',
        previewImg: '',
        isEdit: false,
    }
    componentDidMount() {
        axiosInstance.get('http://localhost:8081/api/getHotel')
            .then(response => {
                this.setState({ hotel: response.data, loading: false });
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
                HotelImg: base64,
                previewImg: objUrl
            })
        }
    }
    handleSign = async (event) => {

        let { HotelName, HotelImg, Location, Price, Description } = this.state;
        //console.log('email: ', this.state.email)
        try { await axiosInstance.post('/post-Hotel', { HotelName, HotelImg, Location, Price, Description }); }
        catch (e) {
            console.log("loi", e)
        }

    }
    handleSave = async (event) => {
        event.preventDefault()
        let { id, HotelName, HotelImg, Location, Price, Description } = this.state;

        try { await axiosInstance.post('/put-Hotel', { id, HotelName, HotelImg, Location, Price, Description }); }
        catch (e) {
            console.log("loi", e)
        }
        this.setState({
            isEdit: false,
            id: '',
            HotelName: '',
            HotelImg: '',
            Location: '',
            Price: '',
            Description: '',
            previewImg: '',
        })
    }
    handleClickEdit = async (item) => {
        let imgBase64 = new Buffer(item.HotelImg, 'base64').toString('binary');

        // let base64 = await CommomUtils.getBase64(item.HotelImg[0]);
        this.setState({
            isEdit: true,
            id: item.id,
            HotelName: item.HotelName,
            HotelImg: item.HotelImg,
            Location: item.Location,
            Price: item.Price,
            Description: item.Description,
            previewImg: imgBase64,
        })

    }
    handleClickDelete = async (item) => {

        try { await axiosInstance.post('/delete-Hotel', item); }
        catch (e) {
            console.log("loi", e)
        }

    }
    render() {
        let { id, HotelName, HotelImg, Location, Price, Description } = this.state;
        let { hotel, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        //console.log("hotel: ", hotel)
        //console.log("isedit", this.state.isEdit)

        return (
            <>
                <div className="create">Create a new Hotel</div>
                <form className="form-group">
                    <div className="contain">

                        <label htmlFor="HotelName" className="label">HotelName:</label>
                        <div className="div-inp">
                            <input name="HotelName" type="text" className="inp" id="HotelName"
                                value={HotelName}
                                onChange={(event) => this.handleSubmit(event, "HotelName")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Location" className="label">Location:</label>
                        <div className="div-inp">
                            <input name="Location" type="text" className="inp" id="Location"
                                value={Location}
                                onChange={(event) => this.handleSubmit(event, "Location")} required />
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
                        <label htmlFor="HotelImg" className="label">Image:</label>
                        <input type="file" id="HotelImg" name="HotelImg" accept="image/*" className="inp"

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
                                <th>HotelName</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {hotel.map((item, index) => (

                                <tr>
                                    <td key={item.id}>{index + 1}</td>
                                    <td key={item.id}>{item.HotelName}</td>
                                    <td key={item.id}>{item.Location}</td>
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

export default CRUDHotel;