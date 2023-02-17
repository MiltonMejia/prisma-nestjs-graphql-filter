import { CLASS_TYPE_METADATA, TypeMetadataStorage } from '@nestjs/graphql';
import { WhereInput } from '../../src/decorators/where-input.decorator';
describe('injectInputType Testing', () => {
	@WhereInput({ type: String, fields: ['hello'] })
	class WhereClass {}

	afterAll(() => {
		TypeMetadataStorage.clear();
	});

	it('Should inject Nestjs InputType to WhereInput decorator', () => {
		const whereClassType = Reflect.getMetadata(CLASS_TYPE_METADATA, WhereClass);
		expect(whereClassType).toBe('inputType');
	});
});
