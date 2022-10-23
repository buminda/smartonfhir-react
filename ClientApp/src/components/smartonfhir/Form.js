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
    

    constructor(props) {
        super(props);
        const queryParams = new URLSearchParams(window.location.search);
        const q = queryParams.get("questionnaire");
        const qr = queryParams.get("questionnaireresponse");
        let resourceType = "";
        let formRef = "";
        if (q) {
            resourceType = "Questionnaire";
            formRef = q;
        }
        if (qr) {
            resourceType = "QuestionnaireResponse";
            formRef = qr;
        }
        const qAnswers = new Array();
        //console.log(' FORM PARAMS ' + JSON.stringify(queryParams) + '  ' + queryParams.get("id"));
        this.state = {
            formRef: formRef,
            formDef: {},
            name: "Name-Test",
            formData: {},
            qAnswers: qAnswers,
            resourceType : resourceType
        }        
        //console.log(' STATE formRef  ' + formRef + '  resourceType ' + resourceType)
        this.handleChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //console.log(' qAnswers ------------- >' +JSON.stringify(qAnswers))
        //this.loadQuestionnaire = this.loadQuestionnaire.bind(this);
    }

    async componentDidMount() {
        //await this.loadQuestionnaire();
        const formRef = this.state.formRef;
        /*fetch(`https://sqlonfhir-r4.azurewebsites.net/fhir/Questionnaire/${formRef}?_format=json`)
            .then(resp => resp.json())
            .then(data => this.setState({ formDef: data }));*/
        await this.loadQuestionnaire();
    }

    async loadQuestionnaire()
    {
        const formRef = this.state.formRef;
        const resourceType = this.state.resourceType;
        //console.log(' formRef  ' + formRef + '  resourceType ' + resourceType)
        let response = await fetch(`https://sqlonfhir-r4.azurewebsites.net/fhir/${resourceType}/${formRef}?_format=json`, {
            headers: {}
        });
        let data = await response.json();
        this.setState({ formDef: data, loading: false });
        this.state.formDef = data;

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
        console.log('--------------> ' + JSON.stringify(this.state.qAnswers));
        alert('A form was submitted: ');
    }  



    render() {
        //await this.loadQuestionnaire();
        //console.log('RENDER >>>>>>>>>>>>>>>>>>>>>>>>>' + JSON.stringify(this.state.qAnswers));
        return (
            <div>
                <form id="questionnaire" onSubmit={this.handleSubmit}>
                    {this.state.formDef &&
                        <div>
                            <PatientForm value={this.state.formDef} qAnswers={this.state.qAnswers}></PatientForm>
                        <br />
                        <input type="submit" className="btn btn-primary" />
                        </div>
                    }
                </form>
            </div>
        );
    }
}