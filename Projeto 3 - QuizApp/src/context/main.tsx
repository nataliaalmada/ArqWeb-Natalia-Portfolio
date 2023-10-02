'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

interface ContextProps {
    newName: string
    setNewName: Dispatch<SetStateAction<string>>
    newEmail: string
    setNewEmail: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
    newName: "",
    setNewName: ():string => "",
    newEmail: "",
    setNewEmail: ():string => ""
})

export const GlobalContextProvider = ({children} : any) => {
    const [newName, setNewName] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    return (
        <GlobalContext.Provider value={{newName, setNewName, newEmail, setNewEmail}}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);