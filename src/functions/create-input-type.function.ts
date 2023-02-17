import { TypeMetadataStorage } from '@nestjs/graphql';
import { ClassType } from '@nestjs/graphql/dist/enums/class-type.enum';
import { ClassMetadata } from '@nestjs/graphql/dist/schema-builder/metadata';
import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage';
import { addClassTypeMetadata } from '@nestjs/graphql/dist/utils/add-class-type-metadata.util';

/**
 * This function returns a generic class with the injected InputType that was previously generated and stored from TypeMetadataStorage
 *
 * Note: TypeMetadataStorage is the place where all graphql object types and its metadata are stored, before the schema building.
 * If you want to know more, visit: https://github.com/nestjs/graphql
 * @param name
 * @param description
 * @returns Class with InputType injected
 */
export function createInputType(name: string, description?: string) {
	// Search if theres is a InputType matching with name paramenter in TypeMetadataStorage
	const storedInputType = TypeMetadataStorage.getInputTypesMetadata().find((item) => item.name === name);
	if (typeof storedInputType !== 'undefined') {
		// Return the stored InputType instead create one
		return storedInputType.target;
	}

	// Create a generic class object
	const GenericInputType = class {};
	Object.defineProperty(GenericInputType, 'name', { value: name });

	// Add InputType to TypeMetadataStorage if storedInputType isn't found
	const metadata: ClassMetadata = { name: name, target: GenericInputType, description: description };
	TypeMetadataStorage.addInputTypeMetadata(metadata);
	LazyMetadataStorage.store(() => TypeMetadataStorage.addInputTypeMetadata(metadata));
	addClassTypeMetadata(GenericInputType, ClassType.INPUT);

	// Return new InputType
	return GenericInputType;
}
