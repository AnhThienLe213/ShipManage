import React from "react"
import axiosInstance from "../../axios.js";
import "../../styles/CRUDTour.scss";
import CommomUtils from "../../utils/CommomUtils.js";
import { Buffer } from 'buffer';

//import { Form, Button, Container, Row, Col } from 'react-bootstrap';
class CRUDAttraction extends React.Component {
    state = {
        attract: [],
        loading: true,
        error: null,
        id: '',
        AttractionName: '',
        AttractionImg: '',
        Description: '',
        previewImg: '',
        isEdit: false,
    }
    componentDidMount() {
        axiosInstance.get('http://localhost:8081/api/getAttraction')
            .then(response => {
                this.setState({ attract: response.data, loading: false });
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
                AttractionImg: base64,
                previewImg: objUrl
            })
        }
    }
    handleSign = async (event) => {

        let { id, AttractionName, AttractionImg, Description } = this.state;
        //console.log('email: ', this.state.email)
        try { await axiosInstance.post('/post-Attraction', { AttractionName, AttractionImg, Description }); }
        catch (e) {
            console.log("loi", e)
        }

    }
    handleSave = async (event) => {
        event.preventDefault()
        let { id, AttractionName, AttractionImg, Description } = this.state

        try { await axiosInstance.post('/put-Attraction', { id, AttractionName, AttractionImg, Description }); }
        catch (e) {
            console.log("loi", e)
        }
        this.setState({
            isEdit: false,
            id: '',
            AttractionName: '',
            AttractionImg: '',
            Description: '',
            previewImg: '',
        })
    }
    handleClickEdit = async (item) => {
        let imgBase64 = new Buffer(item.AttractionImg, 'base64').toString('binary');

        // let base64 = await CommomUtils.getBase64(item.Img[0]);
        this.setState({
            isEdit: true,
            id: item.id,
            AttractionName: item.AttractionName,
            Description: item.Description,
            AttractionImg: item.AttractionImg,
            previewImg: imgBase64,

        })
        //console.log("anh ", item. AttractionImg)
    }
    handleClickDelete = async (item) => {

        try { await axiosInstance.post('/delete-Attraction', item); }
        catch (e) {
            console.log("loi", e)
        }

    }
    render() {
        let { AttractionName, AttractionImg, Description } = this.state;
        let { attract, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }


        return (
            <>
                <div className="create">Create a new Attraction</div>
                <form className="form-group">
                    <div className="contain">

                        <label htmlFor="AttractionName" className="label">AttractionName:</label>
                        <div className="div-inp">
                            <input name="AttractionName" type="text" className="inp" id="AttractionName"
                                value={AttractionName}
                                onChange={(event) => this.handleSubmit(event, "AttractionName")} required />
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
                        <label htmlFor=" AttractionImg" className="label">Image:</label>
                        <input type="file" id=" AttractionImg" name=" AttractionImg" accept="Img/*" className="inp"

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
                                <th>AttractionName</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {attract.map((item, index) => (

                                <tr>
                                    <td key={item.id}>{index + 1}</td>
                                    <td key={item.id}>{item.AttractionName}</td>
                                    <td key={item.id}>{item.Description}</td>
                                    <td key={item.id}><a href="#" onClick={() => this.handleClickEdit(item)}>Edit</a> <a href="#" onClick={() => this.handleClickDelete(item)}>Delete</a></td></tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </>
        )
    }

}

export default CRUDAttraction;