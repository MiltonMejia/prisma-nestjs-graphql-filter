import { addField } from '../functions/add-field.function';
import { injectInputType } from '../functions/inject-input-type.function';
import { InputArgs } from '../types/input-args.input';

/**
 * This decorator helps you to create OrderBy inputs of Prisma easily and reduce boilerplate at same time
 * You can nest multiple OrderBy inputs except when there's circular dependency among inputs
 *
 * This decorator only add fields to graphql schema, so you must to add SortOrder Enum (available in this package)
 * @param args
 * @returns
 * @example
 * WhereInput(
 * 	{ type: SortOrder, fields: ['hello', 'world']},
 * )
 */
export function OrderByInput(...args: InputArgs[]) {
	return function (target: Function) {
		injectInputType(target);
		args.map((item) => addField(target, item));
	};
}
