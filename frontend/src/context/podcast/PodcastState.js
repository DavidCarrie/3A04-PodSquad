import React, { useReducer } from 'react';
import axios from 'axios';

import podcastReducer from './podcastReducer';
import PodcastContext from './podcastContext';

const PodcastState = props => {
    const initialState = {
        token: null,
        item: {
            album: {
                images: [{ url: "" }]
            },
            name: "",
            artists: [{ name: "" }],
            duration_ms:0,
        },
        is_playing: "Paused",
        progress_ms: 0
    };

    const [state, dispatch] = useReducer(podcastReducer, initialState);

    const play = ({
        spotify_uri,
        playerInstance: {
            _options: {
            getOAuthToken,
            id
            }
        }
    }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          });
        });
    };

    return (
        <PodcastContext.Provider
         value={{
             play
         }}
        >
            {props.children}
        </PodcastContext.Provider>
    );
}

export default PodcastState;