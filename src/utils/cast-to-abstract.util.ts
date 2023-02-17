import { Type } from '@nestjs/common';

export function CastToAbstract<T>(): Type<T> {
	return class {} as Type<T>;
}
