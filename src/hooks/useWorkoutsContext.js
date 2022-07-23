/* Importing the WorkoutsContext and useContext from react. */
import { WorkoutsContext } from "../context/WorkoutsContext"
import { useContext } from "react"

/**
 * UseWorkoutsContext is a function that returns the context object from the WorkoutsContextProvider.
 * @returns The context object.
 */
export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)

/* Checking if the context is null. If it is null, it will throw an error. */
  if(!context) {
    throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
  }

  return context
}