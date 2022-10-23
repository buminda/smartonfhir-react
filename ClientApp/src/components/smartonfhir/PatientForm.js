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

export class PatientForm extends Component {

    static launcData = {};
    static divId = "formContainer";
    
    static formDefData = [];
    constructor(props) {
        super(props);
        //console.log("PatientForm  "+JSON.stringify(this.props.qAnswers))
        this.state = {
            formDef: this.props.value,
            name: "Name-Test",
            answersData: this.props.answersData,
            qAnswers: this.props.qAnswers
        }        
    }

    static getDerivedStateFromProps(props, state) {
        return { formDef: props.value, qAnswers: props.qAnswers };
    }

    render() {
        //console.log(this.state.name + ' --- -' + JSON.stringify( this.state.formDef) + ' --- -' + this.state.formDef.item)

        //console.log("PatientForm render  " + this.state.qAnswers )
        return (
            <div>
                {this.state.name && this.state.formDef && this.state.formDef.item &&
                    <div >
                        <p>{this.state.name}</p>
                        <p>{this.state.formDef.title}</p>
                        {this.state.formDef.item.map((data, key) => {
                            {                                
                                switch (data.type) {                                    
                                    case 'string':
                                        const answer = { linkId: data.linkId, answer: [{ valueString: "44444" }], text: data.text };
                                        this.state.qAnswers.push(answer);                   
                                        return (
                                            <ItemString key={data.linkId}  answersData={answer}></ItemString>
                                        );
                                    case 'date':
                                        this.state.qAnswers.push({ linkId: data.linkId, asnwer: {} });        
                                        return (
                                            <ItemDate key={data.linkId} value={data} answersData={this.state.answersData}></ItemDate>
                                        );
                                    case 'decimal':
                                        this.state.qAnswers.push({ linkId: data.linkId, asnwer: {} });        
                                        return (
                                            <ItemDecimal key={data.linkId} value={data} answersData={this.state.answersData}></ItemDecimal>
                                        );
                                    case 'integer':
                                        this.state.qAnswers.push({ linkId: data.linkId, asnwer: {} });        
                                        return (
                                            <ItemInteger key={data.linkId} value={data} answersData={this.state.answersData}></ItemInteger>
                                        );
                                    case 'choice':
                                        this.state.qAnswers.push({ linkId: data.linkId, asnwer: {} });        
                                        return (
                                            <ItemChoice key={data.linkId} value={data} answersData={this.state.answersData}></ItemChoice>
                                        );
                                    case 'group':
                                        const qAnswers = new Array();
                                        this.state.qAnswers.push({ linkId: data.linkId, item: qAnswers });        
                                        return (
                                            <PatientForm key={data.linkId} value={data} answersData={this.state.answersData} qAnswers={qAnswers}></PatientForm>
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