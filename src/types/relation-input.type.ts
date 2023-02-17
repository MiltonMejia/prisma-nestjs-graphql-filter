import { WhereInput } from './where.input';

export type RelationInput = Omit<WhereInput, 'type, fields'> & { name?: string };
