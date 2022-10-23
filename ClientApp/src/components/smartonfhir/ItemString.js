import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemString extends Component {

    constructor(props) {
        super(props);
        //console.log( "ItemString  -------------"+ JSON.stringify(this.props.answersData));
        this.state = { answersData: this.props.answersData }
        this.setAnswerData = this.setAnswerData.bind(this);
    }

    setAnswerData(event) {        
        this.state.answersData.answer[0].valueString = event.target.value;
        //console.log(JSON.stringify(this.state.answersData));
        this.setState({ answersData: this.state.answersData })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <span> {this.state.answersData.linkId} {this.state.answersData.text} </span>
                </div>
                <div className="col-md-9">
                    <input key={this.state.answersData.linkId} className="form-control" type="text" onChange={this.setAnswerData} value={this.state.answersData.answer[0].valueString}></input>
                </div>
            </div>                        
        );
    }
}