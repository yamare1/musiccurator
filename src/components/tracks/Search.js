import React, { Component } from 'react';

import axios from 'axios';

import { Consumer } from '../../context';

class Search extends Component {
	state = {
		trackTitle: ''
	};
	onChange = (e) => {
		//cool for different inputs things!
		this.setState({ [e.target.name]: e.target.value });
	};

	findTrack = (dispatch, e) => {
		const { trackTitle } = this.state;
		 e.preventDefault();
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?
				q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
			)
			.then(res => {
				console.log(res.data.message);
				dispatch({
					type: 'SEARCH_TRACKS',
					paylaod: res.data.message.body.track_list
				});
				

				this.setState({trackTitle : ''})
				// this.clearSearchInput();

			})
			.catch((err) => console.log(err));
	
		};

	// clearSearchInput = () => {
	// 	this.setState({trackTitle : ''})
	// };

	render() {
		const { trackTitle } = this.state;
		return (
			<Consumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<div className="card card-body mb-4 p-4">
							<h1 className="display-4 text-center">
								<i className="fas fa-music" /> Search for a song!
							</h1>
							<p className="lead text-center">Get the lyrics for any song!</p>
							<form onSubmit={this.findTrack.bind(this, dispatch)}>
								<div className="form-group">
									<input
										type="text"
										className="form-control form-control-lg"
										placeholder="Song Title ..."
										name="trackTitle"
										value={trackTitle}
										onChange={this.onChange}
									/>
								</div>
								<button className="btn btn-primary btn-small btn-block mb-5" type="submit">
									Get the lyrics
								</button>
							</form>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default Search;
