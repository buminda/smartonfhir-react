import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';
import { ItemBase } from './ItemBase';

export class ItemString extends ItemBase {

    constructor(props) {
        super(props);
        //console.log( "ItemString  -------------"+ JSON.stringify(this.props));

        this.state = { answersData: this.props.answersData }
        this.setAnswerData = this.setAnswerData.bind(this);
        this.textInput = React.createRef();
        this.label = React.createRef();
        this.props.elmRefArray.push({ id: this.setAnswerData.linkId, elements: [this.textInput, this.label] });
        console.log('Element reference list ' + this.props.answersData.linkId +'  -- ' + JSON.stringify(this.props.elmRefArray));
    }

    setAnswerData(event) {     

        var value = event.target.value;
        if (value) {
            if (!this.state.answersData?.answer?.[0]) {
                this.state.answersData.answer[0] = {};
            }
            this.state.answersData.answer[0].valueString = event.target.value;
        }            
        else {
            this.state.answersData.answer[0] = {};
        }
        console.log(' CURRENT VALUE ' + JSON.stringify(this.textInput.current.value));
        this.setState({ answersData: this.state.answersData })

    }

    render() {
        
        return (
            <div className="row q-item-div">
                <div className="col-md-3">
                    <span ref={ this.label}> {this.state?.answersData?.linkId} {this.state?.answersData?.text} </span>
                </div>
                <div className="col-md-9">
                    <input ref={this.textInput} key={this.state?.answersData?.linkId} className="form-control" type="text" onChange={this.setAnswerData} value={this.state?.answersData?.answer?.[0]?.valueString || ''}></input>
                </div>
            </div>                        
        );
    }
}