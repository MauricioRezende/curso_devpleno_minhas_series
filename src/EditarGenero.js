import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditarGenero = (props) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    const edit = () => {
        axios.put('/api/genres/' + props.match.params.id,{
            name: name
        }).then(res => {
            setSuccess(true)
        })
    }

    const onChange = evt => {
        setName(evt.target.value)
    }

    const handleSubmit = event =>{
        event.preventDefault()
    }
    
    useEffect(() => {
        axios
            .get('/api/genres/' + props.match.params.id)
            .then(res => {
                setName(res.data.name)
            })
    },[props.match.params.id])

    if(success){
        return <Redirect to='/generos' />
    }
    
    return(
        <div className='container'>
            <h1>Editar gênero - id {props.id}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='nome' className='form-label'>Gênero</label>
                <input type='text' id='nome' className='form-control' value={name}  onChange={onChange}/>
                <br />
                <button onClick={edit} type='button' className='btn btn-primary'>Salvar</button>
            </form>
        </div>
    )
}

export default EditarGenero