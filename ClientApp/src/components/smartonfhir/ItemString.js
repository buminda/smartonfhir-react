﻿import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';
import { ItemBase } from './ItemBase';

export class ItemString extends ItemBase {

    constructor(props) {
        super(props);
        //console.log( "ItemString  -------------"+ JSON.stringify(this.props));
        this.state = { data: this.props.value, value: 'XX', answersData: this.props.answersData, visible: true, item: this.props.item }
        //this.state = { answersData: this.props.answersData, visible: true, item: this.props.item }
        this.setAnswerData = this.setAnswerData.bind(this);
        this.textInput = React.createRef();
        this.label = React.createRef();
        this.callEnableWhen = this.callEnableWhen.bind(this);
        this.props.elmRefArray.push({ id: this.setAnswerData.linkId, answersData: this.props.answersData, f: this.callEnableWhen  });
        //console.log('Element reference list ' + this.props.answersData.linkId +'  -- ' + JSON.stringify(this.props.elmRefArray));
    }

    callEnableWhen(values) {        
        if (this.state?.item?.enableWhen) {
            //console.log('Calling enable when - Item string ' + this.state?.data?.linkId + '  ' + JSON.stringify(values));
            //console.log('All answers ' + JSON.stringify(this.props.elmRefArray));
            var enalbleResult = this.evaluateEnableWhen(this.state?.item, this.props.elmRefArray)
            this.setState({ visible: enalbleResult });
        }
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
        this.setState({ answersData: this.state.answersData });
        for (var i = 0; i < this.props.elmRefArray.length; i++) {
            this.props.elmRefArray[i].f(this.state.answersData);
        }
    }

    render() {
        
        return (
            <div>
            {
                this.state.visible &&
                    <div className="row q-item-div">
                        <div className="col-md-3">
                            <span ref={this.label}> {this.state?.answersData?.linkId} {this.state?.answersData?.text} </span>
                        </div>
                        <div className="col-md-9">
                            <input ref={this.textInput} key={this.state?.answersData?.linkId} className="form-control" type="text" onChange={this.setAnswerData} value={this.state?.answersData?.answer?.[0]?.valueString || ''}></input>
                        </div>
                    </div>
                }
            </div>
        );
    }
}