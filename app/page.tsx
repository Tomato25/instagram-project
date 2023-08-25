import { getServerSession } from 'next-auth'
import Feed from './components/Feed'
import { authOptions } from '@/pages/api/auth/[...nextauth]'


export default async function Home() {

  const session= await getServerSession(authOptions)
  console.log(session)

  return (
    <div>
      <Feed user={session?.user} expires={session?.expires as string}/>
    </div>
    
  )
}
