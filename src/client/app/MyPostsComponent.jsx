import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import InlineEdit from 'react-edit-inline';


var MyPostsComponent = React.createClass( {

	getInitialState: function() {
	return {posts: []}
	},
	
	componentDidMount: function()
	{
		this.refreshData();
	},
	
	refreshData: function()
	{
		var self = this;
		$.get("http://localhost:8080/api/allMyPosts/" + this.props.index + "/token/" + this.props.token, function(data) {
		console.log(data);
		self.setState({posts: data});
		});
	},
	postInterest: function(post)
	{
		this.props.postRequested(post)
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
  

				var postList = [];
				for(var i = 0; i < this.state.posts.length; i++) {
				postList.push(
				<div key={i}>
					<div className="midbotactivity" style={{fontSize: "20"}}>
						<p>{this.state.posts[i].activity}</p>
						<p>{this.state.posts[i].place}</p>
					</div>
					<div className="midbotlocation" style={{fontSize: "20"}}>
						<p>Meet @ {this.state.posts[i].meet}</p>
						  <p>Finish @ {this.state.posts[i].finish}</p>
					</div>
					
					<div className="midbotat">
						<p><img onClick={this.deletePost.bind(this,this.state.posts[i]._id)} src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/010_x-128.png" height="28"/></p>
						<p><img onClick={this.postInterest.bind(this,this.state.posts[i]._id)} src="https://t1.ftcdn.net/jpg/00/99/98/24/160_F_99982418_Xr1piIZgFyDaOJkxvBFYkfXUcQ36O31l.jpg" height="28"/></p>
					</div>
					<div></div>
				</div>
				)
			  }
  
    return (
      <div>
		  <div className="jumbotpost">
		  
			  {postList}
			
			
			
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
