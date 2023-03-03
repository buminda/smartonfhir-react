import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';
import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';

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
            count: 0,
            code_challenge:''
        }
        this.createRoom = this.createRoom.bind(this);
        this.grant = this.grant.bind(this);
        this.createRoom();        
    }

    async createRoom() {        
       await     this.loadConformance();
        await this.getAuthCode();
        localStorage.setItem("launchData", JSON.stringify(this.state));
        this.generateCodeChallenge();
    }

    async grant() {
        console.log(JSON.stringify(this.state));
        window.location.href = this.state.authenticateFullUri;
    }

    async decode() {
        let paramString = this.authenticateFullUri.split('?')[1];
        let paramsArray = paramString.split('&');

        for (let i = 0; i < paramsArray.length; i++) {
            let pair = paramsArray[i].split('=');
            console.log("Key is:", pair[0]);
            console.log("Value is:", pair[1]);
        }
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

    generateCodeChallenge() {
        let codeChallenge = Math.round(Math.random() * 10000000000).toString();
        codeChallenge += "-" + Math.round(Math.random() * 10000000000).toString();
        codeChallenge += "-" + Math.round(Math.random() * 10000000000).toString();
        codeChallenge += "-" + Math.round(Math.random() * 10000000000).toString();
        /*const encoder = new TextEncoder();
        const encodedCodeChallenge = encoder.encode(codeChallenge);
        window.crypto.subtle.digest('SHA-256', encodedCodeChallenge).then(hashBuffer => {
            encodedCodeChallenge = this.base64UrlEncode(Array.from(new Uint8Array(hashBuffer)));
            this.setState({ code_challenge: encodedCodeChallenge });
        });   */
        const hashDigest = sha256(codeChallenge);
        const hmacDigest = Base64.stringify(hashDigest);
        //encodedCodeChallenge = this.base64UrlEncode(Array.from(new Uint8Array(hashBuffer)));
        this.setState({ code_challenge: hmacDigest });
    }

    async getAuthCode() {
        var state = Math.round(Math.random() * 100000000).toString();
        var scope = [
            "openid",
            "profile",
            "patient/Patient.read",
            "patient/Flag.read",
            "user/Practitioner.read",
            "user/PractitionerRole.read",
            "user/Organization.read",
            "launch"
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

        //window.location.href = authenticateFullUri;
    }

    base64UrlEncode(str) {
        if (!str) return '';
        return str
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }

    render() {
        return (
            <div>
                <span >Lauch Data</span>      
                <br />
                <br />
                <p aria-live="polite">ISS: <strong>{this.state.iss}</strong></p>
                <p aria-live="polite">Launch: <strong>{this.state.launch}</strong></p>
                <p aria-live="polite">Auth: <strong>{this.state.authUri}</strong></p>
                <p aria-live="polite">Token: <strong>{this.state.tokenUri}</strong></p>
                <p aria-live="polite">Full Auth uri: <strong>{this.state.authenticateFullUri}</strong></p>
                <p aria-live="polite">Code challenge: <strong>{this.state.code_challenge}</strong></p>
                
                <div className="line-break">{                    
                    this.state.authenticateFullUri && this.state.authenticateFullUri.split('?')[1].split('&').map(str => {
                        let pair = str.split('=');
                        return pair[0] + ' --> ' + decodeURIComponent(pair[1]) + '\n' ;
                    })
                }</div>
                
                <button className="btn btn-primary" onClick={this.grant}>Grant</button>
                
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