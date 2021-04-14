import React from "react";

class RecommendationsView extends React.Component{

    constructor() {
        super();
        this.state = {
            names: ["Crime Junkie", "The Daily", "Canadian True Crime", "Stuff You Should Know", "Deep Sleep Sounds"]
        };

        //this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    }

    render() {
        return (
            <div className='card w-50' style={{ left: '25%'}}>
                <header className="App-header">

                    <div style={{textAlign: 'center'}}>
                        <div>
                            <h1 style={{ color:'#431b93'}}>Today's Recommendations!</h1>
                            <ol className="all-center" id="myOl">
                                <li>{this.state.names[0]}</li>
                                <li>{this.state.names[1]}</li>
                                <li>{this.state.names[2]}</li>
                                <li>{this.state.names[3]}</li>
                                <li>{this.state.names[4]}</li>
                            </ol>

                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default RecommendationsView;
