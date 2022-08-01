import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (() => unknown) ? T[P] : DeepReadonly<T[P]>
}

// TIP:
// keyof T[P] extends never ? T[P] : 主要用于排除 函数
// 也可以使用 T[P] extends Function
// type cases = [
//   Expect<Equal<keyof (() => any), never>>,
//   Expect<Equal<keyof ({}), never>>,
// ]
