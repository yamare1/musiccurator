import React, { Component } from 'react'
import { Consumer } from '../../context';
import Spinner from '../layouts/Spinner';
import Track from './Track';
class Tracks extends Component {
    render() {
        return (
            <Consumer>  
      {/* <consumer>     ===       const useConsumer = React.useContext(that_Context_You_have_built!) */}
               {/* const value = useConsumer() */}
                
                { value => {
                    const { track_list , heading } = value;

                    // track_list === undefined || track_list === 0 ?(
                    // <Spinner /> 
                    //             ) :
                    //             (<h1>tracks loaded!</h1>)

                    if(track_list === undefined || track_list.length === 0) {
                        return <Spinner />
                    } else {
                        return (
                            <React.Fragment>
                                <h3 className="text-center mb-4">{heading}</h3>
                            <div className="row">
                                {
                                    track_list.map(item => {
                                         return <Track key={item.track.track_id}  track={item.track}/>
                                    })
                                }
                            </div>
                            </React.Fragment>
                            
                            )
                        }
                    }
                }
            </Consumer>
        );
    }
}

export default Tracks;