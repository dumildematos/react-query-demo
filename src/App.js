
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClientProvider , QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { RQSuperHeroPage } from './components/RQSuperHero.page' 
import { ParallelQueriesPage } from './components/ParallelQueries.page'
import { DynamicParallelPage  } from './components/DynamicParallel.page'
import { DependentQueriesPage } from './components/DependentQueries.page'
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heros'>RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path='/rq-dependent' element={<DependentQueriesPage email='john.doe@mailinator.com' />} />
          <Route exact path='/rq-dynamic-parallel' element={<DynamicParallelPage heroIds={[1,3]} />} />
          <Route exact path='/rq-parallel' element={<ParallelQueriesPage />} />
          <Route exact path='/super-heroes' element={<SuperHeroesPage />} />
          <Route exact path='/rq-super-heros' element={<RQSuperHeroesPage />} />
          <Route exact path="/rq-super-heros/:heroId" element={<RQSuperHeroPage />} />
          <Route exact path='/' element={ <HomePage />} />
        </Routes>
      </div>
    </Router>
    <ReactQueryDevtools initialisOpen={false} position='bottom-right' />
  </QueryClientProvider>

  );
}

export default App;
