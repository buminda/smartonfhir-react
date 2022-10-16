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
        this.state = {
            formDef: this.props.value,
            name: "Name-Test",
            formData: {}
        }        
        this.handleChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;        
    }

    handleSubmit(event) {        
        event.preventDefault();
        /*const myFormData = new FormData(event.currentTarget);
        for (let [key, value] of myFormData.entries()) {
            console.log(key, value);
        }
        console.log(myFormData);
        const formJSON = Object.fromEntries(myFormData.entries());*/
        console.log( '--------------> '+ JSON.stringify(this.state.formData));
        alert('A form was submitted: ');
    }  

    render() {
        return (
            <div>
                <form id="questionnaire" onSubmit={this.handleSubmit}>
                    <PatientForm value={this.state.formDef} answersData={this.state.formData}></PatientForm>
                    <br />
                    <input type="submit" className="btn btn-primary" />
                </form>
            </div>
        );
    }
}