import React from "react";

class ChildComponent extends React.Component {

    state = {
        firstname: "",
        lastname: ""
    }
    handleOnChangeFirstName = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }
    handleOnChangeLastName = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }
    clickSubmit = (event) => {
        event.preventDefault()
        if (!this.state.firstname || !this.state.lastname) {
            alert('Missing')
            return
        }

        let name = {
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }
        this.props.addName(name)
        this.setState({
            firstname: '',
            lastname: ''
        })


    }
    render() {
        return (
            <>
                <div >
                    <form>
                        <label htmlFor="fname">First name:</label><br />
                        <input type="text" value={this.state.firstname} onChange={(event) => this.handleOnChangeFirstName(event)} /><br />
                        <label htmlFor="fname">Last name:</label><br />
                        <input type="text" value={this.state.lastname} onChange={(event) => this.handleOnChangeLastName(event)} /><br />
                        <br /><br />
                        <input type="submit" value="Submit" onClick={(event) => this.clickSubmit(event)} />
                    </form>
                </div >
            </>
        )
    }
}

export default ChildComponent;
