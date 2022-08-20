export const NotFoundPage = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex space-x-2 items-center">
        <h1 className="text-6xl font-bold">404</h1>
        <div className="flex flex-col space-y-1">
          <p className="text-base font-semibold">Error!</p>
          <p className="text-sm font-medium">Page not found.</p>
        </div>
      </div>
    </div>
  )
}
