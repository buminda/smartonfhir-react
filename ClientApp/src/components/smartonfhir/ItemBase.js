import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemBase extends Component {

    constructor(props) {
        super(props);
    }

    baseMethodCallTest() {

    }

    callEnableWhen(values) {
        console.log('Calling enable when base ' + this.state?.answersData?.linkId + '  ' + JSON.stringify(values));
    }

    evaluateEnableWhen(enableWhenArray, anwesrs) {
        //console.log('Calling enable conditions ' + JSON.stringify(anwesrs))
        var enabled = true;
        for (let i = 0; i < enableWhenArray.length; i++) {
            var enalbeCondition = enableWhenArray[i];
            var qLinkId = enalbeCondition.question;
            var operator = enalbeCondition.operator;
            var answer = enalbeCondition.answerString;

            var userAnswer = null;
            for (let j = 0; j < anwesrs.length; j++) {
                //console.log('Calling enable conditions ' + anwesrs[j].answersData.linkId +'  -- '+ qLinkId)
                if (anwesrs[j].answersData.linkId === qLinkId) {
                    userAnswer = anwesrs[j].answersData;
                    //console.log('User answer ' + JSON.stringify(userAnswer));
                    break;
                }
            }
            if (userAnswer) {
                var foundMatch = false; 
                for (let j = 0; j < userAnswer.answer.length; j++) {
                    if (operator === '=') {
                        //console.log('User answer, op =  ' + anwesrs[j]?.answer?.valueCoding?.code + '  ' + answer);
                        if (userAnswer.answer[j].valueCoding?.code === answer) {
                            //console.log('User answer, op =  found' + userAnswer.answer[j].valueCoding?.code + '  ' + answer);
                            foundMatch = true;
                            break;
                        }
                    } else if (operator === '!=') {

                    }
                    
                }
                if (!foundMatch)
                    enabled = false;
            }
        }
        return enabled;
    }

    getAnswerForQuestion(linkId, item) {
        if (!linkId || !item || item.length == 0) return null;

        for (let i = 0; i < item.length; i++) {            
            if (item[i].item ) {
                let ret = this.getAnswerForQuestion(linkId, item[i].item);
                if (ret) {
                    return ret;
                }
            } else {
                
                if (item[i].linkId === linkId && item[i].answer) {                   
                    return item[i];
                }                    
            }
        }
        return null;
    }

    getEnableWhenForQuestion(linkId, item) {
        if (!linkId || !item || item.length == 0) return null;

        for (let i = 0; i < item.length; i++) {
            if (item[i].item) {
                let ret = this.getAnswerForQuestion(linkId, item[i].item);
                if (ret) {
                    return ret;
                }
            } else {
                if ( item[i].linkId === linkId && item[i].answer) {
                    return item[i];
                }
            }
        }
        return null;
    }

}