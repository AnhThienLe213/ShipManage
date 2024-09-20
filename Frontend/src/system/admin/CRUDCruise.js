import React from "react"
import axiosInstance from "../../axios.js";
import "../../styles/CRUDTour.scss";
import CommomUtils from "../../utils/CommomUtils.js";
import { Buffer } from 'buffer';

//import { Form, Button, Container, Row, Col } from 'react-bootstrap';
class CRUDCruise extends React.Component {
    state = {
        cruise: [],
        loading: true,
        error: null,
        id: '',
        CruiseName: '',
        CruiseImg: '',
        Duration: '',
        Price: '',
        Description: '',
        previewImg: '',
        isEdit: false,
    }
    componentDidMount() {
        axiosInstance.get('http://localhost:8081/api/getCruise')
            .then(response => {
                this.setState({ cruise: response.data, loading: false });
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
                CruiseImg: base64,
                previewImg: objUrl
            })
        }
    }
    handleSign = async (event) => {

        let { CruiseName, CruiseImg, Duration, Price, Description } = this.state;
        //console.log('email: ', this.state.email)
        try { await axiosInstance.post('/post-Cruise', { CruiseName, CruiseImg, Duration, Price, Description }); }
        catch (e) {
            console.log("loi", e)
        }

    }
    handleSave = async (event) => {
        event.preventDefault()
        let { id, CruiseName, CruiseImg, Duration, Price, Description } = this.state;

        try { await axiosInstance.post('/put-Cruise', { id, CruiseName, CruiseImg, Duration, Price, Description }); }
        catch (e) {
            console.log("loi", e)
        }
        this.setState({
            isEdit: false,
            id: '',
            CruiseName: '',
            CruiseImg: '',
            Duration: '',
            Price: '',
            Description: '',
            previewImg: '',
        })
    }
    handleClickEdit = async (item) => {
        let imgBase64 = new Buffer(item.CruiseImg, 'base64').toString('binary');

        // let base64 = await CommomUtils.getBase64(item.CruiseImg[0]);
        this.setState({
            isEdit: true,
            id: item.id,
            CruiseName: item.CruiseName,
            CruiseImg: item.CruiseImg,
            Duration: item.Duration,
            Price: item.Price,
            Description: item.Description,
            previewImg: imgBase64,
        })
        //console.log("anh ", item.CruiseImg)
    }
    handleClickDelete = async (item) => {

        try { await axiosInstance.post('/delete-Cruise', item); }
        catch (e) {
            console.log("loi", e)
        }

    }
    render() {
        let { CruiseName, CruiseImg, Duration, Price, Description } = this.state;
        let { cruise, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        //console.log("Cruise: ", Cruise)
        //console.log("isedit", this.state.isEdit)

        return (
            <>
                <div className="create">Create a new Cruise</div>
                <form className="form-group">
                    <div className="contain">

                        <label htmlFor="CruiseName" className="label">CruiseName:</label>
                        <div className="div-inp">
                            <input name="CruiseName" type="text" className="inp" id="CruiseName"
                                value={CruiseName}
                                onChange={(event) => this.handleSubmit(event, "CruiseName")} required />
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
                        <label htmlFor="CruiseImg" className="label">Image:</label>
                        <input type="file" id="CruiseImg" name="CruiseImg" accept="image/*" className="inp"

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
                                <th>CruiseName</th>
                                <th>Duration</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {cruise.map((item, index) => (

                                <tr>
                                    <td key={item.id}>{index + 1}</td>
                                    <td key={item.id}>{item.CruiseName}</td>
                                    <td key={item.id}>{item.Duration}</td>
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

export default CRUDCruise;