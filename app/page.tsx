import { getServerSession } from 'next-auth'
import Feed from './components/Feed'


export default async function Home() {


  return (
    <div>
      <Feed />
    </div>
    
  )
}
