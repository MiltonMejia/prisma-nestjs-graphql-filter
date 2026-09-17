import { TypeMetadataStorage } from '@nestjs/graphql';
import { WhereInput } from '../../src/decorators/where-input.decorator';
import { ListRelationInput } from '../../src/helpers/relation-input.helper';
import { buildSchema, getInputTypeSDL } from '../utils/build-schema';
describe('ListRelationInput Testing', () => {
	@WhereInput({ type: String, fields: ['id', 'name'] })
	class ChildClass {}

	@WhereInput({ type: ListRelationInput(ChildClass), fields: ['child'] })
	class ParentClass {}

	afterAll(() => {
		TypeMetadataStorage.clear();
	});

	it("Should inject Prisma ListRelation fields to ParentClass 'child' field", async () => {
		const relationSDL = getInputTypeSDL(await buildSchema([ParentClass]), 'ChildClassListRelationWhereInput');
		expect(relationSDL).toContain('every: ChildClass');
		expect(relationSDL).toContain('some: ChildClass');
		expect(relationSDL).toContain('none: ChildClass');
	});

	it('Should Prisma ListRelation fields be type of ChildClass', async () => {
		const sdl = await buildSchema([ParentClass]);
		expect(sdl).toContain('child: ChildClassListRelationWhereInput');
	});
});
