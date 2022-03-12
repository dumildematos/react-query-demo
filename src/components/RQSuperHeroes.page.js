import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSuperHerosData, useAddSuperHeroData } from '../hooks/useSuperHerosData'


export const RQSuperHeroesPage = () => {

  const [name , setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = (data) => {
    console.log("Perform side effect after data fecthing.", data)
  }

  const onError = (error) => {
    console.log("Perform side effect after encountering error.", error)
  }

  const { isLoading , data , isError, error , isFetching , refetch} = useSuperHerosData(onSuccess, onError)

  const { mutate: addHero } = useAddSuperHeroData()

  const handleAddHeroClick = () => {
    console.log({name, alterEgo})
    const hero = {
      name,
      alterEgo
    }
    addHero(hero)
  }

  if(isLoading || isFetching){
    return <h2>Loading...</h2>
  }

  if(isError){
    return <h2> { error.message } </h2>
  }

  return (
    <>
    <div>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
    </div>
    <button onClick={refetch}>Fetch Heros</button>
    <h2>RQ Super Heros Page</h2>
      {
        data?.data.map(hero => {
          return <div key={hero.id}> 
            <Link to={`/rq-super-heros/${hero.id}`}> {hero.name} </Link>
          </div>
        })
      }
{/* 
     { 
      data.map(heroName => {
        return <div key={heroName}> {heroName} </div>
      })
     } */}
    </>
  )
}
