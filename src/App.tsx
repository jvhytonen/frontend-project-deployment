import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import { decrement, increment } from './features/counter/counterSlice'
import { RootState } from './store'

function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <h1>Vite + React + Toolkit + Tailwind</h1>
      <h2>Library will be build here</h2>
      <div className="card">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <span className="px-10">{count}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  )
}

export default App
