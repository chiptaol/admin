import type { Rule } from 'effector-forms'
import * as yup from 'yup'

type Props<T> = {
  name: string
  schema: yup.SchemaOf<T>
}

export const createRule = <V, T = any>({ name, schema }: Props<T>): Rule<V> => {
  return {
    name,
    validator: (v: V) => {
      try {
        schema.validateSync(v)
        return {
          isValid: true,
          valid: v,
        }
      } catch (err) {
        const { message } = err as unknown as { message: string }
        return {
          isValid: false,
          value: v,
          errorText: message,
        }
      }
    },
  }
}
