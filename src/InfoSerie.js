import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const NovoGenero = (props) => {
    const [form, setForm] =  useState({})
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({})
    const [mode, setMode] = useState('INFO')
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
    }, [data])

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

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
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
      return <Redirect to='/series' />
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
                                    {form.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                                    {form.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
                                    <br />
                                    Gênero: {data.genre}
                                    {/* 
                                    Tem uma versão do servidor que o nome desse campo é "genre_name"
                                    Gênero: {data.genre_name}
                                    */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container'>
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
                        <select onChange={onChange('genre_id')} value={form.genre_id} >
                            {genres.map( genre => <option key={genre.id} value={genre.id} >{genre.name}</option>)}
                        </select>
                        <br /><br />
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' value='ASSISTIDO' id='assistido' onChange={seleciona('ASSISTIDO')} checked={form.status === 'ASSISTIDO'}/>
                            <label className='form-check-label' htmlFor='assistido'>
                                Assistido
                            </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' value='PARA_ASSISTIR' id='paraAssistir' onChange={seleciona('PARA_ASSISTIR')} checked={form.status === 'PARA_ASSISTIR'}/>
                            <label className='form-check-label' htmlFor='paraAssistir'>
                                Para assistir
                            </label>
                        </div>
                        <button onClick={save} type='button' className='btn btn-primary'>Salvar</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default NovoGenero