import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemChoice extends Component {

    constructor(props) {
        super(props);
        this.state = { data: this.props.value, value: 'XX', answersData: this.props.answersData }
        this.setAnswerData = this.setAnswerData.bind(this);
        //this.populateDropDown();
    }

    setAnswerData(event) {
        this.state.answersData[this.state.data.linkId] = event.target.value ;
    }

    async populateDropDown() {
        const response = await fetch('http://hl7.org/fhir/ValueSet/yesnodontknow', {
            headers:  {} 
        });
        const data = await response.json();
        console.log(JSON.stringify(data));
        this.setState({ valueSet: data, loading: false });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <span> {this.state.data.linkId} {this.state.data.text} </span>
                </div>
                <div className="col-md-9">
                    <select className="form-control">
                        {
                            this.state.data.answerOption.map((dataItem, index) =>
                            {
                                return (<option key={dataItem.valueCoding.code} value={dataItem.valueCoding.code}>{dataItem.valueCoding.code}</option>)
                            }                            
                        )
                    }
                    </select>
                    {/*<input key={this.state.data.linkId} className="form-control" type="text"  onChange={this.setAnswerData}></input>*/}
                </div>
            </div>                        
        );
    }
}