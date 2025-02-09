/**
 * @module ObjectFields
 */
import {Component} from '@angular/core';
import {model} from '../../services/model.service';
import {view} from '../../services/view.service';
import {language} from '../../services/language.service';
import {metadata} from '../../services/metadata.service';
import {fieldGeneric} from './fieldgeneric';
import {Router} from '@angular/router';

/**
* @ignore
*/
declare var moment: any;

/**
 * a field to display a simple date with selection option
 */
@Component({
    selector: 'field-date',
    templateUrl: '../templates/fielddate.html'
})
export class fieldDate extends fieldGeneric {

    constructor(public model: model, public view: view, public language: language, public metadata: metadata, public router: Router) {
        super(model, view, language, metadata, router);
    }

    /**
     * set the field to invalid, tied to the emitter on the system-date
     *
     * @param valid
     */
    public setValid(valid){
        if(!valid){
            this.setFieldError(this.language.getLabel('LBL_INPUT_INVALID'));
        } else {
            this.clearFieldError();
        }
    }

    /**
     * if set to highlight determine if the date is in the past
     */
    get highlightdate() {
        return this.fieldconfig.highlightpast && this.value && new moment() > new moment(this.model.getField(this.fieldname)) ? true : false;
    }
}
