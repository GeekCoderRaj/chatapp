import logo from './logo.svg';
import './App.css';
import socketIO from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Join from './Components/Joins/Join.js';
import Chat from './Components/Chat/Chat';
const ENDPOINT = 'http://localhost:4000/';
const socket = socketIO(ENDPOINT, { transports: ['websocket'] });

function App() { 
	// socket.on("connect",()=>{

	// });

	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Join} />
				<Route path="/chat" component={Chat}/>
			</Switch>
		</Router>
	);
}

export default App;
