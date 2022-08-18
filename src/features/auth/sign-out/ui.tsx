import * as model from './model'

export const SignOut = () => {
  return (
    <button type="button" onClick={() => model.signOutButtonClicked()}>
      Sign out
    </button>
  )
}
