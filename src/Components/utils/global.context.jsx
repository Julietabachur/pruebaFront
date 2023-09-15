import { createContext, useEffect, useReducer, useContext, useState } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const ContextGlobal = createContext();

// const initialStateTheme = { theme: "light", data: [] };

const reducer = (state, action) => {
  switch (action.type) {
      case 'GET_DENTISTS':
          return {...state, dentists: action.payload}
      case 'GET_DENTIST':
          return {...state, dentist: action.payload}
      case 'ADD_FAV':
          return {...state, favs: [...state.favs, action.payload]}
      case 'SWITCH_THEME':
          return {...state, theme: !state.theme}
      default:
          throw new Error()
  }
}

const localFavs = JSON.parse(localStorage.getItem('favs'))
const initialFavState = localFavs ? localFavs : []

const initialState = {
    dentists: [],
    dentist: {},
    favs: initialFavState,
    theme: true,
}

export const ContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(reducer, initialState)

    const url = 'https://jsonplaceholder.typicode.com/users'
   
    useEffect(() => {
      axios(url)
      .then(res => {
          console.log(res.data)
          dispatch({type: 'GET_DENTISTS', payload: res.data})})
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(state.favs))
}, [state.favs]) 

  return (
    <ContextGlobal.Provider value={{dispatch, state}}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider

export const useDentistsState = () => useContext(ContextGlobal)
