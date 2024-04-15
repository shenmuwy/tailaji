import { HashRouter } from 'react-router-dom'
import  PageRoutes  from './routes'
import './App.scss'

function App() {

  return (
    <div className='root'>
      <HashRouter>
        <PageRoutes></PageRoutes>
      </HashRouter>
    </div>
  )
}

export default App
