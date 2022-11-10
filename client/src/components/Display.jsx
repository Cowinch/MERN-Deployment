import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const Display = () => {
    const [pirates, setPirates] = useState([])
    const handleDelete = (pirateId) => {
        axios.delete(`http://localhost:8000/api/users/${pirateId}`)
            .then(res => {
                setPirates(pirates.filter(pirate => pirate._id !== pirateId))

            })
            .catch(err => console.log("ERROR RIPPERONI " + err))
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                setPirates(res.data.users)
            })
            .catch(err => console.log("ERROR RIPPERONI " + err))
    }, [])

    return (
        <div>
            <div className='header'>
                <h1>Pirate Crew</h1>
                <Link to="/pirates/new" className='link view create'>Add Pirate</Link>
            </div>
            <div>
                {
                    pirates.map((pirate, i) => {
                        return (
                            <ul key={pirate._id} className="listed-pirate">
                                <div className="left">
                                    <img className='display-image' src={pirate.image} alt="" />
                                </div>
                                <div className="right">
                                    <div className="top">
                                        <h4>{pirate.name}</h4>
                                    </div>
                                    <div className="bottom">
                                        <Link className='link view' to={`/pirates/${pirate._id}`}>View Pirate</Link>
                                        <button className='link deleto' onClick={(e) => handleDelete(pirate._id)}>Walk the Plank</button>
                                    </div>
                                </div>
                            </ul>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Display