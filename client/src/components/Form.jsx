import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
const Form = () => {
    const navigate = useNavigate()
    const [pirate, setPirate] = useState({
        name: "",
        image: "",
        treasure: 0,
        catchPhrases: "",
        position: "",
        pegLeg: true,
        eyePatch: true,
        hookHand: true
    })
    const [errors, setErrors] = useState([])
    const [captains, setCaptains] = useState([])
    const [potentialCaptain, setPotentialCaptain] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        setPotentialCaptain(captains.filter(captain => captain.position == "Captain"))
            axios.post('http://localhost:8000/api/users', pirate)
                .then(res => {
                    navigate('/pirates')
                })
                .catch(err => {
                    console.log(err.response.data)
                    const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                    const errorArr = []; // Define a temp error array to push the messages in
                    for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                        errorArr.push(errorResponse[key].message)
                    }
                    console.log(errorArr)
                    // Set Errors
                    setErrors(errorArr);
                })
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                setCaptains(res.data.users)
                setPotentialCaptain(captains.filter(captain => captain.position == "Captain"))
            })
    }, [])

    return (
        <div className='form-container'>
            <div className='header'>
                <h1>Add Pirate</h1>
                <Link to="/pirates" className='link view create'>Crew Board</Link>
            </div>
            {errors.map((err, index) => <p style={{ color: "red" }} key={index}>{err}</p>)}
            <form onSubmit={(e) => handleSubmit(e)} className="form-itself">
                <div className="left-form">
                    <div className='form-box'>
                        {/* Name */}
                        <div className='input-box'>
                            <label>Pirate Name: </label><br />
                            <input
                                type="text"
                                value={pirate?.name}
                                onChange={e => setPirate({ ...pirate, name: e.target.value })}
                            />
                        </div>

                        {/* Image */}
                        <div className='input-box'>
                            <label>Image URL: </label><br />
                            <input
                                type="text"
                                value={pirate?.image}
                                onChange={e => setPirate({ ...pirate, image: e.target.value })}
                            />
                        </div>

                        {/* # of Treasure Chests */}
                        <div className='input-box'>
                            <label># of Treasure Chests: </label><br />
                            <input
                                type="number"
                                value={pirate?.treasure}
                                onChange={e => setPirate({ ...pirate, treasure: e.target.value })}
                            />
                        </div>

                        {/* Pirate Catch Phrases */}
                        <div className='input-box'>
                            <label>Pirate Catch Phrases: </label><br />
                            <input
                                type="text"
                                value={pirate?.catchPhrases}
                                onChange={e => setPirate({ ...pirate, catchPhrases: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="right-form">
                    <div className="input-box">
                        <label>Crew Position</label><br />
                        <select value={pirate.position} onChange={e => setPirate({ ...pirate, position: e.target.value })}>
                            <option value=""></option>
                            <option value="First Mate">First Mate</option>
                            <option value="Captain">Captain</option>
                            <option value="Quarter Master">Quarter Master</option>
                            <option value="Boatswain">Boatswain</option>
                            <option value="Powder Monkey">Powder Monkey</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <div>
                            <input type="checkbox" className='check-box' checked={pirate.pegLeg} onChange={e => setPirate({ ...pirate, pegLeg: pirate.pegLeg === true ? false : true })} />
                            <label>Peg Leg</label>
                        </div>
                        <div>
                            <input type="checkbox" className='check-box' checked={pirate.eyePatch} onChange={e => setPirate({ ...pirate, eyePatch: pirate.eyePatch === true ? false : true })} />
                            <label>Eye Patch</label>
                        </div>
                        <div>
                            <input type="checkbox" className='check-box' checked={pirate.hookHand} onChange={e => setPirate({ ...pirate, hookHand: pirate.hookHand === true ? false : true })} />
                            <label>Hook Hand</label>
                        </div>
                    </div>
                    <div>
                        <button>Add Pirate</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form