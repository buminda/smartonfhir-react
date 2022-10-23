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
        //console.log(JSON.stringify(this.props.value))
        this.state = {
            formDef: this.props.value,
            name: "Name-Test",
            answersData: this.props.answersData
        }        
    }

    static getDerivedStateFromProps(props, state) {
        return { formDef: props.value };
    }

    render() {
        //console.log(this.state.name + ' --- -' + JSON.stringify( this.state.formDef) + ' --- -' + this.state.formDef.item)
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
                                        return (
                                            <ItemString key={data.linkId} value={data} answersData={this.state.answersData}></ItemString>
                                        );
                                    case 'date':
                                        return (
                                            <ItemDate key={data.linkId} value={data} answersData={this.state.answersData}></ItemDate>
                                        );
                                    case 'decimal':
                                        return (
                                            <ItemDecimal key={data.linkId} value={data} answersData={this.state.answersData}></ItemDecimal>
                                        );
                                    case 'integer':
                                        return (
                                            <ItemInteger key={data.linkId} value={data} answersData={this.state.answersData}></ItemInteger>
                                        );
                                    case 'choice':
                                        return (
                                            <ItemChoice key={data.linkId} value={data} answersData={this.state.answersData}></ItemChoice>
                                        );
                                    case 'group':
                                        return (
                                            <PatientForm key={data.linkId} value={data} answersData={this.state.answersData}></PatientForm>
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