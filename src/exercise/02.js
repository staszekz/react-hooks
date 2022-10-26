// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const {name, setName, setNameLocal} = useLocalStorage({initialName})
  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') ?? initialName,
  // )
  // 🐨 initialize the state to the value from localStorage
  React.useEffect(() => {
    // window.localStorage.setItem('name', name)
    setNameLocal()
  }, [name])

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    const {value} = event.target
    setName(value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App

const useLocalStorage = ({initialName}) => {
  const [name, setName] = React.useState(
    () => window.localStorage.getItem('name') ?? initialName,
  )

  const setNameLocal = () => window.localStorage.setItem('name', name)

  return {
    name,
    setName,
    setNameLocal,
  }
}
