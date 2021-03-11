import React, { useState } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

const NovoGenero = () => {
    const [name, setName] =  useState('')
    const [success, setSuccess] = useState(false)
    const onChange = evt => {
        console.log(evt.target.value)
        setName(evt.target.value)
    }

    const save = () => {

        axios.post('/api/genres',{
            name: name
            //pode ser:
            //name
        }).then(res => {
            setSuccess(true)
        })
    }

    const handleSubmit = event =>{
        event.preventDefault()
    }

    if(success){
      return <Redirect to='/generos' />
    }

    return(
        <div className='container'>
            <h1>Novo Gênero</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='nome' className='form-label'>Gênero</label>
                <input type='text' id='nome' className='form-control' value={name}  onChange={onChange}/>
                <br />
                <button onClick={save} type='button' className='btn btn-primary'>Salvar</button>
                &nbsp;&nbsp;
                <Link className='btn btn-primary' to='/generos'>Voltar</Link>
            </form>
        </div>
    )
}

export default NovoGenero