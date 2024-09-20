import React from "react"
import axiosInstance from "../../axios.js";
import "../../styles/CRUDTour.scss";
import CommomUtils from "../../utils/CommomUtils.js";
import { Buffer } from 'buffer';

class CRUDUser extends React.Component {
    state = {
        user: [],
        loading: true,
        error: null,
        id: '',
        UserName: '',
        Email: '',
        Phone: '',
        isEdit: false,
    }
    componentDidMount() {
        axiosInstance.get('http://localhost:8081/api/getUser')
            .then(response => {
                this.setState({ user: response.data, loading: false });
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
    handleSign = async (event) => {

        let { UserName, Email, Phone } = this.state;
        //console.log('email: ', this.state.email)
        try { await axiosInstance.post('/post-User', { UserName, Email, Phone }); }
        catch (e) {
            console.log("loi", e)
        }

    }
    handleSave = async (event) => {
        event.preventDefault()
        let { id, UserName, Email, Phone } = this.state;

        try { await axiosInstance.post('/put-User', { id, UserName, Email, Phone }); }
        catch (e) {
            console.log("loi", e)
        }
        this.setState({
            isEdit: false,
            id: '',
            UserName: '',
            Email: '',
            Phone: '',
            previewImg: '',
        })
    }
    handleClickEdit = async (item) => {
        // let base64 = await CommomUtils.getBase64(item.Image[0]);
        this.setState({
            isEdit: true,
            id: item.id,
            UserName: item.UserName,
            Email: item.Email,
            Phone: item.Phone,

        })

    }
    handleClickDelete = async (item) => {

        try { await axiosInstance.post('/delete-User', item); }
        catch (e) {
            console.log("loi", e)
        }

    }
    render() {
        let { id, UserName, Email, Phone } = this.state;
        let { user, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        //console.log("isedit", this.state.isEdit)

        return (
            <>
                <div className="create">Create a new User</div>
                <form className="form-group">
                    <div className="contain">

                        <label htmlFor="UserName" className="label">Name:</label>
                        <div className="div-inp">
                            <input name="UserName" type="text" className="inp" id="UserName"
                                value={UserName}
                                onChange={(event) => this.handleSubmit(event, "UserName")} required />
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
                        <label htmlFor="Phone" className="label">Phone:</label>
                        <div className="div-inp">
                            <input name="Phone" type="text" className="inp" id="Phone"
                                value={Phone}
                                onChange={(event) => this.handleSubmit(event, "Phone")} required />
                        </div>
                    </div>
                    <button type="submit" className="btn" onClick={(event) => { this.state.isEdit ? this.handleSave(event) : this.handleSign(event) }} >Save</button>
                </form>
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {user.map((item, index) => (

                                <tr>
                                    <td key={item.id}>{index + 1}</td>
                                    <td key={item.id}>{item.UserName}</td>
                                    <td key={item.id}>{item.Email}</td>
                                    <td key={item.id}>{item.Phone}</td>
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

export default CRUDUser;