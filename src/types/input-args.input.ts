import { Complexity, FieldMiddleware } from '@nestjs/graphql';
import { GraphQLScalarType } from 'graphql';
import { SortOrder } from '../filters';

export type InputArgs = {
	type: Function | Function[] | GraphQLScalarType<unknown, unknown> | typeof SortOrder;
	fields: string[];
	description?: string;
	complexity?: Complexity;
	middlewares?: FieldMiddleware[];
	defaultValue?: unknown;
	deprecationReason?: string;
};
