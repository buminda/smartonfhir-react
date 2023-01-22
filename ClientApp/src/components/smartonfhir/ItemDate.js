import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemDate extends Component {

    constructor(props) {
        super(props);
        this.state = { data: this.props.value, value: 'XX', answersData: this.props.answersData, item: this.props.item }
        this.setAnswerData = this.setAnswerData.bind(this);
        this.props.elmRefArray.push({ id: this.setAnswerData.linkId, answersData: this.props.answersData, f: this.callEnableWhen });
    }

    callEnableWhen(values) {
        if (this.state?.item?.enableWhen)
            console.log('Calling enable when child ' + this.state?.answersData?.linkId + '  ' + JSON.stringify(values));
    }

    setAnswerData(event) {        
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

        for (var i = 0; i < this.props.elmRefArray.length; i++) {
            this.props.elmRefArray[i].f(this.state.answersData);
        }
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