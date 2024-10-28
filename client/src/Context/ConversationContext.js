import { createContext, useReducer } from "react"


export const ConversationContext = createContext()


export const conversationReducer =(state,action) => {
    switch(action.type){
        case 'SET_CONVERSATION':
            return{
                conversation:action.payload
            }
            case 'CREATE_CONVERSATION':
            return{
                conversation:[action.payload, ...state?.conversation]
            }
        case 'DELETE_CONVERSATION':
            return{
                conversation:state?.conversation.filter(c => c?.id !== action.payload)
            }
            default:
                return state
    }
    
}

export const CoversationContextProvider =({children}) => {


    const [state,dispatch4] =useReducer(conversationReducer, {
        conversation:[]
    })
    return(
        <ConversationContext.Provider value={{...state,dispatch4}}>{children}</ConversationContext.Provider>
    )
}