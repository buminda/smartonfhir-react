import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemInteger extends Component {

    constructor(props) {
        super(props);
        this.state = { answersData: this.props.answersData }
        this.setAnswerData = this.setAnswerData.bind(this);
    }


    

    setAnswerData(event) {
        var value = event?.target?.value;
        if (value) {            
            if (!this.state.answersData?.answer?.[0]) {
                this.state.answersData.answer[0] = {};
            }
            this.state.answersData.answer[0].valueInteger = event.target.value;    
        }            
        else {
            this.state.answersData.answer[0] = {};
        }
        
        this.setState({ answersData: this.state.answersData });
    }


    render() {
        return (
            <div className="row q-item-div">
                <div className="col-md-3">
                    <span> {this.state?.answersData?.linkId} {this.state?.answersData?.text} </span>
                </div>
                <div className="col-md-9">
                    <input key={this.state?.answersData?.linkId} type="number" className="form-control" step="1" onChange={this.setAnswerData} value={this.state?.answersData?.answer?.[0]?.valueInteger || ''}></input>
                </div>
            </div>                        
        );
    }
}