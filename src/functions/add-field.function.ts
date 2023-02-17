import { addFieldMetadata } from '@nestjs/graphql';
import { WhereInput } from '../types/where.input';

/**
 * Add a list of fields to InputType where decorator is
 * @param target
 * @param args
 */
export function addField(target: Function, args: WhereInput) {
	const { type, fields, ...fieldArgs } = args;
	fields.map((field) => addFieldMetadata(() => type, { ...args, nullable: true }, target.prototype, field));
}
