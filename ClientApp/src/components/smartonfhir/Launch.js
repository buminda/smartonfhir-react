import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class Launch extends Component {
    
    constructor(props) {
        super(props);
        localStorage.clear();
        const queryParams = new URLSearchParams(window.location.search);
        console.log(' window.location.href ' + window.location.href.slice(0, window.location.href.indexOf('?')));
        this.state = {
            iss: queryParams.get("iss"),
            launch: queryParams.get("launch"),
            clientId: '1234567890',
            redirectUri: window.location.href.slice(0, window.location.href.indexOf('?')).replace('launch','index'),
            authenticateFullUri: '',
            softwareVersion: '',
            softwareName: '',
            authUri: '', tokenUri: '',
            count: 0
        }
        this.createRoom = this.createRoom.bind(this);
        this.createRoom();        
    }

    async createRoom() {        
       await     this.loadConformance();
        await this.getAuthCode();
        localStorage.setItem("launchData", JSON.stringify(this.state));
    }

    async loadConformance() {
        const response = await fetch('https://launch.smarthealthit.org/v/r4/fhir/metadata', {            
        });
        const data = await response.json();
        
        var smartExtension = data.rest[0].security.extension.filter(function (e) {
            return (e.url === "http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris");
        });

        //Check R4 conformance
        if (data.extension && Array.isArray(data.extension)) {
            this.state.softwareVersion = data.extension.filter(function (e) {
                return (e.url === "http://oridashi.com.au/fhir/Profile/conformance-extensions#cis-version");
            });

            this.state.softwareName = data.extension.filter(function (e) {
                return (e.url === "http://oridashi.com.au/fhir/Profile/conformance-extensions#cis-system-identifier");
            });
        }

        smartExtension[0].extension.forEach(function (arg, index, array) {
            if (arg.url === "authorize") {
                this.state.authUri = arg.valueUri;                
            } else if (arg.url === "token") {
                this.state.tokenUri = arg.valueUri;                
            }
        }, this);        
    }

    async getAuthCode() {
        var state = Math.round(Math.random() * 100000000).toString();
        var scope = [
            "launch",
            "launch/patient",
            "openid",
            "fhirUser"
        ].join(" ");
        var authenticateFullUri = this.state.authUri + "?" +
            "response_type=code&" +
            "client_id=" + encodeURIComponent(this.state.clientId) + "&" +
            "scope=" + encodeURIComponent(scope) + "&" +
            "redirect_uri=" + encodeURIComponent(this.state.redirectUri) + "&" +
            "aud=" + encodeURIComponent(this.state.iss) + "&" +
            "launch=" + this.state.launch + "&" +
            "state=" + state;
        this.setState({ authenticateFullUri: authenticateFullUri });
        window.location.href = authenticateFullUri;
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.createRoom}>Laucn Data</button>                
                <p aria-live="polite">ISS: <strong>{this.state.iss}</strong></p>
                <p aria-live="polite">Launch: <strong>{this.state.launch}</strong></p>
                <p aria-live="polite">Auth: <strong>{this.state.authUri}</strong></p>
                <p aria-live="polite">Token: <strong>{this.state.tokenUri}</strong></p>
                <p aria-live="polite">Full Auth uri: <strong>{this.state.authenticateFullUri}</strong></p>                  
            </div>
        );
    }

    async createRoomOnServer() {

        const token = await authService.getAccessToken();
        const response = await fetch('porkerroom', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ currentLink: data.guid, loading: false });
    }
}