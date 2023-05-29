import { ReactNode, createContext, useEffect, useState } from 'react'

import { SnackData } from '../interfaces/SnackData'
import { getBurgers, getDrinks, getIceCreams, getPizzas } from '../services/api'

interface SnackContextProps{
    burgers: SnackData[]
    pizzas:  SnackData[]
    drinks:  SnackData[]
    iceCreams:  SnackData[]
  }

  interface SnackProviderProps{
    children: ReactNode;
  }
  
  export const SnackContext = createContext({} as SnackContextProps)

  export function SnackProvider({ children }: SnackProviderProps){
    const [burgers, setBurgers] = useState<SnackData[]>([])
    const [iceCreams, seticeCreams] = useState<SnackData[]>([])
    const [drinks, setDrinks] = useState<SnackData[]>([])
    const [pizzas, setPizzas] = useState<SnackData[]>([])


    useEffect(() =>{
        (async ()=> {
          try {
            const burgerRequest = await getBurgers()
            const drinkRequest = await getDrinks()
            const iceCreamRequest = await getIceCreams()
            const pizzaRequest = await getPizzas()

            const requests = [burgerRequest, drinkRequest, iceCreamRequest, pizzaRequest]
            
            const [ {data: burgerResponse}, {data: drinkResponse} , 
              {data: iceCreamResponse}, {data: pizzaResponse}] = await Promise.all(requests)

            setBurgers(burgerResponse)
            setPizzas(pizzaResponse)
            seticeCreams(iceCreamResponse)
            setDrinks(drinkResponse)  
          } catch (error) {
            console.log(error);
          }
        })()
    }, [])

    return (
        <SnackContext.Provider value={{ burgers, pizzas, drinks, iceCreams }}>
            { children }
        </SnackContext.Provider>
    )
  }