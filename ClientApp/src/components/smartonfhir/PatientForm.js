import React, { Component } from 'react';
import './Index.css';
import { ItemString } from './ItemString';
import { ItemDate } from './ItemDate';
import { ItemDecimal } from './ItemDecimal';
import { ItemInteger } from './ItemInteger';
import { ItemChoice } from './ItemChoice';
import { ItemBase } from './ItemBase';

export class PatientForm extends ItemBase {

    static launcData = {};
    static divId = "formContainer";

    static formDefData = [];
    constructor(props) {
        super(props);
        this.state = {
            formDef: this.props.value,
            name: "Demo Form",
            answersData: this.props.answersData,
            qAnswers: this.props.qAnswers,
            qrFormDef: this.props.qr,
            itemArray: this.props.itemArray
        }
    }

    static getDerivedStateFromProps(props, state) {
        return { formDef: props.value, qAnswers: props.qAnswers, qrFormDef: props.qr, itemArray: props.itemArray };
    }

    render() {
        return (
            <div>
                {this.state.itemArray &&
                    <div>
                        {this.state.itemArray.map((data, key) => {
                            {
                                let answer = super.getAnswerForQuestion(data.linkId, this.state.qrFormDef.item);

                                switch (data.type) {
                                    case 'string':
                                        if (!answer)
                                            answer = { linkId: data.linkId, answer: [], text: data.text };
                                        this.state.qAnswers.push(answer);
                                        return (<ItemString key={data.linkId} answersData={answer}></ItemString>);
                                    case 'date':
                                        if (!answer)
                                            answer = { linkId: data.linkId, answer: [{ valueDate: "" }], text: data.text };
                                        this.state.qAnswers.push(answer);
                                        return (<ItemDate key={data.linkId} value={data} answersData={answer}></ItemDate>);
                                    case 'decimal':
                                        if (!answer)
                                            answer = { linkId: data.linkId, answer: [{ valueDecimal: "" }], text: data.text };
                                        this.state.qAnswers.push(answer);
                                        return (<ItemDecimal key={data.linkId} value={data} answersData={answer}></ItemDecimal>);
                                    case 'integer':
                                        if (!answer)
                                            answer = { linkId: data.linkId, answer: [], text: data.text };
                                        this.state.qAnswers.push(answer);
                                        return (<ItemInteger key={data.linkId} value={data} answersData={answer}></ItemInteger>);
                                    case 'choice':
                                        if (!answer)
                                            answer = { linkId: data.linkId, answer: [{ valueInteger: "" }], text: data.text };
                                        this.state.qAnswers.push(answer);
                                        return (<ItemChoice key={data.linkId} value={data} answersData={answer}></ItemChoice>);
                                    case 'group':
                                        const qAnswers = new Array();
                                        this.state.qAnswers.push({ linkId: data.linkId, item: qAnswers });

                                        return (
                                            <PatientForm key={data.linkId} value={this.state.formDef} qAnswers={qAnswers} qr={this.state.qrFormDef} itemArray={data.item}></PatientForm>
                                        );
                                    default:
                                        return null;
                                }
                            }

                        })}
                    </div>

                }
            </div>
        );
    }
}