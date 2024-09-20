import React from "react";

class ShowHideComp extends React.Component {

    state = {
        showName: false
    }
    handleShowHide = () => {
        this.setState({
            showName: !this.state.showName
        })
    }
    handleDeleteName = (name) => {
        console.log('delete ', name)
        this.props.DeleteName(name)
    }
    render() {
        let { FullName } = this.props
        let { showName } = this.state
        return (
            <>
                {!showName ?
                    <div><button onClick={() => this.handleShowHide()}>Show</button></div>
                    : <>
                        <div>List Name:</div>
                        <div>{FullName.map((item, index) => {
                            return (
                                <div key={index}>
                                    {item.firstname} {item.lastname} <></> <span onClick={() => this.handleDeleteName(item)}>x</span>
                                </div>
                            )
                        }
                        )}</div>
                        <div><button onClick={() => this.handleShowHide()}>Hide</button></div>
                    </>}


            </>


        )
    }


}
export default ShowHideComp;