import { Complexity, FieldMiddleware } from '@nestjs/graphql';
import { GraphQLScalarType } from 'graphql';

export type WhereInput = {
	type: Function | Function[] | GraphQLScalarType<unknown, unknown>;
	fields: string[];
	description?: string;
	complexity?: Complexity;
	middlewares?: FieldMiddleware[];
	defaultValue?: unknown;
	deprecationReason?: string;
};
