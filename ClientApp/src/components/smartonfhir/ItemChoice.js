import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';
import { ItemBase } from './ItemBase';

export class ItemChoice extends ItemBase {
    //https://localhost:44438/form?questionnaireresponse=cff03f302457466aa0642e5c77b49533

    constructor(props) {
        super(props);
        this.state = { data: this.props.value, value: 'XX', answersData: this.props.answersData }
        //console.log(this.props.value.linkId + '  ************************ ' + JSON.stringify(this.props.value));
        this.setAnswerData = this.setAnswerData.bind(this);
        //this.populateDropDown = this.populateDropDown.bind(this);       
        
    }

    setAnswerData(event) {
        this.state.answersData[this.state.data.linkId] = event.target.value ;
    }

    handleChange() {
        console.log('handleChange called');
    }

    async componentDidMount() {
        await this.populateDropDown();
    }

    async populateDropDown() {
        const response = await fetch('https://sqlonfhir-r4.azurewebsites.net/fhir/ValueSet/cc-categories/_history/1?_format=json', {
            headers:  {} 
        });
        const data = await response.json();
        //console.log('+++++++++++++++++++ '+ JSON.stringify(data.compose.include[0].concept));
        this.setState({ valueSet: data, loading: false });
        
    }

    render() {
        const valueSetExists = this.state.data.answerValueSet && this.state.valueSet;
        const valueSetArrray = this.state.data.answerOption;
        const dropDownExtension = this.state.data.extension && this.state.data.extension[0] &&
            this.state.data.extension[0].valueCodeableConcept && this.state.data.extension[0].valueCodeableConcept.coding &&
            this.state.data.extension[0].valueCodeableConcept.coding[0] &&
            this.state.data.extension[0].valueCodeableConcept.coding[0].code === 'drop-down';
        //console.log(this.state.data.linkId + '---------------------->' + JSON.stringify(this.state.data.extension) + '   ' + valueSetArrray + '   '  + dropDownExtension);
        return (
            
            <div className="row q-item-div">
                <div className="col-md-3">
                    <span> {this.state?.data?.linkId} {this.state?.data?.text} </span>
                </div>
                <div className="col-md-9">                    
                    {valueSetArrray && !this.state?.data?.repeats && dropDownExtension &&
                        <select className="form-control">
                            {
                                this.state?.data?.answerOption?.map((dataItem, index) => {                                    
                                    return (<option key={dataItem?.valueCoding?.code} value={dataItem?.valueCoding?.code}>{dataItem?.valueCoding?.code}</option>)
                                })
                            }
                        </select>
                    }
                    {valueSetExists && !this.state.data.repeats && dropDownExtension &&

                        <select className="form-control" onChange={this.handleChange} defaultValue={this.state?.answersData?.answer?.[0]?.valueCoding?.code} >
                            {
                                this.state.valueSet.compose.include[0].concept.map((dataItem, index) => {
                                    return (<option key={dataItem.code} name={this.state.data.linkId} value={dataItem.code}>{dataItem.code}</option>)
                                })
                            }
                        </select>
                    }

                    {valueSetExists && !this.state?.data?.repeats && !dropDownExtension &&
                        this.state?.valueSet?.compose?.include?.[0]?.concept?.map((dataItem, index) => {                            
                            var tobeChecked = this.state?.answersData?.answer?.[0]?.valueCoding?.code === dataItem?.code;
                            return (<label htmlFor={dataItem.code} key={dataItem.code}>
                                <input id={dataItem.code} type="radio" key={dataItem.code} name={this.state.data.linkId} value={dataItem.code} checked={tobeChecked} onChange={this.handleChange} />
                                        <span htmlFor={dataItem.code}>&nbsp;{dataItem.code}&nbsp;</span></label> )
                                
                        })
                    }
                    {/*Answer optiopns embeded*/}
                    {!this.state?.data?.repeats && !dropDownExtension &&
                        this.state?.data?.answerOption?.map((dataItem, index) => {
                            var tobeChecked = this.state?.answersData?.answer?.[0]?.valueCoding?.code === dataItem?.valueCoding?.code;
                            return (<label htmlFor={dataItem?.valueCoding?.code} key={dataItem?.valueCoding?.code}>
                                <input id={dataItem?.valueCoding?.code} type="radio" key={dataItem?.valueCoding?.code} name={this.state.data.linkId} value={dataItem.code} checked={tobeChecked} onChange={this.handleChange} />
                                <span htmlFor={dataItem.code}>&nbsp;{dataItem?.valueCoding?.code}&nbsp;</span></label>)

                        })
                    }

                    {this.state.data.repeats && this.state.valueSet && 
                        this.state?.valueSet?.compose?.include[0].concept?.map((dataItem, index) => {
                            var tobeChecked = this.state.answersData?.answer?.[0]?.valueCoding?.code === dataItem?.code;
                            return (<span className="span4" key={index}> <input className="form-check-input" type="checkbox" id={`custom-checkbox-${index}`} defaultChecked={tobeChecked} onChange={this.handleChange} />{dataItem.code}</span>)
                        })                        
                    }
                    {/*<input key={this.state.data.linkId} className="form-control" type="text"  onChange={this.setAnswerData}></input>*/}
                </div>
            </div>                        
        );
    }
}