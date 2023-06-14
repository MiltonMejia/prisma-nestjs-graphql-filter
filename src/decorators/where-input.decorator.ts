import { addField } from '../functions/add-field.function';
import { injectInputType } from '../functions/inject-input-type.function';
import { InputArgs } from '../types/input-args.input';

/**
 * This decorator allows inject a list of field into an InputType, reducing boilerplate code to minimum.
 * All Graphql types, and classes decorated with InputType are compatible.
 * NOTE: In circular inputs, this input may not work because circular dependency issues.
 *
 * This decorator only add fields to graphql schema, so you must to add prisma filter types to your variables
 * @param args
 * @returns
 * @example
 * WhereInput(
 * 	{ type: String, fields: ['hello', 'world']},
 * 	{ type: Float, fields: ['numberOne', 'numberTwo']}
 * 	{ type: CustomClass, fields: ['numberOne', 'numberTwo']}
 * )
 * // If you want to add a Prisma ListRelationFilter type
 * WhereInput(
 * 	{ type: RelationInputType(String), fields: ['hello', 'world'] },
 * 	{ type: RelationInputType(CustomClass), fields: ['helloRelation', 'worldRelation'] }
 * )
 */
export function WhereInput(...args: InputArgs[]) {
	return function (target: Function) {
		injectInputType(target);
		const prismaFields: InputArgs[] = [{ fields: ['AND', 'OR', 'NOT'], type: [target] }];
		prismaFields.concat(args).map((item) => addField(target, item));
	};
}
