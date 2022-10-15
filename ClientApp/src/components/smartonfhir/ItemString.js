import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemString extends Component {

    constructor(props) {
        super(props);
        this.state = { value: this.props.value }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <span> {this.state.value.linkId} {this.state.value.text} </span>
                </div>
                <div className="col-md-9">
                    <input key={this.state.value.linkId} className="form-control" type="text"></input>
                </div>
            </div>                        
        );
    }
}