import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import InlineEdit from 'react-edit-inline';


var ProfileComponent = React.createClass( {

	getInitialState: function() {
	return {token: "", editable: false, name: "Eduardo", age: "27", occupation: "Product Manager", company: "CaffeVino"}
	},
	
	editChange: function() {
		$.post( "http://localhost:8080/api/profile", { userID: this.props.userID, token: this.props.token, name: this.state.name, age: this.state.age, occupation: this.state.occupation, company: this.state.company }, function(response){
		console.log(response);
		});
	
	},
	editName: function(text)
	{
		this.setState({name: text.name}, function(){this.editChange()});
		
	},
	
	editAge: function(text)
	{
		this.setState({age: text.age}, function(){this.editChange()});
		
	},
	editOccupation: function(text)
	{
		this.setState({occupation: text.occupation}, function(){this.editChange()});
		
	},
	editCompany: function(text)
	{
		this.setState({company: text.company}, function(){this.editChange()});
		
	},
	
	handleSubmit: function (e){
	  var self

	  e.preventDefault()
	  self = this

	  console.log(this.state);

	  var body = {
		userID: this.state.userID,
		pass: this.state.pass
	  };
	  
	  var _response = {};
	  
	  $.post( "http://localhost:8080/api/login", { userID: this.state.userID, pass: this.state.pass }, function(response){
      console.log(response);
	  _response = response;
    });
		this.props.stateChanged(_response.userID, _response.token,_response.loggedIn);

	},
	userIDChange: function(e) {
    this.setState({
      userID: e.target.value
    })
  },
  passChange: function(e) {
    this.setState({
      pass: e.target.value
    })
  },
  
  render: function() {
  
  var divImage = {
    backgroundImage : "url(http://cdn.bigbangfish.com/beautiful/beautiful-beaches/beautiful-beaches-2.jpg)", backgroundSize: "cover" 
  }
   
  
    return (
      <div>
	  <div className="jumbot4" style={divImage}>
	  
		<img src="http://drhalland.com/wp-content/uploads/2014/06/Dr-Halland-Round-Profile-Pic.png" height="128"/>
      </div>
	  <div className="midbotname">
	  <InlineEdit text={this.state.name} change={this.editName} paramName="name"/>,&nbsp;
	  </div>
	  <div className="midbotage">
	  <InlineEdit text={this.state.age} change={this.editAge} paramName="age"/>
	  </div>
	  <div></div>
	  <div className="midbotoccu">
	  <InlineEdit text={this.state.occupation} change={this.editOccupation} paramName="occupation"/> &nbsp; @ &nbsp;
	  </div>
	  <div className="midbotcompany">
	  <InlineEdit text={this.state.company} change={this.editCompany} paramName="company"/> 
	  </div>
	  <div className="midbot3">
		  <div className="midbot4">
		  <p>Interests/Hobbies</p>
		  <ul>
			<li>Eating out</li>
			<li>Hiking</li>
			<li>Meeting new people</li>
		  </ul>
		  </div>
		  <div className="midbot4">
		  <p>Goals/Aspirations</p>
		  <ul>
			<li>Get my pilots license</li>
			<li>Create a startup</li>
			<li>Travel</li>
		  </ul>
		  </div>
		  <div className="midbot4">
		  <p>About Me</p>
		  <p style={{fontSize: "14"}}>Hello! My name is Eduardo and I love meeting new people, trying new things, and just hanging out! I like craft beers and wine and just want to enjoy life!</p>
		  </div>
	  </div>
	  <div className="midbot2">
	  <ul className="navi">
			<li className="navi"><img src="https://image.freepik.com/free-icon/profile_318-40185.png" height="56" /></li>
			<li className="navi"><img src="https://image.freepik.com/free-icon/user-profiles-in-connection_318-47860.jpg" height="56" /></li>
			<li className="navi"><img src="https://image.freepik.com/free-icon/upload-cloud_318-84457.jpg" height="56" /></li>
			<li className="navi"><img src="https://image.freepik.com/free-icon/multiple-user-profile-images_318-36861.jpg" height="56" /></li>
		  </ul>
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

export default ProfileComponent
