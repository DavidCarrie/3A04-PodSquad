import React from "react";
import ProfileView from "../ProfileView";
import {ajax} from "rxjs/ajax";

export const authEndpoint = 'https://accounts.spotify.com/authorize?';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "17d5bf25cae142aaa9512ecff18c1bca";
const redirectUri = "http://localhost:3000/rankings";
const scopes = [
    "user-read-currently-playing",
    "user-top-read"
];
// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
        if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = "";

class RankingsView extends React.Component{

    constructor() {
        super();
        this.state = {
            token: null,
            total: 0,
            names: []
        };

        //this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    }

    componentDidMount() {
        // Set token
        let _token = hash.access_token;
        if (_token) {
            // Set token
            this.setState({
                token: _token
            });
            fetch("https://api.spotify.com/v1/me/top/tracks", {
                headers: {'Authorization': 'Bearer ' + _token}
            }).then(response => response.json())
                .then(data => {
                    let tmpArray = []
                    for (var i = 0; i < data.items.length; i++) {
                        tmpArray.push(data.items[i].name)
                    }
                    this.setState({
                        total: data.items.length,
                        names: tmpArray
                })})
        }
    }

    showStats() {

        var i = this.state.names.length
        this.state.names.forEach(function(item) {
            if (document.getElementById("myOl").childElementCount < i) {
                var li = document.createElement("li");
                var text = document.createTextNode(item);
                li.appendChild(text);
                document.getElementById("myOl").appendChild(li);
            }
        })
    }

    render() {
        return (
            <div className='card w-50' style={{ left: '25%'}}>
                <header className="App-header">

                    <div style={{textAlign: 'center'}}>
                        {!this.state.token && (

                            <div>
                                <h1>Rankings</h1>
                                <a
                                    className="btn btn--loginApp-link"
                                    href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                                >
                                    Login to Spotify
                                </a>
                            </div>
                        )}
                        {this.state.token && (
                            // Spotify stuff

                            <div>
                                <h1>Your Top {this.state.total.toString()} Tracks!</h1>
                                <ol className="all-center" id="myOl"></ol>

                                {this.showStats()}
                            </div>
                        )}
                    </div>
                </header>
            </div>
        )
    }
}

export default RankingsView;
