import React, { Component } from 'react';
import axios from 'axios';

import { Consumer } from '../../context';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackTitle: ''
    };
  }

  onSearchChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  findTrack = async (dispatch, e) => {
    e.preventDefault();

    const CORS_URL = 'https://stark-dusk-62893.herokuapp.com/';
    const BASE_URL = 'http://api.musixmatch.com/ws/1.1/';
    const API_KEY = `&apikey=${process.env.REACT_APP_MM_KEY}`;

    const res = await axios.get(`${CORS_URL}${BASE_URL}track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc${API_KEY}`);

    dispatch({
      type: 'SEARCH_TRACKS',
      payload: res.data.message.body.track_list
    });

    this.setState({ trackTitle: '' });
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card card-body mb-4 p-4 shadow-sm">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search for a Song
              </h1>
              <p className="lead text-center">
                Get the lyrics for any song
              </p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onSearchChange}
                  />
                </div>
                <button type="submit" className="btn btn-search btn-lg btn-block mb-5">
                  Get Track Lyrics
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