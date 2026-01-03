const JoinInfo = ({ workspaceName }: { workspaceName: string }) => {
  return (
    <div className='flex flex-col gap-y-2 items-center justify-center'>
      <h1 className='text-2xl font-bold'>Join</h1>
      <h2 className='text-xl font-semibold break-all'>{workspaceName}</h2>
      <p className='text-md text-muted-foreground'>Enter the workspace code to join</p>
    </div>
  )
}

export default JoinInfo
