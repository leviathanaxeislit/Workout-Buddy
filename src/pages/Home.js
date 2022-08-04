/* Importing the useEffect hook from the react library and the useWorkoutsContext hook from the
useWorkoutsContext file. */
import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

/* Importing the components from the components folder. */
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const {user} = useAuthContext()
  /**
   * It fetches the workouts from the backend and sets the state of the workouts.
   */
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://workoutbuddybackend.onrender.com/api/workouts', {
        headers: {'Authorisation': `Bearer ${user.token}`},
      })
      
      
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])


  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home