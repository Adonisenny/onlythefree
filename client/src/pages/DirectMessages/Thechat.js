import { useDmContext } from "../../Hooks/useDmContext"



export const TheChat = () => {
    const {message} = useDmContext()
    console.log(message)

}