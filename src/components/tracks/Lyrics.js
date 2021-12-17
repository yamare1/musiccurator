import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import Spinner from '../layout/Spinner';

class Lyrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      track: {},
      lyrics: {}
    };
  }

  async getLyrics() {
    const CORS_URL = 'https://stark-dusk-62893.herokuapp.com/';
    const BASE_URL = 'http://api.musixmatch.com/ws/1.1/';
    const API_KEY = `&apikey=${process.env.REACT_APP_MM_KEY}`;

    // Get the lyrics to a particular track
    const lyricsRes = await axios.get(`${CORS_URL}${BASE_URL}track.lyrics.get?track_id=${this.props.match.params.id}${API_KEY}`);

    this.setState({ lyrics: lyricsRes.data.message.body.lyrics});
  }

  async getTrackName() {
    const CORS_URL = 'https://stark-dusk-62893.herokuapp.com/';
    const BASE_URL = 'http://api.musixmatch.com/ws/1.1/';
    const API_KEY = `&apikey=${process.env.REACT_APP_MM_KEY}`;

    // Get the track name
    const trackRes = await axios.get(`${CORS_URL}${BASE_URL}track.get?track_id=${this.props.match.params.id}${API_KEY}`);

    this.setState({ track: trackRes.data.message.body.track });
  }

  componentDidMount() {
    this.getLyrics()
    this.getTrackName();
  }

  render() {
    const { track, lyrics } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-back btn-md mb-4">
            Go Back
          </Link>
          <div className="card shadow-sm">
            <h5 className="card-header">
              {track.track_name} by {' '}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-3 mb-3 shadow-sm">
            <li className="list-group-item">
              <strong>Song Genre</strong>:{' '}
              {
                track.primary_genres.music_genre_list.length === 0 ?
                'A genre is not available for this track.' :
                track.primary_genres.music_genre_list[0].music_genre.music_genre_name
                }
            </li>
            <li className="list-group-item">
              <strong>Explicit Words</strong>:{' '}
              {track.explicit === 0 ? 'No': 'Yes'}
            </li>
            <li className="list-group-item">
              <strong>Release Date</strong>:{' '}
              <Moment format="MM/DD/YYYY">
                {track.first_release_date}
              </Moment>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;