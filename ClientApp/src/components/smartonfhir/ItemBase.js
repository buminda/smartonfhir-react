import React, { Component } from 'react';
import authService from './../api-authorization/AuthorizeService';

export class ItemBase extends Component {

    constructor(props) {
        super(props);        
    }

    baseMethodCallTest() {
        
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