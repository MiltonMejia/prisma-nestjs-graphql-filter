import { SetMetadata } from '@nestjs/common';
import { CLASS_TYPE_METADATA, TypeMetadataStorage } from '@nestjs/graphql';

/**
 * This function adds a generic class with the injected InputType decorator to TypeMetadataStorage.
 * Although this generic input type has graphql metadata, you must add fields before schema building, or Nestjs will throw error
 * @param target
 * @returns Class with InputType injected
 */
export function injectInputType(target: Function) {
	// Search if theres is a InputType matching with name paramenter in TypeMetadataStorage
	const storedInputType = TypeMetadataStorage.getInputTypesMetadata().find((item) => item.name === target.name);
	if (typeof storedInputType !== 'undefined') {
		throw Error(`You can't define multiple input types with the same name "${target.name}"`);
	}

	// Add InputType to TypeMetadataStorage if storedInputType isn't found
	TypeMetadataStorage.addInputTypeMetadata({
		name: target.name,
		target,
		description: `${target.name} filter input`,
	});
	SetMetadata(CLASS_TYPE_METADATA, 'inputType')(target);
}
