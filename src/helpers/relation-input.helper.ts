import { addFieldMetadata } from '@nestjs/graphql';
import { RelationInput } from '../types/relation-input.type';
import { createInputType } from '../functions/create-input-type.function';

/**
 * Cast any InputType to compatible Prisma list relation filter. You must use this function if field filter
 * in prisma is type 'ListRelationFilter'.
 * @param type
 * @param args
 * @returns
 */
export function ListRelationInput(type: Function, args?: RelationInput) {
	// Create a parent InputType, because we need to inject the ListRelationFilter fields (every, some, none)
	const RelationClass = createInputType(
		args?.name ?? `${type.name.replace(/(Where|Input)/g, '')}${'ListRelationWhereInput'}`,
		'Prisma ListRelationFilter input'
	);
	// Add type paramenter to all parent InputType fields
	const relationKeys = ['every', 'some', 'none'];
	relationKeys.map((key) =>
		addFieldMetadata(
			() => type,
			{
				...args,
				nullable: true,
				description: `Return data parent if ${key} child of ${type.name} filter matches`,
			},
			RelationClass.prototype,
			key
		)
	);

	return RelationClass;
}
