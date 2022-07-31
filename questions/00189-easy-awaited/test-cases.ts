import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
]

// @ts-expect-error
type error = MyAwaited<number>

// type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T
// 无法满足error，内置的Awaited根据.then属性来的，兼容类Promise，但是await是支持跟随非Promise的

// TODO: 是否有更简单的写法？？
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer R> ? R extends Promise<unknown> ? MyAwaited<R> : R : T
