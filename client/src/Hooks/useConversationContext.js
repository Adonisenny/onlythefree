import { useContext } from "react"
import { ConversationContext } from "../Context/ConversationContext"




export const useConversationContext = () => {
    const mycontext = useContext(ConversationContext)

    if(!mycontext){
        throw Error('use ConversationContext must be used in the right state')
    }
    return mycontext
}