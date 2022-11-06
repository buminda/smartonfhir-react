import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemDate extends Component {

    constructor(props) {
        super(props);
        this.state = { data: this.props.value, value: 'XX', answersData: this.props.answersData }
        this.setAnswerData = this.setAnswerData.bind(this);
    }

    setAnswerData(event) {        
        //this.state.answersData[this.state.data.linkId] = event.target.value;
        var value = event.target.value;
        if (value) {            
            if (!this.state.answersData?.answer?.[0]) {
                this.state.answersData.answer[0] = {};
            }
            this.state.answersData.answer[0].valueDate = event.target.value;    
        }            
        else {
            this.state.answersData.answer[0] = {};
        }
        this.state.answersData.answer[0].valueDate = event.target.value;
        this.setState({ answersData: this.state.answersData });
    }
 

    render() {
        return (
            <div className="row q-item-div">
                <div className="col-md-3">
                    <span>{this.state.answersData.linkId} {this.state.answersData.text} </span>
                </div>
                <div className="col-md-9">
                    <input key={this.state.answersData.linkId} className="form-control" type="date" onChange={this.setAnswerData} value = { this.state.answersData.answer[0].valueDate } ></input>
                </div>
            </div>                        
        );
    }
}