import React from "react";
import { Link } from 'react-router-dom'
import {useDentistsState} from './utils/global.context'

const Card = ({dentist}) => {

  const {dispatch} = useDentistsState()

  const addFav = () => {
      dispatch({type: 'ADD_FAV', payload: dentist})
  }

  return (
    <div className="card">        
        {/* Ademas deberan integrar la logica para guardar cada Card en el localStorage */}
        <Link to={'/detail/' + dentist.id}>
          <div className="card" style="width:18rem;">
            <div>
              <img src="./images/dentista.png" className="card-img-top" alt="dentista"/>
            </div>
            <div className="card-body">
              <h5 className="card-title">${dentist.name}-${dentist.userName}</h5>
              <p className="card-text">ID: ${dentist.id}</p>           
            </div>
          </div>
        </Link>
        <button className="favButton" onClick={addFav}>❤</button>
    </div>
  );
};

export default Card;
