import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemDate extends Component {

    constructor(props) {
        super(props);
        this.state = { data: this.props.value, value: 'XX', answersData: this.props.answersData }
        this.setAnswerData = this.setAnswerData.bind(this);
    }

    setAnswerData(event) {        
        this.state.answersData[this.state.data.linkId] = event.target.value;
    }
        

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <span>{this.state.value.linkId} {this.state.value.text} </span>
                </div>
                <div className="col-md-9">
                    <input key={this.state.value.linkId} className="form-control" type="date" onChange={this.setAnswerData}></input>
                </div>
            </div>                        
        );
    }
}