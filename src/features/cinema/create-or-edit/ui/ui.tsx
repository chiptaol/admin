import { MdOutlineAddCircle } from 'react-icons/md'
import cn from 'classnames'
import { Field, useField } from 'effector-forms'
import { reflect } from '@effector/reflect'

import { Button, FormControl, Input, Menu } from '~shared/ui'

import * as model from '../model'
import { UploadLogo } from './upload-logo'
import { Map } from './map'

export const CreateButton = () => {
  return (
    <Menu.Item>
      <div className={cn('w-full')}>
        <button
          type="button"
          onClick={() => model.createButtonClicked()}
          className="flex items-center space-x-2 px-3 py-2 transition-colors w-full hover:bg-slate-100 hover:text-black"
        >
          <MdOutlineAddCircle className="fill-blue-800" />
          <span className="text-base">Создать кинотеатр</span>
        </button>
      </div>
    </Menu.Item>
  )
}

export const Form = () => {
  return (
    <form onSubmit={onSubmit} className="max-w-4xl w-full py-4 h-full">
      <div className="flex flex-col space-y-4 w-full mb-10">
        <div className="flex items-start space-x-8 w-full">
          <LogoField />
          <div className="flex items-start flex-wrap w-full gap-2">
            <div className="flex flex-col space-y-2 max-w-xs w-full">
              <FormTextField field={model.form.fields.title} label="Название" />
              <FormTextField field={model.form.fields.phone} label="Номер телефона" />
            </div>
            <div className="flex flex-col space-y-2 max-w-xs w-full">
              <FormTextField field={model.form.fields.address} label="Адрес" />
              <FormTextField field={model.form.fields.reference_point} label="Ориентир" />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 ">
          <h4 className="text-base font-medium">Выберите локацию на карте</h4>
          <MapField />
        </div>
      </div>
      <div className="flex items-center space-x-2 max-w-[50%]">
        <CancelButton>Отмена</CancelButton>
        <SubmitButton>Сохранить</SubmitButton>
      </div>
    </form>
  )
}

const LogoField = () => {
  const { value, errorText, hasError } = useField(model.form.fields.logo)
  return (
    <div className="w-max flex flex-col space-y-1">
      <UploadLogo
        path={value}
        onDeleteClicked={() => model.deleteImageButtonClicked()}
        onLogoUploaded={(file) => model.imageUploaded(file)}
      />
      {hasError() && <span className="text-sm text-red-500">{errorText()}</span>}
    </div>
  )
}

const DEFAULT_LOCATION = [41.32847446609404, 69.24298268717716]

const MapField = () => {
  const { value, onChange, hasError, errorText } = useField(model.form.fields.coords)
  return (
    <div
      className={cn(
        'border border-transparent rounded overflow-hidden flex flex-col w-full flex-shrink-0 space-y-1',
        {
          'border-red-500': hasError(),
        }
      )}
    >
      <Map
        geometry={value}
        location={value ?? DEFAULT_LOCATION}
        onLocationSelected={(coords) => onChange(coords)}
      />
      {hasError() && <span className="text-sm text-red-500">{errorText()}</span>}
    </div>
  )
}

type FormTextFieldProps = {
  field: Field<string>
  label: string
}

const FormTextField = (props: FormTextFieldProps) => {
  const { value, onChange, hasError, errorText } = useField(props.field)

  return (
    <FormControl label={props.label} errorText={errorText()} isInvalid={hasError()}>
      <Input value={value} onChange={(e) => onChange(e.currentTarget.value)} />
    </FormControl>
  )
}

const SubmitButton = reflect({
  view: Button,
  bind: {
    type: 'submit',
    className: 'w-full',
    isLoading: model.$isLoading,
  },
})

const CancelButton = reflect({
  view: Button,
  bind: {
    className: 'w-full',
    variant: 'outline',
    isDisabled: model.$isLoading,
    onClick: () => model.cancelButtonClicked(),
  },
})

function onSubmit(event: React.FormEvent) {
  event.preventDefault()
  model.form.submit()
}
