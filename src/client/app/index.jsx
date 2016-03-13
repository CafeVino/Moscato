import React from 'react';
import {render} from 'react-dom';
import LoginComponent from './LoginComponent.jsx';
import ProfileComponent from './ProfileComponent.jsx';


var App = React.createClass( {

	getInitialState: function() {
	return {userID: "", token: "", loggedIn: ""}
	},
	
	stateChanged: function(_userID, _token, _loggedIn)
	{
		this.setState({userID: _userID, token: _token, loggedIn: _loggedIn})
	},
	

  
  render: function() {
  
	if(this.state.loggedIn == "")
	{
		return (
		  <div>
		  
		  <LoginComponent stateChanged={this.stateChanged}/>
		  </div>
		  
    );
	}
    else if(this.state.loggedIn == "1")
	{
		return (
		  <div>
		  
		  <ProfileComponent userID={this.state.userID} token={this.state.token}/>
		  </div>
		  
		);
	}
  }
});

React.render(<App/>, document.getElementById('app'));
