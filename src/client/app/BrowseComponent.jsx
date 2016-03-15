import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import InlineEdit from 'react-edit-inline';


var BrowseComponent = React.createClass( {

	getInitialState: function() {
	return {userIdx: "", postIdx: "", name: "Eduardo", age: "27", occupation: "Product Manager", company: "CaffeVino", activity: "Grab Beers", place: "SOHO", meet: "10:00 PM - 11:00 PM", finish: "Whenever", msg: "Just got off work and feeling social! Let's grab some drinks at O'Tooles! I'll get first round!"}
	},
	
	componentDidMount: function()
	{
		this.refreshData();
		
	},
	
	refreshData: function()
	{
		var self = this;
		$.get("http://localhost:8080/api/post/" + this.props.index + "/token/" + this.props.token, function(data) {
		console.log(data);
		self.setState({userIdx: data.userIdx, postIdx: data._id, name: data.name, age: data.age, occupation: data.occupation, company: data.company, activity: data.activity, place: data.place, meet: data.meet, finish: data.finish, msg: data.msg});
		});
	},
	
	showProfile: function()
	{
		this.props.profileRequested(this.state.userIdx);
	},
	
	
	postInterest: function() {
		$.post( "http://localhost:8080/api/postInterest", { token: this.props.token, userIdx: this.props.index, postIdx: this.state.postIdx }, function(response){
		console.log(response);
		});
		this.refreshData();
	
	},
  
  render: function() {
  
  var divImage = {
    backgroundImage : "url(http://cdn.bigbangfish.com/beautiful/beautiful-beaches/beautiful-beaches-2.jpg)", backgroundSize: "cover" 
  }
   
  
    return (
      <div>
		  <div className="jumbotpost" style={divImage}>
			<div className="midbotactivity">
				<p>{this.state.activity}</p>
			</div>
			
			<div className="midbotat">
				<p>@</p>
			</div>
			
			<div className="midbotlocation">
				<p>{this.state.place} </p> 
			</div>
			<div></div>
			<img onClick={this.showProfile} src="http://drhalland.com/wp-content/uploads/2014/06/Dr-Halland-Round-Profile-Pic.png" height="128"/>
		  
		  </div>
		  
		  <div className="midbot3">
			  <div className="midbotnamepost">
			  <p>{this.state.name + ", " + this.state.age}</p>
			  
			  </div>
			  <div className="midbot4time">
				  <p>Meet @ {this.state.meet}</p>
				  <p>Finish @ {this.state.finish}</p>
				  </div>
			  <div></div>
		  
		  
			  <div className="midbot4half">
			  <p>{this.state.occupation + " @ " + this.state.company}</p>
			  
			  </div><div></div>
			  <div className="midbot4half">
			  <p>{this.state.msg} </p>
			  </div>
			  <div className="midbot4half" style={{textAlign: "right"}}>
			  <img onClick={this.refreshData} src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/010_x-128.png" height="128"/>
			  <img onClick={this.postInterest} src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-128.png" height="128"/>
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
		  
	  </div>
    );
	}
});

export default BrowseComponent
