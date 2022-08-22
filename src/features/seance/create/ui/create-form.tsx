import dayjs from 'dayjs'
import { useList, useStoreMap, useUnit } from 'effector-react'
import { GrClose } from 'react-icons/gr'

import { Button, FormControl, IconButton, Input, Select } from '~shared/ui'

import * as model from '../model'

type FieldsProps = {
  id: string
}

export const Form = () => {
  const fields = useList(
    model.$formFields.map((fields) => Object.keys(fields)),
    (field, index) => <Field key={field} index={index} id={field} />
  )
  const [isFieldAddingAllowed, length, isLoading] = useUnit([
    model.$isFieldAddingAllowed,
    model.$fieldsAmount,
    model.$isCreateLoading,
  ])

  return (
    <div className="flex flex-col space-y-5">
      {fields}
      <div className="flex items-center space-x-2">
        {isFieldAddingAllowed && (
          <Button
            isDisabled={isLoading}
            onClick={() => model.seanceFieldAdded()}
            variant="outline"
            className="w-52"
          >
            Добавить сеанс
          </Button>
        )}
        <Button isLoading={isLoading} onClick={() => model.submitButtonClicked()} className="w-52">
          Создать сеансы ({length})
        </Button>
      </div>
    </div>
  )
}

const Field = (props: FieldsProps & { index: number }) => {
  return (
    <div className="w-full flex flex-col space-y-2">
      <h3 className="text-base font-medium">Сеанс №{props.index + 1}</h3>
      <div className="w-full flex items-end space-x-2">
        <HallField id={props.id} />
        <FormatField id={props.id} />
        <DateField id={props.id} />
        <DateTimeField id={props.id} />
        <PriceField id={props.id} />
        <IconButton
          onClick={() => model.removeField(props.id)}
          className="!p-2 hover:bg-blue-50 transition-colors"
          aria-label="remove-field"
        >
          <GrClose />
        </IconButton>
      </div>
    </div>
  )
}

const HallField = (props: FieldsProps) => {
  const value = useStoreMap({
    store: model.$formFields,
    keys: [props.id],
    fn: (fields, [index]) => fields[index]?.hall_id ?? null,
  })
  const halls = useList(model.$hallsList, (hall) => (
    <option className="px-2 py-1.5 text-sm font-medium" value={hall.id}>
      {hall.title}
      {/* {hall.is_vip && <span className="text-xs font-medium text-yellow-500" />} */}
    </option>
  ))

  return (
    <FormControl label="Выберите зал">
      <Select
        className="w-48"
        value={value ?? 'readonly'}
        onChange={(e) => model.hallSelected({ fieldId: props.id, hId: +e.currentTarget.value })}
      >
        <option value="readonly" disabled>
          Залы
        </option>
        {halls}
      </Select>
    </FormControl>
  )
}

const FormatField = (props: FieldsProps) => {
  const formats = useStoreMap({
    store: model.$formFields,
    keys: [props.id],
    fn: (fields, [id]) => fields[id]?.hallConfig.formats ?? [],
  })
  const selectedFormat = useStoreMap({
    store: model.$formFields,
    keys: [props.id],
    fn: (fields, [id]) => fields[id]?.movie_format ?? null,
  })

  return (
    <FormControl label="Выберите формат">
      <Select
        onChange={(e) => model.formatSelected({ fId: +e.currentTarget.value, fieldId: props.id })}
        className="w-48"
        value={selectedFormat ?? 'readonly'}
      >
        <option value="readonly" disabled>
          Форматы
        </option>
        {formats.map((format) => (
          <option key={format.id} value={format.id}>
            {format.title}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export const DateField = (props: FieldsProps) => {
  const date = useStoreMap({
    store: model.$formFields,
    keys: [props.id],
    fn: (fields, [id]) => fields[id]?.start_date ?? null,
  })

  return (
    <FormControl label="Выберите дату">
      <Input
        type="date"
        value={date}
        onChange={(e) => model.dateSelected({ date: e.currentTarget.value, fieldId: props.id })}
        min={dayjs().format('YYYY-MM-DD')}
        max={dayjs().add(7, 'day').format('YYYY-MM-DD')}
      />
    </FormControl>
  )
}

export const DateTimeField = (props: FieldsProps) => {
  const dateTime = useStoreMap({
    store: model.$formFields,
    keys: [props.id],
    fn: (fields, [id]) => fields[id]?.start_date_time ?? null,
  })

  return (
    <FormControl label="Выберите время">
      <Input
        type="time"
        value={dateTime}
        onChange={(e) =>
          model.dateTimeSelected({ dateTime: e.currentTarget.value, fieldId: props.id })
        }
      />
    </FormControl>
  )
}

const PriceField = (props: FieldsProps) => {
  const field = useStoreMap({
    store: model.$formFields,
    keys: [props.id],
    defaultValue: null,
    fn: (fields, [id]) => fields[id],
  })

  if (!field) return null

  return (
    <div className="w-max flex space-x-2">
      {field.hallConfig.seats.includes('standart') && <StandardSeatPriceField id={props.id} />}
      {field.hallConfig.seats.includes('vip') && <VipSeatPriceField id={props.id} />}
    </div>
  )
}

const StandardSeatPriceField = (props: FieldsProps) => {
  const price = useStoreMap({
    store: model.$formFields,
    keys: [props.id],
    fn: (fields, [id]) => fields[id]?.standard_seat_price ?? '',
  })
  return (
    <FormControl label="Стоимость обычного билета">
      <Input
        type="number"
        className="hide-input-spin-button"
        value={price}
        onChange={(e) => {
          const value = e.currentTarget.value
          if (value !== '') {
            model.standardPriceChanged({ fieldId: props.id, price: +value })
          } else {
            model.standardPriceChanged({ fieldId: props.id, price: null })
          }
        }}
      />
    </FormControl>
  )
}

const VipSeatPriceField = (props: FieldsProps) => {
  const price = useStoreMap({
    store: model.$formFields,
    keys: [props.id],
    fn: (fields, [id]) => fields[id]?.vip_seat_price ?? '',
  })
  return (
    <FormControl label="Стоимость VIP билета">
      <Input
        type="number"
        className="hide-input-spin-button"
        value={price}
        onChange={(e) => {
          const value = e.currentTarget.value
          if (value !== '') {
            model.vipPriceChanged({ fieldId: props.id, price: +value })
          } else {
            model.vipPriceChanged({ fieldId: props.id, price: null })
          }
        }}
      />
    </FormControl>
  )
}
