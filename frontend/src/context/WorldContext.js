import {createContext, useReducer} from 'react';

export const WorldsContext = createContext();

export const worldsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_WORLDS':
            return {
                worlds: action.payload
            }
        case 'CREATE_WORLD':
            return {
                worlds: [action.payload, ...state.worlds]
            }
        default:
            return state
    }
}

export const WorldContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(worldsReducer, {
        worlds: []
    })

    return (
        <WorldsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorldsContext.Provider>
    )
}