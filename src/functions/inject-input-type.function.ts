import { TypeMetadataStorage } from '@nestjs/graphql';
import { ClassType } from '@nestjs/graphql/dist/enums/class-type.enum';
import { ClassMetadata } from '@nestjs/graphql/dist/schema-builder/metadata';
import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage';
import { addClassTypeMetadata } from '@nestjs/graphql/dist/utils/add-class-type-metadata.util';

/**
 * This function adds a generic class with the injected InputType decorator to TypeMetadataStorage.
 * Although this generic input type has graphql metadata, you must add fields before schema building, or Nestjs will throw error
 * @param name
 * @param description
 * @returns Class with InputType injected
 */
export function injectInputType(target: Function) {
	// Search if theres is a InputType matching with name paramenter in TypeMetadataStorage
	const storedInputType = TypeMetadataStorage.getInputTypesMetadata().find((item) => item.name === target.name);
	if (typeof storedInputType !== 'undefined') {
		throw Error(`You can't define multiple input types with the same name "${target.name}"`);
	}

	// Add InputType to TypeMetadataStorage if storedInputType isn't found
	const metadata: ClassMetadata = { name: target.name, target: target, description: `${target.name} filter input` };
	TypeMetadataStorage.addInputTypeMetadata(metadata);
	LazyMetadataStorage.store(() => TypeMetadataStorage.addInputTypeMetadata(metadata));
	addClassTypeMetadata(target, ClassType.INPUT);
}
