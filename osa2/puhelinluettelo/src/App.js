import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  const messageColor = error ? 'red' : 'green'

  const messageStyle = {
    color: messageColor,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

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
        <div key={p.name}>
          <p>{p.name} {p.number}</p>
          <button onClick={() => props.del(p.id, p.name)}>delete</button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilterValue, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const getPersons = () => {
    console.log('effect')
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }

  useEffect(getPersons, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhone
    }

    if (persons.map(p => p.name).includes(newName)) {
      const id = persons.filter(item => item.name === newName)[0].id
      personService.update(id, personObject)
        .then(response => {
          setPersons(persons.map(p => p.id !== id ? p : response.data))
          setMessage('Edited ' + newName)
        })
    }
    else {
      personService.create(personObject)
        .then(response => {
          console.log(response)
          personObject.id = persons.length + 1
          setPersons(persons.concat(personObject))
          setMessage('Added ' + newName)
        })
    }
    setNewName('')
    setNewPhone('')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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

  const deletePerson = (id, name) => {
    if (window.confirm('Delete ' + name)) {
      personService.delete(id).then(() => {
        setPersons(persons.filter(item => item.id !== id))
        setMessage('Deleted ' + name)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch(error => {
        setError(true)
        setMessage(
          `Information of '${name}' was already removed from server`
        )
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 5000)
      })
    }
  }

  const personsToShow = persons.filter(p => p.name.includes(newFilterValue))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter newFilterValue={newFilterValue} handleNewFilter={handleNewFilter} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} del={deletePerson} />
    </div>
  )

}

export default App