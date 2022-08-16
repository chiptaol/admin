import { useList, useStore, useStoreMap } from 'effector-react'

import { FormControl, InputNumber } from '~shared/ui'

import * as model from '../model'

export const Settings = () => {
  return (
    <div className="flex flex-col flex-1 max-w-sm w-full self-start rounded border border-gray-200 shadow-md space-y-3 px-4 py-6">
      <h3 className="text-xl">{'create_hall'}</h3>
      <form className="flex flex-col space-y-2">
        <RowsAmount />
        <hr className="w-full border-gray-200 !my-3" />
        <SelectRowToConfigure />
        <hr className="w-full border-gray-200 !my-2" />
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
  const configuringRow = useStore(model.$activeRow)

  const list = useList(model.$rowsList, (row) => (
    <option value={row} key={row}>
      row_№{row}
    </option>
  ))

  return (
    <div className="flex flex-col space-y-2">
      <h5 className="text-sm">select_row_to_configure</h5>
      <select
        className="h-8 border border-gray-300 text-sm text-black bg-slate-100 px-2 rounded"
        onChange={onSelectChange}
        value={configuringRow ?? ''}
      >
        {list}
      </select>
    </div>
  )
}

const RowSettings = () => {
  const activeRow = useStore(model.$activeRow)

  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-lg">row_#{activeRow}</h4>
      <div className="flex space-x-5 items-end">
        <SeatsAmount />
        <RowIsVip />
      </div>
      <RowHorizontalMovement />
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

const RowIsVip = () => {
  const isVip = useStoreMap(model.$activeRowsSettings, (settings) =>
    Object.values(settings.seats).every((seat) => seat.isVip)
  )

  return (
    <label className="flex space-x-1 items-center">
      <span className="text-sm">is_vip</span>
      <input type="checkbox" checked={isVip} onChange={() => model.rowVipChanged()} />
    </label>
  )
}

const RowHorizontalMovement = () => {
  return (
    <div className="flex flex-col space-y-1">
      <h4 className="text-base">row_horizontal_position</h4>
      <div className="flex items-center space-x-0 rounded border border-gray-200 text-sm bg-slate-50">
        <button
          type="button"
          onClick={() => model.rowMovedHorizontallyToLeft()}
          className="flex justify-center items-center w-full h-10 border"
        >
          to_left
        </button>
        <button
          type="button"
          onClick={() => model.rowMovedHorizontallyToCenter()}
          className="flex justify-center items-center w-full h-10 border"
        >
          to_center
        </button>
        <button
          type="button"
          onClick={() => model.rowMovedHorizontallyToRight()}
          className="flex justify-center items-center w-full h-10 border"
        >
          to_right
        </button>
      </div>
    </div>
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
