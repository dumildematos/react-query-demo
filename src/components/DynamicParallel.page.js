import { useQueries } from 'react-query'
import axios from 'axios'

const fetchSuperHeros = (heroId) => {
    return axios.get(`http://localhost:4000/superheros/${heroId}`)
}


export const DynamicParallelPage = ({heroIds}) => {

    const queryResults = useQueries(
        heroIds.map( id => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHeros(id)
            }
        })
    )
    console.log(queryResults)
  return (
    <div>DynamicParallel.page</div>
  )
}
