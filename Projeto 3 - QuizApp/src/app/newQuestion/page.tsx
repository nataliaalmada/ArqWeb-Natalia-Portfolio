'use client'
import { useRouter } from 'next/navigation'
import { FormEventHandler, useState } from 'react';

export default function NewQuestion() {

    const router = useRouter();

    const [question, setQuestion] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState('')

    const [wrongAnswers1, setWrongAnswer1] = useState('')
    const [wrongAnswers2, setWrongAnswer2] = useState('')
    const [wrongAnswers3, setWrongAnswer3] = useState('')

    const handleSubmitIniciar: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await fetch("/api/question", {
            method: "POST",
            body: JSON.stringify({
                question,
                answers: [correctAnswer, wrongAnswers1, wrongAnswers2, wrongAnswers3],
                correctAnswer: correctAnswer,
            }),
        });
        
        setQuestion('')
        setCorrectAnswer('')
        setWrongAnswer1('')
        setWrongAnswer2('')
        setWrongAnswer3('')
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="py-2 text-lg justify-center">Cadastrar Nova Questão</h1>
            <div className="flex flex-col w-96 justify-center">
                <form onSubmit={handleSubmitIniciar}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="" id="" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={(e) => setQuestion(e.target.value)} value={question} />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pergunta</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="" id="" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={(e) => setCorrectAnswer(e.target.value)} value={correctAnswer}/>
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Resposta Certa</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="" id="" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={(e) => setWrongAnswer1(e.target.value)} value={wrongAnswers1}/>
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Resposta Errada</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="" id="" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={(e) => setWrongAnswer2(e.target.value)} value={wrongAnswers2}/>
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Resposta Errada</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="" id="" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={(e) => setWrongAnswer3(e.target.value)} value={wrongAnswers3}/>
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Resposta Errada</label>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}