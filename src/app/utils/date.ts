import {NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { isNumber, padNumber, toInteger } from './numbers';
import * as moment from 'moment';

@Injectable()
export class NgbDateBRParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
        const dateParts = value.trim().split('/');
        if (dateParts.length === 1 && isNumber(dateParts[0])) {
            return {year: toInteger(dateParts[0]), month: null, day: null};
        } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
            return {year: toInteger(dateParts[1]), month: toInteger(dateParts[0]), day: null};
        } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
            return {year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0])};
        }
    }
    return null;
}
  format(date: NgbDateStruct): string {
    let stringDate = '';
    if (date) {
        stringDate += isNumber(date.day) ? padNumber(date.day) + '/' : '';
        stringDate += isNumber(date.month) ? padNumber(date.month) + '/' : '';
        stringDate += date.year;
    }
    return stringDate;
  }
}

export const unixValue = (d: NgbDateStruct) => {
  return moment(
    moment(`${d.year}/${d.month}/${d.day}`)
  ).unix();
};

export const ngbDateStructToIsoDate = (d: NgbDateStruct) => {
  return moment(`${d.year}/${d.month}/${d.day}`).toISOString();
}

export const postgreeIntervalMask = (data: any) => {
  return `${padNumber(data.hours || 0)}h ${padNumber(data.minutes || 0)}m ${padNumber(data.seconds || 0)}s`;
};
