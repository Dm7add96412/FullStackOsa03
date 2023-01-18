const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('post-body', function (req, res) { 
    return JSON.stringify({Name: req.body.name,
    Number: req.body.number}) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'))

app.get('/', (req, res) => {
    res.send('<h2>Hello World!</h2>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people<br>
    ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
})

/*
app.post('/api/persons', (request, response) => {
    if (!request.body.name || !request.body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.some(person => person.name === request.body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    while (persons.some(person => Number(person.id) === geid)) {
        geid = generateID()
    }
    
    const person = {
        name: request.body.name,
        number: request.body.number,
        id: geid
    }
  
    persons = persons.concat(person)
    response.json(person)
  }) */

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        console.log(body.content)
        return response.status(400).json({ error: 'content missing' })     
    }

    const person = new Person({
        name: body.name,
        number: body.number 
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})