import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService';
//import  { LForms } from 'lforms';0
import jwt_decode from "jwt-decode";
import './Index.css';


import { PatientForm } from './PatientForm';


export class Form extends Component {

    static launcData = {};
    static divId = "formContainer";   
    
    static formDefData = [];
    static qAnswers = new Array();
;

    constructor(props) {
        super(props);
        const queryParams = new URLSearchParams(window.location.search);
        //console.log(' FORM PARAMS ' + JSON.stringify(queryParams) + '  ' + queryParams.get("id"));
        this.state = {
            formRef: queryParams.get("questionnaire"),
            formDef: {},
            name: "Name-Test",
            formData: {}
        }        
        this.handleChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.qAnswers["1"] = { test: "Test 1" };
        this.qAnswers["2"] = { test: "Test 2" };
        this.console.log(' qAnswers ------------- >' +JSON.stringify(this.qAnswers))
        //this.loadQuestionnaire = this.loadQuestionnaire.bind(this);
    }

    componentDidMount() {
        //await this.loadQuestionnaire();
        const formRef = this.state.formRef;
        fetch(`https://sqlonfhir-r4.azurewebsites.net/fhir/Questionnaire/${formRef}?_format=json`)
            .then(resp => resp.json())
            .then(data => this.setState({ formDef: data }));
    }

    async loadQuestionnaire()
    {
        const formRef = this.state.formRef;
        const response = await fetch(`https://sqlonfhir-r4.azurewebsites.net/fhir/Questionnaire/${formRef}?_format=json`, {
            headers: {}
        });
        const data = await response.json();
        if (data.resourceType == 'Questionnaire') {
            this.setState({ formDef: data, loading: false });
            this.state.formDef = data;
        }
        else {
            response = await fetch(`${data.questionnaire}?_format=json`, {
                headers: {}
            });
            data = await response.json();
            this.setState({ formDef: data, loading: false });
        }    
    }

    handleInputChange(event) {
        const target = event.target;        
    }

    handleSubmit(event) {        
        event.preventDefault();        
        console.log( '--------------> '+ JSON.stringify(this.state.formData));
        alert('A form was submitted: ');
    }  



    render() {
        //await this.loadQuestionnaire();
        console.log('RENDER >>>>>>>>>>>>>>>>>>>>>>>>>' + JSON.stringify(this.state.formDef));
        return (
            <div>
                <form id="questionnaire" onSubmit={this.handleSubmit}>
                    {this.state.formDef &&
                        <div>
                        <PatientForm value={this.state.formDef} answersData={this.state.formData}></PatientForm>
                        <br />
                        <input type="submit" className="btn btn-primary" />
                        </div>
                    }
                </form>
            </div>
        );
    }
}