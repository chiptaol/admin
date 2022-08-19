import { Field, useField } from 'effector-forms'
import { useUnit } from 'effector-react'

import { Button, FormControl, Input, Logo, PasswordInput } from '~shared/ui'

import * as model from './model'

export const SignIn = () => {
  return (
    <div className="flex flex-col space-y-5 rounded max-w-lg w-full px-6 py-8 items-center bg-slate-50 shadow-md">
      <Logo className="!text-black" />
      <Form />
    </div>
  )
}

const Form = () => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col space-y-2 mb-8">
        <FormField label="Почта" field={model.form.fields.email} />
        <FormField type="password" label="Пароль" field={model.form.fields.password} />
      </div>
      <Button isLoading={useUnit(model.$isLoading)} type="submit" className="w-full">
        Войти
      </Button>
      {import.meta.env.DEV && (
        <button
          type="button"
          onClick={() => model.form.setForm({ email: 'fbb@gmail.com', password: '300620036Fbb' })}
        >
          DEV_BUTTON
        </button>
      )}
    </form>
  )
}

type FormFieldProps = {
  label: string
  field: Field<string | null>
  type?: 'password'
}

const FormField = (props: FormFieldProps) => {
  const { value, onChange, errorText, hasError } = useField(props.field)

  if (props.type === 'password') {
    return (
      <FormControl isInvalid={hasError()} errorText={errorText()} label={props.label}>
        <PasswordInput value={value ?? ''} onChange={(e) => onChange(e.currentTarget.value)} />
      </FormControl>
    )
  }

  return (
    <FormControl isInvalid={hasError()} errorText={errorText()} label={props.label}>
      <Input value={value ?? ''} onChange={(e) => onChange(e.currentTarget.value)} />
    </FormControl>
  )
}

function onSubmit(event: React.FormEvent) {
  event.preventDefault()
  model.form.submit()
}
