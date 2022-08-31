import React, {Component} from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import {robots} from '../robots';
import ErrorBoundry from '../Components/ErrorBoundry';
import './App.css';
import Scroll from '../Components/Scroll'
 

class App extends Component {

	constructor(){
		super()
		this.state = {
			robots: robots,
			searchfeild: ''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/')
		.then(response => response.json())
		.then(users => {this.setState({robots:users})}) ;
	}

	onSearchChange = (event) => {
		this.setState({searchfeild: event.target.value})
	}

	render(){
		const {robots, searchfeild} = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfeild.toLowerCase());
		})

		if(!robots.length) {
			return <h1> Loading </h1>
		} else {
			return (
				<div className = "tc">
					<h1 className ='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots = {filteredRobots }/>
						</ErrorBoundry>
					</Scroll>
				</div>
				);
		}

		
	}
}

export default App;