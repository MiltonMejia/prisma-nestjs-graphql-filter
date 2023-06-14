import { InputArgs } from './input-args.input';

export type RelationInput = Omit<InputArgs, 'type, fields'> & { name?: string };
