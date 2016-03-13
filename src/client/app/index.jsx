import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';



var App = React.createClass( {

	getInitialState: function() {
	return {userID: "", pass: ""}
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
	  
	  $.post( "http://localhost:8080/api/login", { userID: this.state.userID, pass: this.state.pass } );


	},
	userIDChange: function(e) {
	console.log(e.target.value);
    this.setState({
      userID: e.target.value
    })
  },
  passChange: function(e) {
	console.log(e.target.value);
    this.setState({
      pass: e.target.value
    })
  },
	
  
  
  render: function() {
  
    return (
      <div>
	  <div className="jumbot">
		<img src="http://icons.iconarchive.com/icons/graphicloads/food-drink/128/grapes-icon.png" />
      </div>
	  <div className="jumbot2">
	  <p>Moscato</p>
      {/* <AwesomeComponent /> */}
	  </div>
	  <div className="jumbot3">
	  
	  <form className="login-box" onSubmit={this.handleSubmit}>
			<label for="username">Username</label>
			<br/>
			<input type="text" id="username" onChange={this.userIDChange} value={this.state.userID}/>
			<br/>
			<label for="password">Password</label>
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

React.render(<App/>, document.getElementById('app'));
