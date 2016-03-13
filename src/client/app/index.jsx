import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';



class App extends React.Component {

	
  render () {
  
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
	  
	  <div className="login-box">
			<label for="username">Username</label>
			<br/>
			<input type="text" id="username" />
			<br/>
			<label for="password">Password</label>
			<br/>
			<input type="password" id="password" />
			<br/>
			<button type="submit">Sign In</button>
			<br/>
		</div>
	  
	  
	  </div>
	  </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
