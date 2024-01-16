import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Gear } from './models';

type ɵRawValue<T extends AbstractControl | undefined> =
    T extends FormControl<infer R> ?
    R :
    T extends FormGroup<infer R> ?
    ValuesOf<R> :
    T extends FormArray<infer R> ?
    (R extends FormGroup<infer K> ? ValuesOf<K>[] : (R extends FormControl<infer K> ? K : never)) :
    never;

/**
 * Derive the form value definition from a form model
 */
export type ValuesOf<T extends { [K in keyof T]?: AbstractControl<any>; }> = Partial<{ [K in keyof T]: ɵRawValue<T[K]>; }>;

export type GearMap = { [key: string]: Gear };
