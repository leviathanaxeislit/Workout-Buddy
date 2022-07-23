/* It's creating a context object. */
import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

/**
 * It takes in a state and an action, and returns a new state based on the action.type.
 * @param state - the current state of the reducer
 * @param action - { type: 'SET_WORKOUTS', payload: workouts }
 * @returns The state is being returned.
 */
export const workoutsReducer = (state, action) => {
/* A switch statement that is checking the action.type and returning a new state based on the
action.type. */
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
      }
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts] 
      }
    case 'DELETE_WORKOUT':
      return { 
        workouts: state.workouts.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

/**
 * It's a function that takes in a single argument, children, and returns a React component that uses
 * the useReducer hook to create a workoutsReducer function and a state object.
 */
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  })
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}