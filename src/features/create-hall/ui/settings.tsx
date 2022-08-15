import { useStore } from 'effector-react'

import { FormControl, InputNumber } from '~shared/ui'

import * as model from '../model'

export const Settings = () => {
  return (
    <div className="flex flex-col max-w-sm w-full rounded border border-gray-200 shadow-md space-y-3 px-4 py-6">
      <h3>{'create_hall'}</h3>
      <form className="flex flex-col space-y-2">
        <RowsAmount />
      </form>
    </div>
  )
}

const RowsAmount = () => {
  const rowsAmount = useStore(model.$rowsAmount)

  return (
    <FormControl label="rows_amount">
      <InputNumber
        value={rowsAmount}
        onIncrement={() => model.rowsAmount.increment()}
        onDecrement={() => model.rowsAmount.decrement()}
      />
    </FormControl>
  )
}
