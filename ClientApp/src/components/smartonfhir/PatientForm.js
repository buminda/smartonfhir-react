import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';
//import  { LForms } from 'lforms';
import jwt_decode from "jwt-decode";
import './Index.css';


export class PatientForm extends Component {

    static launcData = {};
    static divId = "formContainer";
    static formDef = {
    "status": "draft",
    "title": "Demo Form",
    "resourceType": "Questionnaire",
    "item": [
            {
                "type": "string",
                "linkId": "X-002",
                "text": "Eye color"
            }
        ]
    }
    
    constructor(props) {
        super(props);
        /*this.launcData = JSON.parse(localStorage.getItem("launchData"));
        const queryParams = new URLSearchParams(window.location.search);
        this.state = {
            state: queryParams.get("state"), // session key
            code: queryParams.get("code"), // authorization code
            id_token: '',
            patientdId: '',
            patient: {},
            practitioner: {}
        }        
        this.getAuthCode();      */

        //LForms.Util.addFormToPage(this.formDef, 'formContainer');
    }

    async loadPatient(patientId) {
        const response = await fetch(this.launcData.iss + '/Patient/' + patientId, {
            headers: !this.state.access_token ? {} : { 'Authorization': `Bearer ${this.state.access_token}` }
        });
        const data = await response.json();

        this.setState({ patient: data });        
    }

    async loadPractitioner(practitionerId) {
        console.log('practitionerId ' + practitionerId)
        const response = await fetch(this.launcData.iss+'/' + practitionerId, {
            headers: !this.state.access_token ? {} : { 'Authorization': `Bearer ${this.state.access_token}` }
        });
        const data = await response.json();

        this.setState({ practitioner: data });  
    }

    setStateSynchronous(stateUpdate) {
        return new Promise(resolve => {
        this.setState(stateUpdate, () => resolve());
    });
}

    async getAuthCode() {
        var data = {
            code: this.state.code,
            grant_type: 'authorization_code',
            redirect_uri: this.launcData.redirectUri,
        };

        var formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        await fetch(this.launcData.tokenUri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(response => response.json())
            .then(data => {
                var decodedJWT = jwt_decode(data.id_token);
                this.setState({ access_token: data.access_token, id_token: data.id_token, practitionerId: decodedJWT.profile, patientdId: data.patient } );                
                this.loadPatient(data.patient);
                this.loadPractitioner(decodedJWT.profile);
            });

    }

    render() {
        return (
            <div>      
                <table>
                    <tbody>
                        <tr><td >State</td><td>{this.state.state}</td></tr>
                        <tr><td>Code</td><td>{this.state.code}</td></tr>
                        <tr><td>Access Token</td><td>{this.state.access_token}</td></tr>
                        <tr><td>Id Token</td><td>{this.state.id_token}</td></tr>
                        <tr><td>Practitioner</td><td>{this.state.practitionerId}</td></tr>
                        <tr><td>Patient Id</td><td>{this.state.patientdId}</td></tr>
                        <tr><td>Patient</td><td><pre>{JSON.stringify(this.state.patient, null, 2)}</pre> </td></tr>
                        <tr><td>Practitioner</td><td> <pre>{JSON.stringify(this.state.practitioner, null, 2)}</pre> </td></tr>
                        <tr><td><div id={this.divId} ></div></td></tr>
                    </tbody>
                </table>                
            </div>
        );
    }
}