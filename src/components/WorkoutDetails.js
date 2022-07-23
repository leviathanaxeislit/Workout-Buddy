
import 'material-icons/iconfont/material-icons.css';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
/**
 * It's a function that deletes a workout from the database.
 */

  const handleClick = async () => {
    const response = await fetch('https://backendworkoutbuddy.herokuapp.com/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-icons" onClick={handleClick}>delete_outlined</span>
      
    </div>
  )
}

export default WorkoutDetails