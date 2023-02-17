import { TypeMetadataStorage } from '@nestjs/graphql';
import { WhereInput } from '../../src/decorators/where-input.decorator';
import { getFieldsAndDecoratorForType } from '@nestjs/graphql/dist/schema-builder/utils/get-fields-and-decorator.util';
import { ListRelationInput } from '../../src/helpers/relation-input.helper';
describe('ListRelationInput Testing', () => {
	@WhereInput({ type: String, fields: ['id', 'name'] })
	class ChildClass {}

	@WhereInput({ type: ListRelationInput(ChildClass), fields: ['child'] })
	class ParentClass {}

	afterAll(() => {
		TypeMetadataStorage.clear();
	});

	it("Should inject Prisma ListRelation fields to ParentClass 'child' field", () => {
		const childFields = getFieldsAndDecoratorForType(
			(getFieldsAndDecoratorForType(ParentClass).fields[0].options as any).type
		).fields.map((item) => item.name);
		expect(childFields).toEqual(['every', 'some', 'none']);
	});

	it('Should Prisma ListRelation fields be type of ChildClass', () => {
		getFieldsAndDecoratorForType(
			(getFieldsAndDecoratorForType(ParentClass).fields[0].options as any).type
		).fields.map((item) => expect(item.target.name).toEqual('ChildClassListRelationWhereInput'));
	});
});
