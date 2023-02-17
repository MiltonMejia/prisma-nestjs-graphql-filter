import { CLASS_TYPE_METADATA, TypeMetadataStorage } from '@nestjs/graphql';
import { createInputType } from '../../src/functions/create-input-type.function';
describe('createInputType Testing', () => {
	afterAll(() => {
		TypeMetadataStorage.clear();
	});

	it('Should create InputType class', () => {
		const InputClass = createInputType('NewInputType', 'InputType created dinamically');
		const whereClassType = Reflect.getMetadata(CLASS_TYPE_METADATA, InputClass);
		expect(whereClassType).toBe('inputType');
	});
});
