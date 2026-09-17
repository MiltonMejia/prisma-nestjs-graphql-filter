import { InputArgs } from './input-args.input.js';

export type RelationInput = Omit<InputArgs, 'type, fields'> & { name?: string };
