﻿import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemBase extends Component {

    constructor(props) {
        super(props);        
    }

    baseMethodCallTest() {
        //console.log(" >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> baseMethodCallTest <<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        //console.log(" >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + JSON.stringify(this.state.qrFormDef.item) + " <<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        console.log(" >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + JSON.stringify(this.getAnswerForQuestion("X-006-1", this.state.qrFormDef.item )) + " <<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    }


    getAnswerForQuestion(linkId, item) {
        //console.log(JSON.stringify(item));
        if (!linkId || !item || item.length == 0) return null;

        for (let i = 0; i < item.length; i++) {            
            console.log(i + '    '+ JSON.stringify(item[i]));
            if (item[i].item ) {
                //return item[i].answer;
                return this.getAnswerForQuestion(linkId, item[i].item);    
            } else {
                if (item[i].linkId === linkId && item[i].answer) {
                    //console.log("MATCHING -------------------------<" +JSON.stringify(item[i]));
                    return item[i];
                }
                    
            }
        } 
    }

    

    /*render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <span> {this.state.answersData.linkId} {this.state.answersData.text} </span>
                </div>
                <div className="col-md-9">
                    <input key={this.state.answersData.linkId} className="form-control" type="text" onChange={this.setAnswerData} value={this.state.answersData.answer[0].valueString}></input>
                </div>
            </div>
        );
    }*/
}