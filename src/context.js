import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        trackList: action.payload,
        heading: 'Search Results'
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackList: [],
      heading: 'Top 10 Tracks',
      dispatch: action => this.setState(state => reducer(state, action))
    };
  }

  async componentDidMount() {
    const CORS_URL = 'https://stark-dusk-62893.herokuapp.com/';
    const BASE_URL = 'http://api.musixmatch.com/ws/1.1/';
    const API_KEY = `&apikey=${process.env.REACT_APP_MM_KEY}`;

    // Get the top 10 most popular tracks in the US
    const res = await axios.get(`${CORS_URL}${BASE_URL}chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1${API_KEY}`);

    this.setState({ trackList: res.data.message.body.track_list });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;