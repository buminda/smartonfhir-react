import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';
//import  { LForms } from 'lforms';0
import jwt_decode from "jwt-decode";
import './Index.css';
import { ItemString } from './ItemString';
import { ItemDate } from './ItemDate';
import { ItemDecimal } from './ItemDecimal';
import { ItemInteger } from './ItemInteger';


export class PatientForm extends Component {

    static launcData = {};
    static divId = "formContainer";
    

    static formDefData = [];
    constructor(props) {
        super(props);
        console.log(JSON.stringify(this.props.answersData))
        this.state = {
            formDef: this.props.value,
            name: "Name-Test",
            answersData: this.props.answersData
        }        
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


            </div>
        );
    }
}