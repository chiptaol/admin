type Props = {
  children: React.ReactNode
}

export const PageContainer = (props: Props) => (
  <div className="max-w-screen-2xl w-full px-6 mx-auto py-6">{props.children}</div>
)
