import { useQuery , useMutation , useQueryClient } from 'react-query';
import { request } from '../utils/axios-utils'

const fetchSuperHeros = () => {
    return request({url: '/superheros'})
}

const addSuperHero = (hero) => {
  return request({url:'/superheros', method:'post', data: hero})
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

export const  useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries('super-heros')
    //   queryClient.setQueryData('super-heros', (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data , data.data]
    //     }
    //   })
    // }
    onMutate:  async (newHero) => {
      await queryClient.cancelQueries('super-heros')
      const previousHerosData = queryClient.getQueryData('super-heros')
      queryClient.setQueryData('super-heros', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data , {id: oldQueryData?.data?.length + 1, ...newHero}]
        }
      })
      return {
        previousHerosData 
      }
    },
    onError:   (_error, _hero, context) => {
      queryClient.setQueryData('super-heros', context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heros')
    }
  })
}