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
            console.log(' FORM PARAMS ' + JSON.stringify(qr) + '  ' + queryParams.get("id"));
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
            resourceType: resourceType,
            qrFormDef: {}
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
        //console.log(' formRef  1' + formRef + '  resourceType ' + resourceType)
        let response = await fetch(`https://sqlonfhir-r4.azurewebsites.net/fhir/${resourceType}/${formRef}?_format=json`, {
            headers: {}
        });
        let data = await response.json();
        /*console.log(' ==================== ' + JSON.stringify(data));
        this.setState({ formDef: data, loading: false },() => {
            console.log(' Q ' + JSON.stringify(this.state.qrFormDef));
        });
        this.state.formDef = data;*/

        if (data.resourceType == 'Questionnaire') {
            this.setState({ formDef: data, loading: false }, () => {
                //console.log(' Q ' + JSON.stringify(this.state.qrFormDef));
            });
            //this.state.formDef = data;
        }
        else {
            //console.log(' formRef  2 ' + formRef + '  resourceType ' + data.resourceType + '  ' + data.questionnaire)
            response = await fetch(`https://sqlonfhir-r4.azurewebsites.net/fhir/${data.questionnaire}?_format=json`, {
                headers: {}
            });
            const dataQR = await response.json();
            this.setState({ formDef: dataQR, loading: false, qrFormDef: data }, () => {
                //console.log(' QR ' + JSON.stringify(this.state.qrFormDef));
                //console.log(' Q ' + JSON.stringify(this.state.formDef));
            });
        }
        
    }

    handleInputChange(event) {
        const target = event.target;        
    }

    handleSubmit(event) {        
        event.preventDefault();  
        var jsonQR = {
            resourceType: "QuestionnaireResponse",
            meta: {
                versionId: "1",
                lastUpdated: "2022-11-05T02:18:57.7392372+00:00"
            },
            text: {
                status: "generated",
                div: "<div xmlns=\"http://www.w3.org/1999/xhtml\" />"
            },
            questionnaire: "Questionnaire/20e339c65b1e4a7cb692d67162d9b0e2",
            _questionnaire: {
                extension: [
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/display",
                        "valueString": "Demo Form"
                    }
                ]
            },
            status: "completed",
            authored: "2022-10-23T01:44:03.682Z",
            item: []
        };

        jsonQR.item = this.state.qAnswers;

        console.log('--------------> ' + JSON.stringify(jsonQR));
        alert('A form was submitted: ');
    }  

    render() {
        //await this.loadQuestionnaire();
        //console.log('RENDER >>>>>>>>>>>>>>>>>>>>>>>>>' + JSON.stringify(this.state.formDef.item));
        return (
            <div>
                <form id="questionnaire" onSubmit={this.handleSubmit}>
                    {this.state.formDef &&
                        <div>
                            <PatientForm key="ddfsdf" value={this.state.formDef} qAnswers={this.state.qAnswers} qr={this.state.qrFormDef} itemArray={this.state.formDef.item}></PatientForm>
                        <br />
                        <input type="submit" className="btn btn-primary" />
                        </div>
                    }
                </form>
            </div>
        );
    }
}