import React from 'react';
import {render} from 'react-dom';
import LoginComponent from './LoginComponent.jsx';
import MyProfileComponent from './MyProfileComponent.jsx';
import NewPostComponent from './NewPostComponent.jsx';
import BrowseComponent from './BrowseComponent.jsx';
import MyPostsComponent from './MyPostsComponent.jsx';
import ProfileComponent from './ProfileComponent.jsx';
import MyMatchesComponent from './MyMatchesComponent.jsx';


var App = React.createClass( {

	getInitialState: function() {
	return {userID: "", token: "", loggedIn: "", index: "", profile: "", post: ""}
	},
	
	loginCallback: function(_userID, _token, _loggedIn, _index)
	{
		this.setState({userID: _userID, token: _token, loggedIn: _loggedIn, index: _index})
	},
	
	profileRequested: function(_profile)
	{
		this.setState({profile: _profile});
	},
	
	postRequested: function(_post)
	{
		this.setState({post: _post});
	},
	

  
  render: function() {
  
	if(this.state.loggedIn == "")
	{
		return (
		  <div>
		  
		  <LoginComponent stateChanged={this.loginCallback}/>
		  </div>
		  
    );
	}
    else if(this.state.loggedIn == "1")
	{
		if(this.state.profile == "")
		{
			if(this.state.post == "")
			{
				if(5!=5)
				{
					return (
						<div>
							<MyPostsComponent userID={this.state.userID} postRequested = {this.postRequested} token={this.state.token} index={this.state.index}/>
						</div>
					);
				}
				if(3==3)
				{
					return (
						<div>
							<BrowseComponent userID={this.state.userID} profileRequested = {this.profileRequested} token={this.state.token} index={this.state.index}/>
						</div>
					);
				}
				if(1!=1)
				{
					return (
						<div>
							<MyProfileComponent userID={this.state.userID} token={this.state.token} index={this.state.index}/>
						</div>
					);	  
				}
				if(2!=2)
				{
					return (
						<div>
							<NewPostComponent userID={this.state.userID}  token={this.state.token} index={this.state.index}/>
						</div>
					);	
				}
				
				if(4!=4)
				{
					return (
					  
					  <div>
						<MyProfileComponent userID={this.state.userID} token={this.state.token} index={this.state.index}/>
					  </div>
					);
				}
			}
			else
			{
				return (
					<div>
						<MyMatchesComponent userID={this.state.userID} post={this.state.post} token={this.state.token} index={this.state.index}/>
					</div>
				);
			}
		}
		else
		{
			return (
				  <div>
					<ProfileComponent userID={this.state.userID} token={this.state.token} index={this.state.profile}/>
				  </div>  				  
			);
		}
		
	}
  }
});

React.render(<App/>, document.getElementById('app'));
