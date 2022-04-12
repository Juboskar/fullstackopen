import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = (props) => {
  return (
    < div >
      filter shown with: <input value={props.newFilterValue} onChange={props.handleNewFilter} />
    </div >
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNewName} />
      </div>
      <div>
        number: <input value={props.newPhone} onChange={props.handleNewPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map(p =>
        <p key={p.name}>{p.name} {p.number}</p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilterValue, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhone
    }

    if (persons.map(p => p.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
        personService.create(personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewPhone('')
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(p => p.name.includes(newFilterValue))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilterValue={newFilterValue} handleNewFilter={handleNewFilter} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App