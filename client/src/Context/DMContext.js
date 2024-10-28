import { createContext,useReducer } from "react";

export const DmContext = createContext()

export const DMReducer =(state,action) => {
    switch(action.type){
        case 'SET_DM':
        return{
            message:action.payload
        }
        case 'CREATE_DM':
        return{
            message:[action?.payload, ...state?.message]
        }
        case 'DELETE_DM':
            return{
                message:state?.message?.filter(w => w?._id !== action.payload._id)
            }

        default: return state

        
    }
}
export const DmContextProvider = ({children})=>{
    const [state,dispatch3] =useReducer(DMReducer,{
        message:[]
    })
    return(
        <DmContext.Provider value={{...state,dispatch3}}>{children}</DmContext.Provider>
    )
}