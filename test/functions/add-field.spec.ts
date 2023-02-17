import { TypeMetadataStorage } from '@nestjs/graphql';
import { getFieldsAndDecoratorForType } from '@nestjs/graphql/dist/schema-builder/utils/get-fields-and-decorator.util';
import { addField } from '../../src/functions/add-field.function';
import { createInputType } from '../../src/functions/create-input-type.function';
describe('addField Testing', () => {
	afterAll(() => {
		TypeMetadataStorage.clear();
	});

	it('Should inject fields to dynamic InputType', () => {
		const InputClass = createInputType('NewInputType', 'InputType created dinamically') as any;
		addField(InputClass, { type: String, fields: ['inputClass', 'otherInputClass'] });

		const inputClassFields = getFieldsAndDecoratorForType(InputClass).fields.map((item) => item.name);
		expect(inputClassFields).toEqual(['inputClass', 'otherInputClass']);
	});
});
