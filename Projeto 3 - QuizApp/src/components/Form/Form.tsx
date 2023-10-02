import { useGlobalContext } from "@/context/main";
import { FormEventHandler, useState } from "react"
import { useRouter } from 'next/navigation'


const {newName, setNewName, newEmail ,setNewEmail} = useGlobalContext()

  const router = useRouter();

  const handleSubmitIniciar:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push("/quiz");
  }


export default function Form(){
    <div>
        <form onSubmit={handleSubmitIniciar} className="flex flex-col items-center gap-2">
          <div >
            <label htmlFor="newName">Nome: </label>
            <input 
              className="text-black p-2"
              type="text" 
              name="newName" 
              id="newName" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nome"/>
          </div>
          <div>
            <label htmlFor="newName">Email: </label>
            <input 
              className="text-black p-2"
              type="email" 
              name="newEmail" 
              id="newEmail" 
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email"/>
          </div>
            <button type="submit" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full">
              Start Quiz
            </button>
        </form>
      </div>
}
