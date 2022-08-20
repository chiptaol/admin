import { useList, useStore, useStoreMap, useUnit } from 'effector-react'

import { Button, FormControl, InputNumber } from '~shared/ui'

import * as model from '../model'

export const Settings = () => {
  return (
    <div className="flex flex-col flex-1 max-w-sm w-full self-start rounded border border-gray-200 shadow-md space-y-3 px-4 py-6">
      <h3 className="text-xl">Схема зала</h3>
      <div className="flex flex-col space-y-2">
        <RowsAmount />
        <hr className="w-full border-gray-200 !my-3" />
        <SelectRowToConfigure />
        <hr className="w-full border-gray-200 !my-2" />
        <RowSettings />
        <Button
          isDisabled={!useUnit(model.$isRowsAmountSelected)}
          className="w-full"
          onClick={() => model.submitButtonClicked()}
        >
          Сохранить схему
        </Button>
      </div>
    </div>
  )
}

const RowsAmount = () => {
  const rowsAmount = useStore(model.$rowsAmount)

  return (
    <FormControl label="Количество рядов">
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
  const [isSelected, configuringRow] = useUnit([model.$isRowsAmountSelected, model.$activeRow])
  const list = useList(model.$rowsList, (row) => (
    <option value={row} key={row}>
      Ряд №{row}
    </option>
  ))

  return (
    <div className="flex flex-col space-y-2">
      <h5 className="text-sm">Выберите ряд чтобы настроить</h5>
      <select
        disabled={!isSelected}
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
  const [activeRow, isSelected] = useUnit([model.$activeRow, model.$isRowsAmountSelected])

  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-lg">Ряд №{activeRow}</h4>
      <div className="flex space-x-5 items-end">
        <SeatsAmount isDisabled={!isSelected} />
        <RowIsVip isDisabled={!isSelected} />
      </div>
      <RowHorizontalMovement />
      <RowVerticalMovement />
    </div>
  )
}

const SeatsAmount = (props: { isDisabled: boolean }) => {
  const seatsAmount = useStoreMap(
    model.$activeRowsSettings,
    (settings) => Object.keys(settings.seats).length
  )
  return (
    <FormControl label="Количество сидений">
      <InputNumber
        isDisabled={props.isDisabled}
        limit={30}
        value={seatsAmount || ''}
        onChange={onInputChange}
        onIncrement={() => model.seatsAmountChanged(seatsAmount + 1)}
        onDecrement={() => model.seatsAmountChanged(seatsAmount - 1)}
      />
    </FormControl>
  )
}

const RowIsVip = (props: { isDisabled: boolean }) => {
  const isVip = useStoreMap(model.$activeRowsSettings, (settings) =>
    Object.values(settings.seats).every((seat) => seat.isVip)
  )

  return (
    <div className="flex items-center space-x-1">
      <input
        className="w-4 h-4"
        id="is_vip"
        disabled={props.isDisabled}
        type="checkbox"
        checked={isVip}
        onChange={(e) => model.rowVipChanged(e.currentTarget.checked)}
      />
      <label htmlFor="is_vip" className="text-sm">
        VIP Ряд
      </label>
    </div>
  )
}

const RowHorizontalMovement = () => {
  const isSelected = useUnit(model.$isRowsAmountSelected)
  return (
    <div className="flex flex-col space-y-1">
      <h4 className="text-base">Перемещение ряда по горизонтали</h4>
      <div className="flex items-center space-x-0 rounded border border-gray-200 text-sm bg-slate-50">
        <button
          disabled={!isSelected}
          type="button"
          onClick={() => model.rowMovedHorizontallyToLeft()}
          className="flex justify-center items-center w-full h-10 border"
        >
          Левее
        </button>
        <button
          disabled={!isSelected}
          type="button"
          onClick={() => model.rowMovedHorizontallyToCenter()}
          className="flex justify-center items-center w-full h-10 border"
        >
          В центр
        </button>
        <button
          disabled={!isSelected}
          type="button"
          onClick={() => model.rowMovedHorizontallyToRight()}
          className="flex justify-center items-center w-full h-10 border"
        >
          Правее
        </button>
      </div>
    </div>
  )
}

const RowVerticalMovement = () => {
  const isSelected = useUnit(model.$isRowsAmountSelected)
  return (
    <div className="flex flex-col space-y-1">
      <h4 className="text-base">Перемещение ряда по вертикали</h4>
      <div className="flex items-center space-x-0 rounded border border-gray-200 text-sm bg-slate-50">
        <button
          disabled={!isSelected}
          type="button"
          onClick={() => model.rowMovedVerticallyToUp()}
          className="flex justify-center items-center w-full h-10 border"
        >
          Выше
        </button>
        <button
          disabled={!isSelected}
          type="button"
          onClick={() => model.rowMovedVerticallyToBottom()}
          className="flex justify-center items-center w-full h-10 border"
        >
          Ниже
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
