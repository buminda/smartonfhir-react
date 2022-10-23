import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemString extends Component {

    constructor(props) {
        super(props);
        this.state = { data: this.props.value, value: 'XX', answersData: this.props.answersData }
        this.setAnswerData = this.setAnswerData.bind(this);
    }

    setAnswerData(event) {
        this.state.answersData[this.state.data.linkId] = event.target.value ;
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <span> {this.state.data.linkId} {this.state.data.text} </span>
                </div>
                <div className="col-md-9">
                    <input key={this.state.data.linkId} className="form-control" type="text" onChange={this.setAnswerData} value={this.state.data.answer}></input>
                </div>
            </div>                        
        );
    }
}