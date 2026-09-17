import { TypeMetadataStorage } from '@nestjs/graphql';
import { WhereInput } from '../../src/decorators/where-input.decorator';
import { ListRelationInput } from '../../src/helpers/relation-input.helper';
import { buildSchema, getInputTypeSDL } from '../utils/build-schema';
describe('WhereInput Testing', () => {
	@WhereInput({ type: String, fields: ['hello', 'world'] }, { type: ListRelationInput(String), fields: ['relation'] })
	class HelloWorld {}

	afterAll(() => {
		TypeMetadataStorage.clear();
	});

	it('Should inject all fields to InputType', async () => {
		const inputSDL = getInputTypeSDL(await buildSchema([HelloWorld]), 'HelloWorld');
		expect(inputSDL).toContain('AND: [HelloWorld!]');
		expect(inputSDL).toContain('OR: [HelloWorld!]');
		expect(inputSDL).toContain('NOT: [HelloWorld!]');
		expect(inputSDL).toContain('hello: String');
		expect(inputSDL).toContain('world: String');
		expect(inputSDL).toContain('relation: StringListRelationWhereInput');
	});
});
