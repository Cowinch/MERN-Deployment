import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
const ShowOne = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [pirate, setPirate] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                setPirate(res.data.user)
            })
            .catch(err => {
                console.log("ERROR RIPPERONI " + err)
            })
    }, [])

    return (
        <div>
            <div className='header'>
                <h1>{pirate?.name}</h1>
                <Link to="/pirates" className='link view create'>Crew Board</Link>
            </div>
            <div className="display-info">
                <div className="display-left">
                    <img className='one-image' src={pirate?.image} alt="pirate" />
                    <h3>{pirate?.catchPhrases}</h3>
                </div>
                <div className="display-right">
                    <h3>About</h3>
                    <p>Position: {pirate?.position}</p>
                    <p>Treasure: {pirate?.treasure}</p>
                    <p>Peg Leg: {pirate?.pegLeg ? "yes" : "no"}</p>
                    <p>Eye patch: {pirate?.eyePatch ? "yes" : "no"}</p>
                    <p>Hook Hand: {pirate?.hookHand ? "yes" : "no"}</p>
                </div>
            </div>
        </div>
    )
}

export default ShowOne