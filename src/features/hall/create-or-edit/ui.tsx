import { reflect } from '@effector/reflect'
import { Field, useField } from 'effector-forms'
import { useUnit } from 'effector-react'
import { BsPlusLg } from 'react-icons/bs'

import { Button, FormControl, IconButton, Input, Modal, Textarea } from '~shared/ui'

import * as model from './model'

export const CreateButton = () => {
  return (
    <IconButton
      onClick={() => model.createButtonClicked()}
      className="p-2 hover:bg-blue-50 transition-colors"
      aria-label="create-hall"
    >
      <BsPlusLg />
    </IconButton>
  )
}

export const EditButton = () => {
  return (
    <Button
      variant="outline"
      onClick={() => model.editButtonClicked()}
      className="w-full"
      aria-label="edit-hall"
    >
      Редактировать
    </Button>
  )
}

export const Dialog = () => {
  const action = useUnit(model.$action)
  return (
    <ControlledModal>
      <h1 className="text-center font-medium text-lg">
        {action === 'create' ? 'Создание зала' : 'Редактирование зала'}{' '}
      </h1>
      <Form />
    </ControlledModal>
  )
}

const Form = () => {
  const [action, isLoading] = useUnit([model.$action, model.$isLoading])
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col space-y-1.5">
      <FormTextField type="input" field={model.form.fields.title} label="Название" />
      <IsVipField />
      <FormTextField type="textarea" field={model.form.fields.description} label="Описание" />
      <div className="flex w-full space-x-2 mt-5">
        <Button
          isDisabled={isLoading}
          className="w-full"
          onClick={() => model.disclosure.close()}
          variant="outline"
        >
          Отмена
        </Button>
        <Button isLoading={isLoading} type="submit" className="w-full">
          {action === 'create' ? 'Создать' : 'Сохранить'}
        </Button>
      </div>
    </form>
  )
}

type FormTextFieldProps = {
  type: 'input' | 'textarea'
  field: Field<string>
  label: string
}

const FormTextField = (props: FormTextFieldProps) => {
  const field = useField(props.field)

  return (
    <FormControl label={props.label} errorText={field.errorText()} isInvalid={field.hasError()}>
      {props.type === 'input' ? (
        <Input value={field.value} onChange={(e) => field.onChange(e.currentTarget.value)} />
      ) : (
        <Textarea
          label=""
          value={field.value}
          onChange={(e) => field.onChange(e.currentTarget.value)}
        />
      )}
    </FormControl>
  )
}

const IsVipField = () => {
  const field = useField(model.form.fields.is_vip)

  return (
    <div className="flex items-center space-x-1.5">
      <input
        checked={field.value}
        onChange={(e) => field.onChange(e.currentTarget.checked)}
        id="is_vip_field"
        type="checkbox"
      />
      <label htmlFor="is_vip_field">VIP Зал</label>
    </div>
  )
}

const ControlledModal = reflect({
  view: Modal,
  bind: {
    open: model.disclosure.$isOpen,
    onClose: () => model.disclosure.close(),
    className: 'rounded flex flex-col space-y-2',
  },
})

function onSubmit(event: React.FormEvent) {
  event.preventDefault()
  model.form.submit()
}
