import {useSuperHerosData} from '../hooks/useSuperHerosData'


export const RQSuperHeroesPage = () => {

  const onSuccess = (data) => {
    console.log("Perform side effect after data fecthing.", data)
  }

  const onError = (error) => {
    console.log("Perform side effect after encountering error.", error)
  }

  const { isLoading , data , isError, error , isFetching , refetch} = useSuperHerosData(onSuccess, onError)

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
      {/* {
        data?.data.map(hero => {
          return <div key={hero.id}> {hero.name} </div>
        })
      } */}

     { 
      data.map(heroName => {
        return <div key={heroName}> {heroName} </div>
      })
     }
    </>
  )
}
