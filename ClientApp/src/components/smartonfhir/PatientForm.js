import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';
//import  { LForms } from 'lforms';0
import jwt_decode from "jwt-decode";
import './Index.css';
import { ItemString } from './ItemString';
import { ItemDate } from './ItemDate';
import { ItemDecimal } from './ItemDecimal';
import { ItemInteger } from './ItemInteger';
import { ItemChoice } from './ItemChoice';
import { ItemBase } from './ItemBase';

export class PatientForm extends ItemBase {

    static launcData = {};
    static divId = "formContainer";
    
    static formDefData = [];
    constructor(props) {
        super(props);
        //console.log("PatientForm  "+JSON.stringify(this.props.qr))
        this.state = {
            formDef: this.props.value,
            name: "Name-Test",
            answersData: this.props.answersData,
            qAnswers: this.props.qAnswers,
            qrFormDef: this.props.qr
        }
        //console.log("PatientForm  " + JSON.stringify(this.state.qrFormDef))
    }

    static getDerivedStateFromProps(props, state) {
        return { formDef: props.value, qAnswers: props.qAnswers, qrFormDef: props.qr };
    }

    render() {
        return (
            <div>
                {this.state.name && this.state.formDef && this.state.formDef.item &&
                    <div >
                        <p>{this.state.name}</p>
                        <p>{this.state.formDef.title}</p>
                        {this.state.formDef.item.map((data, key) => {
                            {           
                                let answer = super.getAnswerForQuestion(data.linkId, this.state.qrFormDef.item);
                                
                                switch (data.type) {                                    
                                    case 'string':
                                        if (!answer)
                                            answer = { linkId: data.linkId, answer: [{ valueString: "" }], text: data.text };  
                                        this.state.qAnswers.push(answer);                   
                                        return ( <ItemString key={data.linkId}  answersData={answer}></ItemString>);
                                    case 'date':
                                        if (!answer)
                                            answer = { linkId: data.linkId, answer: [{ valueDate: "" }], text: data.text }; 
                                        this.state.qAnswers.push(answer);                   
                                        return (<ItemDate key={data.linkId} value={data} answersData={answer}></ItemDate>);
                                    case 'decimal':
                                        if (!answer)
                                            answer = { linkId: data.linkId, answer: [{ valueDecimal: "" }], text: data.text }; 
                                        this.state.qAnswers.push(answer);                   
                                        return (<ItemDecimal key={data.linkId} value={data} answersData={answer}></ItemDecimal>);
                                    case 'integer':
                                        if (!answer)
                                            answer = { linkId: data.linkId, answer: [{ valueInteger: "" }], text: data.text }; 
                                        this.state.qAnswers.push(answer);                   
                                        return ( <ItemInteger key={data.linkId} value={data} answersData={answer}></ItemInteger> );
                                    case 'choice':
                                        return (<ItemChoice key={data.linkId} value={data} answersData={this.state.answersData}></ItemChoice> );
                                    case 'group':
                                        const qAnswers = new Array();
                                        this.state.qAnswers.push({ linkId: data.linkId, item: qAnswers });        
                                        return (
                                            <PatientForm key={data.linkId} value={data} answersData={this.state.answersData} qAnswers={qAnswers} qr={this.state.qrFormDef}></PatientForm>
                                        );
                                    default:
                                        return null;
                                }
                                
                            }
                            
                        })}                        
                    </div>

                }
            </div>
        );
    }
}