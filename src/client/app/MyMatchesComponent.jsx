import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import InlineEdit from 'react-edit-inline';


var MyPostsComponent = React.createClass( {

	getInitialState: function() {
	return {posts: [], users: []}
	},
	
	componentDidMount: function()
	{
		this.refreshData();
	},
	
	refreshData: function()
	{
		var self = this;
		$.get("http://localhost:8080/api/matches/" + this.props.index + "/token/" + this.props.token + "/post/" + this.props.post, function(data) {
		console.log(data);
		self.setState({posts: data});
		for(var i = 0; i < self.state.posts.length; i++){
		$.get("http://localhost:8080/api/profile/" + self.state.posts[i], function(udata) {
		var myvar = self.state.users;
		myvar.push(udata);
		self.setState({users: myvar});
		});}
		
			
		});
	},
	
	deletePost: function(post)
	{
		console.log(post);
		var self = this;
		$.get("http://localhost:8080/api/deleteMyPost/" + this.props.index + "/token/" + this.props.token + "/post/" + post , function(data) {
		self.refreshData();
		});
	},
  
  render: function() {
  
console.log(this.state.users);
				var userList = [];
				for(var i = 0; i < this.state.users.length; i++) {
					
						userList.push(
						<div key={i}>
							<div className="midbotactivity" style={{fontSize: "20"}}>
								<p>{this.state.users[i].name}, {this.state.users[i].age}</p>
								
							</div>
							<div className="midbotlocation" style={{fontSize: "20"}}>
								<p>{this.state.users[i].occupation} @ {this.state.users[i].company}</p>
								  
							</div>
							
							<div className="midbotat">
								<p><img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/010_x-128.png" height="28"/></p>
								<p><img src="https://t1.ftcdn.net/jpg/00/99/98/24/160_F_99982418_Xr1piIZgFyDaOJkxvBFYkfXUcQ36O31l.jpg" height="28"/></p>
							</div>
							<div></div>
						</div>
				)
			  }
  
    return (
      <div>
		  <div className="jumbotpost">
		  
			  {userList}
			
			
			
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

export default MyPostsComponent
