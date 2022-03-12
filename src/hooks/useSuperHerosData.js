import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeros = () => {
    return axios.get('http://localhost:4000/superheros')
  }

export const useSuperHerosData = (onSuccess, onError) => {
    return useQuery(
        'super-heros', 
        fetchSuperHeros,
        {
          // cacheTime: 5000, (5min is the default value)
          // staleTime: 30000, 0 is defult value
          // refetchOnMount: true, default value (true)
          // refetchOnWindowFocus: true default value (true)
          // refetchInterval: 2000, false is the default value
          // refetchIntervalInBackground: true,  false is the default value
          // enabled: false, disabe react query 
          onSuccess,
          onError,
          // select: (data) => {
          //   const superHerosName = data.data.map(hero => hero.name)
          //   return superHerosName;
          // }
    
        }
      )
}