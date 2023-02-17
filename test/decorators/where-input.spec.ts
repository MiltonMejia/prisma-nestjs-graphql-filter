import { TypeMetadataStorage } from '@nestjs/graphql';
import { WhereInput } from '../../src/decorators/where-input.decorator';
import { getFieldsAndDecoratorForType } from '@nestjs/graphql/dist/schema-builder/utils/get-fields-and-decorator.util';
import { ListRelationInput } from '../../src/helpers/relation-input.helper';
describe('WhereInput Testing', () => {
	@WhereInput({ type: String, fields: ['hello', 'world'] }, { type: ListRelationInput(String), fields: ['relation'] })
	class HelloWorld {}

	afterAll(() => {
		TypeMetadataStorage.clear();
	});

	it('Should inject all fields to InputType', () => {
		const helloWorldFields = getFieldsAndDecoratorForType(HelloWorld).fields.map((item) => item.name);
		expect(helloWorldFields).toEqual(['AND', 'OR', 'NOT', 'hello', 'world', 'relation']);
	});
});
