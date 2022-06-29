import { useState, useEffect } from 'react'
import axios from 'axios'

// Form for entering desired filter text
// No submit button, filter is applied as keys are typed
const FilterForm = ({ newFilter, handleFilterChange }) => {
    return (
        <div>
            filter shown with <input value={newFilter} onChange={handleFilterChange} />
        </div>
    )
}

// Form for entering new person entry with name and number
// Text inputs save values with event handlers, then addEntry() is called
// to create person object and add to persons[] array
const PersonForm = ({
    addEntry,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
    }) => {
    return (
        <form onSubmit={addEntry}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

// Displays phonebook entries with conditional filter
const DisplayFull = ({ newFilter, persons }) => {
    if (newFilter.length === 0) { // If no filter provided, displays entire phonebook
        return <DisplayPerson persons={persons} />
    }
    else {
        // converts newFilter and person.name values to lower case
        // uses filter() to return a new array of only entries where name.includes(newFilter)
        let filteredArray = persons.filter(person => {
            return person.name.toLowerCase().includes(newFilter.toLowerCase())
        })
        return <DisplayPerson persons={filteredArray} />
    }
}

// Returns new array of only name and number values in html tags for displaying phone book
const DisplayPerson = ({ persons }) => {
    let output = persons.map((person, i) =>
        <div key={i}>{person.name} {person.number}</div>
    )
    return output
}

const App = () => {
    const [persons, setPersons] = useState([]) // Getting persons array from db.json file
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    // using axios effect hook to retrieve initial state (persons[]) from db.json file
    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'persons')

    const addEntry = (event) => {
        event.preventDefault()
        // Creates new array of only name values for search purposes
        const names = persons.map(person => person.name)
        // Checks if newName already exists in array
        if (names.includes(newName)) {
            // alert if name already exists (using backtick for template string)
            alert(`${newName} is already added to phonebook`)
        }
        else {
            // else creates new object with name and number values
            // concats to persons[] array, clears forms
            const personObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    // Event handlers for name, number and filter values
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <FilterForm 
                newFilter={newFilter} 
                handleFilterChange={handleFilterChange} 
            />
            <h2>Add a new</h2>
            <PersonForm
                addEntry={addEntry}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <DisplayFull 
                newFilter={newFilter} 
                persons={persons} 
            />
        </div>
    )
}

export default App