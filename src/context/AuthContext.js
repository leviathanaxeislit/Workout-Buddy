import { createContext, useReducer } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    /* This is the reducer function. It is a function that takes in the current state and an action.
    The action is an object that has a type and a payload. The type is a string that tells the
    reducer what to do.
    The payload is the data that is passed to the reducer. */
    switch (action.type){
        case 'LOGIN':
            return{user: action.payload }
            case 'LOGOUT':
                return { user: null }
                default:
                    return state
    }
}


/**
 * The AuthContextProvider function returns a Provider component that has a value prop that is an
 * object with a user property that is set to null.
 */
export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] =  useReducer(authReducer, {
        user: null
    })

    console.log('AuthContext state: ',state)
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}