import 'reflect-metadata';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory, Query, Resolver } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { printSchema } from 'graphql';

@Resolver()
class QueryPlaceholder {
	@Query(() => String)
	placeholder() {
		return 'placeholder';
	}
}

/**
 * Builds a GraphQL schema containing the given classes as orphaned types and returns its SDL.
 * Uses only public APIs from @nestjs/graphql so tests do not rely on internal metadata helpers.
 */
export async function buildSchema(orphanedTypes: Function[]): Promise<string> {
	const moduleRef = await Test.createTestingModule({
		imports: [GraphQLSchemaBuilderModule],
	}).compile();

	const schemaFactory = moduleRef.get(GraphQLSchemaFactory);
	const schema = await schemaFactory.create([QueryPlaceholder], { orphanedTypes });

	return printSchema(schema);
}

/**
 * Returns the SDL block of an input type, e.g. `input Hello { ... }`.
 */
export function getInputTypeSDL(sdl: string, name: string): string {
	const match = sdl.match(new RegExp(`input ${name} \\{[^}]*\\}`));
	return match?.[0] ?? '';
}
