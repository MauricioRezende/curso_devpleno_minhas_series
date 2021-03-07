import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Generos = () => {
    
    const [data, setData] = useState([])
    useEffect(()=>{
        axios
            .get('/api/genres')
            .then(res => {
                setData(res.data.data)
            })
    },[])

    const removeLinha = id => {
        axios
            .delete('/api/genres/' + id)
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
                    <Link to={'generos/' + record.id} className='btn btn-warning'>Editar</Link>
                </td>
            </tr>
        )
    }

    if(data.length === 0){
        return(
            <div className='container'>
                <h1>Generos</h1>
                <Link to='generos/novo' className='btn btn-success'>Novo</Link>
                <br /><br />
                <div className="alert alert-warning" role='alert'>
                    Você não possui genêros criados.
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Gêneros</h1>
            <Link to='generos/novo' className='btn btn-success'>Novo</Link>
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

export default Generos