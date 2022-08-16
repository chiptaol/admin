import { Field, useField } from 'effector-forms'
import { Button, FormControl, Input } from '~shared/ui'

import * as model from './model'

export const SignIn = () => {
  return (
    <div className="flex flex-col space-y-5 rounded max-w-lg w-full px-6 py-8 items-center bg-slate-50 shadow-md">
      <h4 className="text-lg font-semibold">Login</h4>
      <Form />
    </div>
  )
}

const Form = () => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col space-y-2 mb-8">
        <FormField label="email" field={model.form.fields.email} />
        <FormField label="password" field={model.form.fields.password} />
      </div>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  )
}

type FormFieldProps = {
  label: string
  field: Field<string | null>
}

const FormField = (props: FormFieldProps) => {
  const { value, onChange, errorText, hasError } = useField(props.field)

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
