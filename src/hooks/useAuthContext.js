/* Importing the AuthContext and useContext from react. */

import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"



/**
 * It returns the context object.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext)

/* Checking if the context is null and if it is it will throw an error. */

  if(!context) {
    throw Error('useAuthContext must be used inside a AuthContextProvider')
  }

  return context
}