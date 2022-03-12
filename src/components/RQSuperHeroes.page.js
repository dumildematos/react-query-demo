import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeros = () => {
  return axios.get('http://localhost:4000/superheros')
}

export const RQSuperHeroesPage = () => {

  const { isLoading , data , isError, error , isFetching , refetch} = useQuery(
    'super-heros', 
    fetchSuperHeros,
    {
      // cacheTime: 5000, (5min is the default value)
      // staleTime: 30000, 0 is defult value
      // refetchOnMount: true, default value (true)
      // refetchOnWindowFocus: true default value (true)
      // refetchInterval: 2000, false is the default value
      // refetchIntervalInBackground: true,  false is the default value
      enabled: false
    }
  )

  console.log({ isLoading, isFetching })

  if(isLoading || isFetching){
    return <h2>Loading...</h2>
  }

  if(isError){
    return <h2> { error.message } </h2>
  }

  return (
    <>
    <button onClick={refetch}>Fetch Heros</button>
    <h2>RQ Super Heros Page</h2>
      {
        data?.data.map(hero => {
          return <div key={hero.id}> {hero.name} </div>
        })
      }
    </>
  )
}
