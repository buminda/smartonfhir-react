import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemChoice extends Component {

    constructor(props) {
        super(props);
        this.state = { data: this.props.value, value: 'XX', answersData: this.props.answersData }
        this.setAnswerData = this.setAnswerData.bind(this);
        //this.populateDropDown = this.populateDropDown.bind(this);       
        
    }

    setAnswerData(event) {
        this.state.answersData[this.state.data.linkId] = event.target.value ;
    }

    async componentDidMount() {
        await this.populateDropDown();
    }

    async populateDropDown() {
        const response = await fetch('https://sqlonfhir-r4.azurewebsites.net/fhir/ValueSet/cc-categories/_history/1?_format=json', {
            headers:  {} 
        });
        const data = await response.json();
        console.log('+++++++++++++++++++ '+ JSON.stringify(data.compose.include[0].concept));
        this.setState({ valueSet: data, loading: false });
        
    }

    render() {
        const valueSetExists = this.state.data.answerValueSet && this.state.valueSet;
        const valueSetArrray = this.state.data.answerOption;
        console.log(this.state.data.linkId +'---------------------->' +this.state.data.repeats);
        return (
            
            <div className="row">
                <div className="col-md-3">
                    <span> {this.state.data.linkId} {this.state.data.text} </span>
                </div>
                <div className="col-md-9">                    
                    {valueSetArrray && !this.state.data.repeats &&
                        <select className="form-control">
                            {
                                this.state.data.answerOption.map((dataItem, index) => {
                                    return (<option key={dataItem.valueCoding.code} value={dataItem.valueCoding.code}>{dataItem.valueCoding.code}</option>)
                                }
                                )
                            }
                        </select>
                    }
                    {valueSetExists && !this.state.data.repeats &&
                        <select className="form-control">
                        {
                            this.state.valueSet.compose.include[0].concept.map((dataItem, index) => {
                                return (<option key={dataItem.code} value={dataItem.code}>{dataItem.code}</option>)
                            })

                        }
                        </select>
                    }
                    {this.state.data.repeats && this.state.valueSet && 
                        
                        this.state.valueSet.compose.include[0].concept.map((dataItem, index) => {
                            return (<span className="span4"  key={index}> <input className="form-check-input" type="checkbox" id={`custom-checkbox-${index}`} /></span> )
                        })
                        
                    }
                    {/*<input key={this.state.data.linkId} className="form-control" type="text"  onChange={this.setAnswerData}></input>*/}
                </div>
            </div>                        
        );
    }
}