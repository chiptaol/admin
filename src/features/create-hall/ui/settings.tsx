import { useStore, useStoreMap } from 'effector-react'

import { FormControl, InputNumber } from '~shared/ui'

import * as model from '../model'

export const Settings = () => {
  return (
    <div className="flex flex-col max-w-sm w-full rounded border border-gray-200 shadow-md space-y-3 px-4 py-6">
      <h3>{'create_hall'}</h3>
      <form className="flex flex-col space-y-2">
        <RowsAmount />
        <hr className="w-full border-gray-200 !my-4" />
        <SelectRowToConfigure />
        <hr className="w-full border-gray-200 !my-3" />
        <RowSettings />
      </form>
    </div>
  )
}

const RowsAmount = () => {
  const rowsAmount = useStore(model.$rowsAmount)

  return (
    <FormControl label="rows_amount">
      <InputNumber
        limit={10}
        value={rowsAmount}
        onIncrement={() => model.rowsAmount.increment()}
        onDecrement={() => model.rowsAmount.decrement()}
      />
    </FormControl>
  )
}

const SelectRowToConfigure = () => {
  const rowsList = useStore(model.$rowsList)
  const configuringRow = useStore(model.$activeRow)

  return (
    <select
      className="h-8 border border-gray-300 text-sm text-black bg-slate-100 px-2 rounded"
      onChange={onSelectChange}
      value={configuringRow ?? ''}
    >
      {rowsList.map((row) => (
        <option value={row} key={row}>
          row_№{row}
        </option>
      ))}
    </select>
  )
}

const RowSettings = () => {
  const activeRow = useStore(model.$activeRow)

  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-base">row_#{activeRow}</h4>
      <SeatsAmount />
    </div>
  )
}

const SeatsAmount = () => {
  const seatsAmount = useStoreMap(
    model.$activeRowsSettings,
    (settings) => Object.keys(settings.seats).length
  )
  return (
    <FormControl label="seats_amount">
      <InputNumber
        limit={30}
        value={seatsAmount || ''}
        onChange={onInputChange}
        onIncrement={() => model.seatsAmountChanged(seatsAmount + 1)}
        onDecrement={() => model.seatsAmountChanged(seatsAmount - 1)}
      />
    </FormControl>
  )
}

function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
  const { value } = event.currentTarget
  model.activeRowChanged(+value)
}

function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
  const { value } = event.currentTarget
  model.seatsAmountChanged(+value)
}
