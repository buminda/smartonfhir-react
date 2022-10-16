import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemDecimal extends Component {

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
                    <input key={this.state.value.linkId} type="number" className="form-control" step="any"></input>
                </div>                
            </div>                        
        );
    }
}