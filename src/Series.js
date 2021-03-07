import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Series = () => {
    
    const [data, setData] = useState([])
    useEffect(()=>{
        axios
            .get('/api/series')
            .then(res => {
                setData(res.data.data)
            })
    },[])

    const removeLinha = id => {
        axios
            .delete('/api/series/' + id)
            .then(res => {
                console.log(res)
                // const filtro = data.filter(item => item.id !== id)
                // setData(filtrado)
                setData(data.filter(item => item.id !== id))
            })
    }

    const rendereizaLinha = record => {
        return (
            <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => removeLinha(record.id)}>Remover</button>
                    &nbsp;
                    <Link to={'series/' + record.id} className='btn btn-warning'>Editar</Link>
                </td>
            </tr>
        )
    }

    if(data.length === 0){
        return(
            <div className='container'>
                <h1>Séries</h1>
                <Link to='series/novo' className='btn btn-success'>Novo</Link>
                <br /><br />
                <div className="alert alert-warning" role='alert'>
                    Você não possui séries criados.
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Séries</h1>
            <Link to='series/novo' className='btn btn-success'>Novo</Link>
            <br /><br />
            <table className='table table-dark table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                   {data.map(rendereizaLinha)}
                </tbody>
            </table>
        </div>
    )
}

export default Series