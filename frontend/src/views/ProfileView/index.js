import React, { useState, useContext } from 'react';
import {ajax} from "rxjs/ajax";

class ProfileView extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            first: "First Name",
            last: "Last Name",
            username: "TestUser",
            picture: false,
            src: false,
            email: "TestEmail@test.com",
            bio: "Lorem ipsum dolor sit amet, vel quas tollit ei, eam vitae ocurreret an. Ne habeo labores repudiandae nam. Usu malis mediocritatem ut, purto facilisis eos et. Vis docendi assentior voluptatum in. Eum modus deseruisse no, eos prima quaeque abhorreant id.\n" +
                "\n" +
                "In quo prima utamur platonem. Choro principes signiferumque mel ad, copiosae consetetur eu eos. Vel posse ubique sanctus cu, sea no vivendo torquatos. Mundi simul adversarium no eum, suas denique oporteat eu eum, ea reque imperdiet molestiae has. Omnesque reprimique theophrastus quo eu. Falli pertinax principes ea eum."
        }
    }

    handlePictureSelected(event) {
        var picture = event.target.files[0];
        var src     = URL.createObjectURL(picture);

        this.setState({
            picture: picture,
            src: src
        });

        this.upload.bind(this)
    }

    renderPreview() {
        return (
            <div style={{width: 200, height: 200, border: "solid", color: '#aa80ff'}}>
                <img src={this.state.src} style={{ width: '100%', height:"100%", objectFit: 'fill'}}/>
            </div>
        );
    }

    upload() {
        var formData = new FormData();

        formData.append("file", this.state.picture);

        ajax({
            url: "/some/api/endpoint",
            method: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                // Code to handle a succesful upload
            }
        });

    }

    // if (isAuthenticated) {
    render() {
        return(
            <div className='card w-75' style={{ left: '12.5%'}}>
                <div className='container'>
                    <h1 style={{ color:'#431b93'}}>User Profile</h1>
                    <hr style={{ width: 200}}/>
                    <div style={{ width: '20%', float: 'left'}}>
                        <div>
                            {this.renderPreview()}
                        </div>
                        <input
                            type='file'
                            onChange={this.handlePictureSelected.bind(this)}
                            id='input-pic'
                        />
                        <br/>
                        <button onClick={this.upload.bind(this)}>Save Profile</button>
                    </div>

                    <div style={{ width: '80%', float: 'right'}}>
                        <h1 style={{color:'#9966ff'}}>{this.state.first} {this.state.last}</h1>
                        <h4 style={{color:'#aa80ff'}}>@{this.state.username}</h4>
                        <h4 style={{color:'#ccb3ff'}}>{this.state.email}</h4>
                        <h6>{this.state.bio}</h6>
                    </div>
                </div>
            </div>
        );
    }

}

export default ProfileView;
