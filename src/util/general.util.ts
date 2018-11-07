import { objVals } from "./object.util";
import { JsType, JsTypeFind } from "../types/general.types";

/** Generate a random number between min and max, min and max are inclusive */
export const rand = (min: number, max: number) => Math.floor(Math.random() * ((max + 1) - min)) + min;

/** Iterates n times over a function */
export const iterate = (num: number) => ({
    for: (funct: (i: number) => any) => {
        for (let i = 0; i < num; i++) { funct(i) };
    },
    map: <T>(funct: (i: number) => T) => {
        const arr: T[] = [];
        for (let i = 0; i < num; i++) { arr.push(funct(i)) };
        return arr;
    }
});

/** An improved version of native `typeof` */
export function getType(val: any): JsType {
    if (typeof val === 'object') {
        if (Array.isArray(val)) return 'array';
        else if (val === null)  return 'null';
        else                    return 'object';
    } else {
        if (val !== val)        return 'NaN';
        else                    return typeof val;
    }
}

/**
 * The function will test if the type of the first
 * argument equals testType. Argument testType is a string
 * representing a javascript type.
 * 
 * @param val value to be tested
 * @param testType to check if typeof val === testType
 */
export const typeOf = <T extends JsType> (val: any, testType: T): val is JsTypeFind<T> => getType(val) === testType;

/** if value is ( null || undefined ) */
export const nonValue = (val): val is (null | undefined) => val === null || val === undefined;

/** if value is ( null || undefined || '' || [ ] || { } ) */
export function nullOrEmpty(x: any): boolean {
    // null || undefined
    if (nonValue(x)) return true;

    // (string || array).length === 0
    if (typeOf(x, 'string') || typeOf(x, 'array')) return !x.length;

    // object // { key: 'val' } => false, { } => true
    if (typeOf(x, 'object')) return !objVals(x).length;

    return false;
}