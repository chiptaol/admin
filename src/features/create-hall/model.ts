import { createApi, createEvent, createStore } from 'effector'

export const $rowsAmount = createStore(0)
export const $hallWidth = createStore(600)

export const rowsAmount = createApi($rowsAmount, {
  increment: (amount) => amount + 1,
  decrement: (amount) => amount - 1,
})
