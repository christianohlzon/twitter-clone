import Image from 'next/image'
import { getUsers } from 'twitter/db'

export default async function User({ params }: { params: { user: string } }) {
  const users = await getUsers()
  // console.log(users)
  return (
    <div>
      <h1>User: @{params.user}</h1>
    </div>  
  )
}
