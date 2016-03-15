import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';


var LoginComponent = React.createClass({

    getInitialState: function () {
        return {userID: "", pass: "", loggedInStatus: ""}
    },

    loginCallBack: function (response) {
        this.setState({loggedInStatus: response.stat});
        this.props.loginCallback(response.userID, response.token, response.stat, response.indx);
    },
    handleSubmit: function (e) {
        var self
        e.preventDefault()
        self = this


        $.post("http://localhost:8080/api/login", {
            userID: this.state.userID,
            pass: this.state.pass
        }, function (response) {
            console.log(response);
            self.loginCallBack(response);
        });

    },
    userIDChange: function (e) {
        this.setState({
            userID: e.target.value
        })
    },
    passChange: function (e) {
        this.setState({
            pass: e.target.value
        })
    },


    render: function () {

        return (
            <div>
                <div className="jumbot">
                    <img src="http://icons.iconarchive.com/icons/graphicloads/food-drink/128/grapes-icon.png"/>
                </div>
                <div className="jumbot2">
                    <p>Moscato</p>
                    {/* <AwesomeComponent /> */}
                </div>
                <div className="jumbot3">

                    <form className="login-box" onSubmit={this.handleSubmit}>
                        <label>Username</label>
                        <br/>
                        <input type="text" id="username" onChange={this.userIDChange} value={this.state.userID}/>
                        <br/>
                        <label>Password</label>
                        <br/>
                        <input type="password" id="password" onChange={this.passChange} value={this.state.pass}/>
                        <br/>
                        <button type="submit">Sign In</button>
                        <br/>
                    </form>


                </div>
            </div>
        );
    }
});

export default LoginComponent
