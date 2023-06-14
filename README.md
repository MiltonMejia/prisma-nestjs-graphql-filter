# Prisma nestjs graphql filter

This package helps you to reduce boilerplate if you want to create Prisma filter input in Graphql. WhereInput decorator accepts an array of arguments, so you can add all fields with any type as you need.

This package is compatible with all Graphql input types and all classes with InputType decorator. Also you can declare your field input type as array (check the examples below).

Is not necessary add native Input decorator when you use WhereInput or OrderByInput decorators.

## Before installation

You must install `class-transformer` package before install if you want to use DecimalFilter

## Circular dependency

WhereInput and OrderByInput may not work when you nest with each other, due to circular dependency issues. You can use those decorators if you add nested fields with Field decorator inside class.

## Installation

### NPM

```
npm -i prisma-nestjs-graphql-filter
```

### Yarn

```
yarn add prisma-nestjs-graphql-filter
```

## How to use WhereInput

```typescript
@WhereInput({ type: String, fields: ['hello', 'world'] })
class ExampleInput {}
```

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

> NOTE: This decorator always concat word 'ListRelationWhereInput' to class name and delete words: 'Input' and 'Where' if those are present in original input name.

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

## How to use OrderByInput

```typescript
@OrderByInput({ type: SortOrder, fields: ['hello', 'world'] })
class ExampleInput {}
```

#### Graphql SDL result

```
input ExampleInput {
  hello: SortOrder //asc | desc
  world: SortOrder //asc | desc
}
```

## How to add nested fields

```typescript
@OrderByInput({ type: SortOrder, fields: ['hello'] })
class NestedOrderBy {}

@OrderByInput({ type: NestedOrderBy, fields: ['nestedField'] })
class ExampleInput {}
```

#### Graphql SDL result

```
input ExampleInput {
  nestedField: NestedOrderBy
}

input NestedOrderBy {
  hello: SortOrder
}
```

## Static typing

Because all fields injected with WhereInput or OrderByInput are not declared by the decorator explicitly, Typescript can't recognizes the class fields. To avoid this and helps IDE to hinting, you can extend `CastToAbstract` with prisma where type.

For example:

```typescript
class ExampleInputArray extends CastToAbstract<Prisma.HelloWorldWhereInput>() {}
```

## Prisma filters and extra types

There are many prisma filter types and extra types availables that you can use as:

-   AffectedRows
-   BoolFilter
-   BoolWithAggregatesFilter
-   DateTimeFilter
-   DateTimeWithAggregatesFilter
-   DecimalFilter
-   DecimalWithAggregatesFilter
-   FloatFilter
-   FloatWithAggregatesFilter
-   IntFilter
-   IntWithAggregatesFilter
-   QueryMode
-   SortOrder
-   StringFilter
-   StringWithAggregatesFilter
-   TransactionIsolationLevel
