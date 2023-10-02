
'use client'

import { FormEventHandler, useState } from "react"
import { useRouter } from 'next/navigation'
import { useGlobalContext } from "@/context/main";
import Link from "next/link";


export default function Home() {

  // const [newName, setNewName] = useState("");
  // const [newEmail, setNewEmail] = useState("");

  const { newName, setNewName, newEmail, setNewEmail } = useGlobalContext()

  const router = useRouter();

  const handleSubmitIniciar: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();


    const { url } = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({ email: newEmail, name: newName }),
    });
    router.push("/quiz");
  }

  return (
    <main className="flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-center mb-2 text-xs font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Teste seus conhecimentos sobre Ciências da Computação!</h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Você já se perguntou o quanto sabe sobre o mundo da tecnologia e da computação? Agora é a sua chance de testar seus conhecimentos e mergulhar no fascinante universo da Ciência da Computação com nosso Quiz APP!</p>
      </div>

      <div>
        <form onSubmit={handleSubmitIniciar} className="flex flex-col items-center gap-2">
          <div className="w-96" >
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="text"
              name="newName"
              id="newName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nome: "
              required />
          </div>
          <div className="relative z-0 w-full mb-6 group py-2">
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="email"
              name="newEmail"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email: "
              required />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full my-5">
              Start Quiz
            </button>
            <Link href="/newQuestion">
              <button type="submit" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full my-5">
                Cadastrar Questão
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
