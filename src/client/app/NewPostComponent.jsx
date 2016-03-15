import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import InlineEdit from 'react-edit-inline';


var NewPostComponent = React.createClass( {

	getInitialState: function() {
	return {token: "", name: "Eduardo", age: "27", occupation: "Product Manager", company: "CaffeVino", activity: "Grab Beers", place: "SOHO", meet: "10:00 PM - 11:00 PM", finish: "Whenever", msg: "Just got off work and feeling social! Let's grab some drinks at O'Tooles! I'll get first round!"}
	},
	
	componentDidMount: function()
	{
		var self = this;
		$.get("http://localhost:8080/api/myProfile/" + this.props.index + "/token/" + this.props.token, function(data) {
		console.log(data);
		self.setState({name: data.name, age: data.age, occupation: data.occupation, company: data.company});
		});
	},
	
	
	
	editChange: function() {
		$.post( "http://localhost:8080/api/post", { token: this.props.token, userIdx: this.props.index, activity: this.state.activity, place: this.state.place, meet: this.state.meet, finish: this.state.finish, msg: this.state.msg }, function(response){
		console.log(response);
		});
	
	},
	editActivity: function(text)
	{
		this.setState({activity: text.activity});
		
	},
	editPlace: function(text)
	{
		this.setState({place: text.place});
		
	},
	editMeet: function(text)
	{
		this.setState({meet: text.meet});
		
	},
	editFinish: function(text)
	{
		this.setState({finish: text.finish});
		
	},
	editMsg: function(text)
	{
		this.setState({msg: text.msg});
		
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
		this.props.loginCallback(_response.userID, _response.token,_response.loggedIn);

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
		  <div className="jumbotpost" style={divImage}>
			<div className="midbotactivity">
				<InlineEdit text={this.state.activity} change={this.editActivity} paramName="activity"/>
			</div>
			
			<div className="midbotat">
				<p>@</p>
			</div>
			
			<div className="midbotlocation">
				<InlineEdit text={this.state.place} change={this.editPlace} paramName="place"/> 
			</div>
			<div></div>
			<img src="http://drhalland.com/wp-content/uploads/2014/06/Dr-Halland-Round-Profile-Pic.png" height="128"/>
		  
		  </div>
		  
		  <div className="midbot3">
			  <div className="midbotnamepost">
			  <p>{this.state.name + ", " + this.state.age}</p>
			  
			  </div>
			  <div className="midbot4time">
				  <p>Meet @ <InlineEdit text={this.state.meet} change={this.editMeet} paramName="meet"/> </p>
				  <p>Finish @ <InlineEdit text={this.state.finish} change={this.editFinish} paramName="finish"/> </p>
				  </div>
			  <div></div>
		  
		  
			  <div className="midbot4half">
			  <p>{this.state.occupation + " @ " + this.state.company}</p>
			  
			  </div><div></div>
			  <div className="midbot4half">
			  <InlineEdit text={this.state.msg} change={this.editMsg} paramName="msg"/> 
			  </div>
			  <div className="midbot4half" style={{textAlign: "right"}}>
			  <img onClick={this.editChange} src="https://cdn2.iconfinder.com/data/icons/flatte-social-networks-part-2/80/11_-_Pushpin-512.png" height="128"/>
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

export default NewPostComponent
