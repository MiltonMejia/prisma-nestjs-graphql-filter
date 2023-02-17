# Prisma nestjs graphql filter

This package helps you to reduce boilerplate if you want to create Prisma filter input in Graphql. WhereInput decorator accepts an array of arguments, so you can add all fields with any type as you need.

This package is compatible with all Graphql input types and all classes with InputType decorator. Also you can declare your field input type as array (check the examples below)

## Installation

### NPM

```
npm -i prisma-nestjs-graphql-filter
```

### Yarn

```
yarn add prisma-nestjs-graphql-filter
```

## How to use

```typescript
@WhereInput({ type: String, fields: ['hello', 'world'] })
class ExampleInput {}
```

> NOTE: InputType is not necessary

#### Graphql SDL result

```
input ExampleInput {
  hello: String
  world: String
  AND: [ExampleInput]
  OR: [ExampleInput]
  NOT: [ExampleInput]
}
```

## How to use with relation list

```typescript
@WhereInput({ type: ListRelationInput(OtherClass), fields: ['relationField'] })
class ExampleInput {}
```

> NOTE: InputType is not necessary

#### Graphql SDL result

```
input ExampleInput {
  relationField: OtherClassListRelationWhereInput
  AND: [ExampleInput]
  OR: [ExampleInput]
  NOT: [ExampleInput]
}

input OtherClassListRelationWhereInput {
  every: OtherClass
  some: OtherClass
  none: OtherClass
}
```

> NOTE: This decorator always concat word 'ListRelationWhereInput' to class name and delete words: 'Input' and 'Where' if are present in original input name

## Field type as array

```typescript
@WhereInput(
	{ type: [String], fields: ['hello', 'world'] },
	{ type: [ListRelationInput(OtherInputClass)], fields: ['relationArray'] }
)
class ExampleInputArray {}
```

#### Graphql SDL result

```
input ExampleInputArray {
  hello: [String]
  world: [String]
  relationField: [StringListRelationWhereInput]
}
```
