import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { FormGroup, Label, Input } from 'reactstrap'

const NovoGenero = () => {
    const [name, setName] =  useState('')
    const [success, setSuccess] = useState(false)
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState('')

    const onChange = evt => {
        console.log(evt.target.value)
        setName(evt.target.value)
    }

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                console.log(res.data.data)
                setGenres(res.data.data)
            })
    }, [])

    const save = () => {

        axios.post('/api/series',{
            name: name,
            genre_id: genre
            //pode ser:
            //name
        }).then(res => {
            setSuccess(true)
        })
    }

    const handleSubmit = event =>{
        event.preventDefault()
    }

    const handleSelect = evt => {
        console.log(evt.target.value)
        setGenre(evt.target.value)
    }

    if(success){
      return <Redirect to='/series' />
    }

    return(
        <div className='container'>
            <h1>Nova Série</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='nome' className='form-label'>Série</label>
                <input type='text' id='nome' className='form-control' value={name}  onChange={onChange}/>
                <br />
                <FormGroup>
                    <Label htmlFor="exampleSelect">Gênero</Label>
                    <Input type="select" name="selectMulti" id="exampleSelect" onChange={handleSelect}>
                        <option></option>
                        {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                    </Input>
                </FormGroup>
                <button onClick={save} type='button' className='btn btn-primary'>Salvar</button>
                &nbsp;&nbsp;
                <Link className='btn btn-primary' to='/series'>Voltar</Link>
            </form>
        </div>
    )
}

export default NovoGenero