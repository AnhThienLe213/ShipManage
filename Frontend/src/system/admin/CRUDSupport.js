import React from "react"
import axiosInstance from "../../axios.js";
import "../../styles/CRUDTour.scss";
import CommomUtils from "../../utils/CommomUtils.js";
import { Buffer } from 'buffer';

class CRUDSupport extends React.Component {
    state = {
        support: [],
        loading: true,
        error: null,
        id: '',
        Name: '',
        Email: '',
        Tel: '',
        Image: '',
        previewImg: '',
        isEdit: false,
    }
    componentDidMount() {
        axiosInstance.get('http://localhost:8081/api/getSupport')
            .then(response => {
                this.setState({ support: response.data, loading: false });
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
                Image: base64,
                previewImg: objUrl
            })
        }
    }
    handleSign = async (event) => {

        let { Name, Email, Tel, Image } = this.state;
        //console.log('email: ', this.state.email)
        try { await axiosInstance.post('/post-Support', { Name, Email, Tel, Image }); }
        catch (e) {
            console.log("loi", e)
        }

    }
    handleSave = async (event) => {
        event.preventDefault()
        let { id, Name, Email, Tel, Image } = this.state;

        try { await axiosInstance.post('/put-Support', { id, Name, Email, Tel, Image }); }
        catch (e) {
            console.log("loi", e)
        }
        this.setState({
            isEdit: false,
            id: '',
            Name: '',
            Email: '',
            Tel: '',
            Image: '',
            previewImg: '',
        })
    }
    handleClickEdit = async (item) => {
        let imgBase64 = new Buffer(item.Image, 'base64').toString('binary');

        // let base64 = await CommomUtils.getBase64(item.Image[0]);
        this.setState({
            isEdit: true,
            id: item.id,
            Name: item.Name,
            Email: item.Email,
            Tel: item.Tel,
            Image: item.Image,
            previewImg: imgBase64,
        })

    }
    handleClickDelete = async (item) => {

        try { await axiosInstance.post('/delete-Support', item); }
        catch (e) {
            console.log("loi", e)
        }

    }
    render() {
        let { id, Name, Email, Tel, Image } = this.state;
        let { support, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        //console.log("isedit", this.state.isEdit)

        return (
            <>
                <div className="create">Create a new Support</div>
                <form className="form-group">
                    <div className="contain">

                        <label htmlFor="Name" className="label">Name:</label>
                        <div className="div-inp">
                            <input name="Name" type="text" className="inp" id="Name"
                                value={Name}
                                onChange={(event) => this.handleSubmit(event, "Name")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Email" className="label">Email:</label>
                        <div className="div-inp">
                            <input name="Email" type="text" className="inp" id="Email"
                                value={Email}
                                onChange={(event) => this.handleSubmit(event, "Email")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Tel" className="label">Tel:</label>
                        <div className="div-inp">
                            <input name="Tel" type="text" className="inp" id="Tel"
                                value={Tel}
                                onChange={(event) => this.handleSubmit(event, "Tel")} required />
                        </div>
                    </div>
                    <div className="contain">
                        <label htmlFor="Image" className="label">Image:</label>
                        <input type="file" id="Image" name="Image" accept="image/*" className="inp"

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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Tel</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {support.map((item, index) => (

                                <tr>
                                    <td key={item.id}>{index + 1}</td>
                                    <td key={item.id}>{item.Name}</td>
                                    <td key={item.id}>{item.Email}</td>
                                    <td key={item.id}>{item.Tel}</td>
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

export default CRUDSupport;