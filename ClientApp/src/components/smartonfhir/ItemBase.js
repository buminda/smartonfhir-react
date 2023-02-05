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

    evaluateEnableWhen(item, anwesrs) {
        //console.log('Calling enable conditions ' + JSON.stringify(anwesrs))
        var enableWhenArray = item?.enableWhen;   //item?.enableWhen[]
        var enabled = true;
        for (let i = 0; i < enableWhenArray.length; i++) {
            var enalbeCondition = enableWhenArray[i];
            var qLinkId = enalbeCondition.question;
            var operator = enalbeCondition.operator;
            //console.log("enalbeCondition " +JSON.stringify(enalbeCondition))
            var answer = this.getEnableWhenAnswer(enalbeCondition); //inside answer, there can be answerBooleanm, answerDecinal, answerInteger, ... answerCoding
            //console.log("enalbeCondition answer " + answer);
            var behavior = enalbeCondition.enableBehavior;

            var userAnswer = null;
            for (let j = 0; j < anwesrs.length; j++) {
                //console.log('Calling enable conditions ' + anwesrs[j].answersData.linkId +'  -- '+ qLinkId)
                if (anwesrs[j].answersData.linkId === qLinkId) {
                    userAnswer = anwesrs[j].answersData;
                    //console.log('User answer ' + JSON.stringify(userAnswer));
                    break;
                }
            }

            var foundMatch = false;
            
            if (userAnswer)
            {
                
                for (let j = 0; j < userAnswer.answer.length; j++) {
                    //console.log('answerOperand ' + JSON.stringify(userAnswer.answer[j]))
                    var answerOperand = this.getAvailableAnswer(userAnswer.answer[j]);
                    console.log('answerOperand ' + answerOperand )
                    if (operator === '=')
                    {
                        if (answer === answerOperand)
                        {
                            //console.log('User answer, op =  found' + userAnswer.answer[j].valueCoding?.code + '  ' + answer);
                            foundMatch = true;
                            break;
                        }
                    } else if (operator === '!=')
                    {
                        if (answer !== answerOperand) {
                            foundMatch = true;
                            break;
                        }
                    }                    
                    else if (operator === '>') { //boolean, decimal, integer, date, datetime, time, string
                        if (answer > answerOperand) {
                            foundMatch = true;
                            break;
                        }
                    } 
                    else if (operator === '<') {
                        if (answerOperand < answer) {
                            foundMatch = true;
                            break;
                        }
                    } else if (operator === '>=') {
                        if (answer >= answerOperand) {
                            foundMatch = true;
                            break;
                        }
                    }
                    else if (operator === '<=') {
                        if (answer <= answerOperand) {
                            foundMatch = true;
                            break;
                        }
                    }
                    else if (operator === 'exists') {
                        if (answer.includes( answerOperand )) {
                            foundMatch = true;
                            break;
                        }
                    }
                }                
            }
            if (!foundMatch)
                enabled = false; //all or any we need to find a match.
            else {
                if (behavior) {
                    if (behavior === 'any') {
                        break; // we find a match and behavior is any
                    }
                } else {
                    break; // no behavor defined => its any ??
                }
            }
        }
        return enabled;
    }

    getAvailableAnswer(answer) {
        if (answer.answerBoolean)
            return answer.answerBoolean;
        if (answer.answerDecimal)
            return answer.answerDecimal;
        if (answer.valueInteger) {
            if (Number.isInteger(answer.valueInteger))
                return answer.valueInteger;
            else
                return parseInt(answer.valueInteger);
            return answer.valueInteger;
        }            
        if (answer.answerDate)
            return answer.answerDate;
        if (answer.answerDateTime)
            return answer.answerDateTime;
        if (answer.answerDateTime)
            return answer.answerDateTime;
        if (answer.answerString)
            return answer.answerString;
        if (answer.valueCoding)
            return answer.valueCoding.code;
        return null;
    }

    getEnableWhenAnswer(answer) {
        if (answer.answerBoolean)
            return answer.answerBoolean;
        if (answer.answerDecimal)
            return answer.answerDecimal;
        if (answer.answerInteger)
            if (Number.isInteger(answer.answerInteger))
                return answer.answerInteger;
            else
                return parseInt(answer.answerInteger);            
        if (answer.answerDate)
            return answer.answerDate;
        if (answer.answerDateTime)
            return answer.answerDateTime;
        if (answer.answerDateTime)
            return answer.answerDateTime;
        if (answer.answerDateTime)
            return answer.answerDateTime;
        if (answer.answerString)
            return answer.answerString;
        return null;
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