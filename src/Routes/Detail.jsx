import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useDentistsState} from '../Components/utils/global.context'

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Detail = () => {
 
  // Consumiendo el parametro dinamico de la URL deberan hacer un fetch a un user en especifico
  const {state, dispatch} = useDentistsState()
  const [loading, setLoading] = useState(true)
  const {id} = useParams()
  const {name, email, phone, website} = state.dentist
  console.log(id)
  const url = 'https://jsonplaceholder.typicode.com/users/' + id

  useEffect(() => {

    axios(url)
      .then(res => {
        dispatch({type: 'GET_CHAR', payload: data})
        setLoading(false)
        })
      .catch(err => console.log(err))

}, [])

  return (
    <>
      <h1>Perfil del dentista</h1>
      {loading ? 'Cargando...' : <>
            <h1>Nombre: {name}</h1>
            <h3>Email:{email}</h3>
            <h3>Teléfono:{phone}</h3>
            <h3>Sitio web:{website}</h3>
        </>}
    </>
  )
}

export default Detail