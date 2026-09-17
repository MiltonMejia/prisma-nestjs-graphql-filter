import { TypeMetadataStorage } from '@nestjs/graphql';
import { addField } from '../../src/functions/add-field.function';
import { createInputType } from '../../src/functions/create-input-type.function';
import { buildSchema, getInputTypeSDL } from '../utils/build-schema';
describe('addField Testing', () => {
	afterAll(() => {
		TypeMetadataStorage.clear();
	});

	it('Should inject fields to dynamic InputType', async () => {
		const InputClass = createInputType('NewInputType', 'InputType created dinamically') as any;
		addField(InputClass, { type: String, fields: ['inputClass', 'otherInputClass'] });

		const inputSDL = getInputTypeSDL(await buildSchema([InputClass]), 'NewInputType');
		expect(inputSDL).toContain('inputClass: String');
		expect(inputSDL).toContain('otherInputClass: String');
	});
});
