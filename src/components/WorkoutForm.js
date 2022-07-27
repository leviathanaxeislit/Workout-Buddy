import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

/**
 * The WorkoutForm function is a React component that renders a form for creating a new workout. 
 * 
 * The form has three inputs: title, load, and reps. 
 * 
 * When the form is submitted, the handleSubmit function is called. 
 * 
 * The handleSubmit function makes a POST request to the backend API. 
 * 
 * If the request is successful, the new workout is added to the workouts array in the Redux store. 
 * 
 * If the request is unsuccessful, the error message is displayed. 
 * 
 * The error message is also displayed if the user tries to submit the form without filling out all of
 * the fields. 
 * 
 * The error message is displayed in a div with the class name "error". 
 * 
 * The input fields that the user did not fill out are highlighted in red. 
 * 
 * The input fields are highlighted in red by
 * @returns The WorkoutForm component is being returned.
 */
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, load, reps}
    
    const response = await fetch('https://workoutbuddybackend.onrender.com/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    /* The above code is creating a form that allows the user to input a title, load, and reps. The
    form is then submitted and the data is sent to the database. */
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm