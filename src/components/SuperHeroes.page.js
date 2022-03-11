import {useState, useEffect} from 'react'
import axios from 'axios'

export const SuperHeroesPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/superheros').then((res) => {
      setData(res.data);
      setIsLoading(false);
    })
  }, []);

  if(isLoading){
    return <h2> Loading </h2>
  }

  return (
    <>
      <h2>Super Heros</h2>
      {
        data.map(hero => {
          return <div key={hero.id}> {hero.name} </div>
        })
      }
    </>
  )
}
