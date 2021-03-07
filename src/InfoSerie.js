import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const NovoGenero = (props) => {
    const [form, setForm] =  useState({})
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({})
    const [mode, setMode] = useState('EDIT')
    const [genres, setGenres] = useState([])

    useEffect(() => {
        axios
            .get('/api/series/' +  props.match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
    }, [props.match.params.id])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
            })
    }, [])

    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const save = () => {
        console.log("clicou")
        axios.put('/api/series/' +  props.match.params.id,
            form
        ).then(res => {
            setSuccess(true)
        })
    }

    const handleSubmit = event =>{
        event.preventDefault()
    }

    if(success){
      //return <Redirect to='/series' />
    }

    return(
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{background: 'rgba(0,0,0,0.7)'}}>
                    <div className='h-100 container '>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img src={data.poster} className='img-fluid img-thumbnail' alt={data.name}/>
                            </div>
                            <div className='col-9'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    <Badge color='success'>Assistido</Badge>
                                    <Badge color='warning'>Para assistir</Badge>
                                    <br />
                                    Gênero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {JSON.stringify(form)}
            <div>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            {mode === 'EDIT' && 
                <div className='container'>
                    <h1>Editar Série</h1>
                    <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar</button>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='nome' className='form-label'>Série</label>
                        <input type='text' id='nome' className='form-control' value={form.name}  onChange={onChange('name')}/>
                        <br />
                        <label htmlFor='comments' className='form-label'>Comentário</label>
                        <input type='text' id='comments' className='form-control' value={form.comments}  onChange={onChange('comments')}/>
                        <br />
                        <label htmlFor='comments' className='form-label'>Gênero</label>
                        <br />
                        <select onChange={onChange('genre_id')}>
                            {genres.map( genre => <option key={genre.id} value={genre.id} selected={genre.id === form.genre_id}>{genre.name}</option>)}
                        </select>
                        <br /><br />
                        <button onClick={save} type='button' className='btn btn-primary'>Salvar</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default NovoGenero