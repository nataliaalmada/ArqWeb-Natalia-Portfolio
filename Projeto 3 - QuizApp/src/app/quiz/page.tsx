'use client';

import { quiz } from '@/data/quiz';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/context/main';


type Answer = {
    question: string,
    correct: boolean,
    userAnswer: string,
    correctAnswer: string


}

export default function PageQuiz() {

    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(false)
    const [checked, setChecked] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState({
        score: 0,
        correctAnswer: 0,
        wrongAnswer: 0,

    });

    const [userAnswsers, setUserAnswsers] = useState<Answer[]>([

    ])

    const [switchTabCount, setSwitchTabCount] = useState(0);

    const { questions, subject, totalQuestions } = quiz;
    const { id, question, answers, correctAnswer } = questions[activeQuestion];

    const { newName, newEmail } = useGlobalContext()


    const router = useRouter();

    function onAnswerSelected(answer: any, idx: any) {
        setChecked(true);
        setSelectedAnswerIndex(idx)
        if (answer === correctAnswer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    }

    function nextQuestionHandler() {
        setUserAnswsers(
            (prev) => {
                return [...prev, { correct: selectedAnswer, question: question, userAnswer: questions[activeQuestion].answers[selectedAnswerIndex!], correctAnswer: questions[activeQuestion].correctAnswer }]
            }
        )
        setSelectedAnswerIndex(null);
        setResult((prev) => selectedAnswer ? {
            ...prev,
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer + 1,
        } : {
            ...prev,
            answers: [],
            wrongAnswer: prev.wrongAnswer + 1
        });

        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion(prev => prev + 1);
        } else {
            setActiveQuestion(0)
            setShowResult(true);
        }
        setChecked(false);
    }

    console.log(userAnswsers)

    const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden")
            setSwitchTabCount((c) => c + 1);
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
      }, []);

      useEffect(() => {
        console.log(switchTabCount);
        if (switchTabCount > 2 && !showResult) {
          window.alert(
            "AVISO: SUA PARTIDA SERÁ FINALIZADA, VOCÊ TROCOU DE TELA MAIS DE 2 VEZES."
          );
          document.removeEventListener("visibilitychange", handleVisibilityChange);
          setResult({score:0,correctAnswer: 0, wrongAnswer: 0})
          setShowResult(true)
        } else if (switchTabCount > 0) {
          window.alert(
            "ATENÇÃO, PRESTE MUITA ATENÇÃO: SÓ PODE TROCAR DE TELA 2x. VOCÊ ACAOU DE USAR 1!"
          );

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [switchTabCount]);

    return (
        <div className="flex flex-col justify-center items-center py-5 ">
            <h1>Olá <span className="font-bold text-center">{newName}</span> BEM VINDO!</h1>

            <div className="flex flex-col p-2 items-center ">
                <h2>Assunto: {subject} </h2>
                <h2>Questão: {activeQuestion + 1}/{totalQuestions}</h2>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
                {!showResult ? (
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-black">{question}</div>
                        <div className="text-gray-700 text-base flex flex-col gap-1">
                            {answers.map((answer, idx) => (
                                <button key={idx}
                                    className={
                                        `bg-transparent hover:bg-blue-500
                                                 text-blue-700 font-semibold hover:text-white 
                                                py-2 px-4 border  border-blue-500 
                                                hover:border-transparent rounded
                                                ${selectedAnswerIndex === idx ? " text-white bg-blue-500" : ""}`
                                    }
                                    onClick={() => onAnswerSelected(answer, idx)}
                                >
                                    {answer}
                                </button>
                            ))}
                        </div>
                        <div className="px-6 pt-4 pb-2 flex justify-center">
                            <button disabled={!checked} className={`
                                                    bg-gray-400  text-white font-bold 
                                                    py-2 px-4 rounded-full select-none
                                                    ${checked ? "hover:bg-gray-600" : "bg-gray-200 cursor-not-allowed"}
                                                    `}
                                onClick={() => nextQuestionHandler()}
                            >

                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col w-96 p-4 text-black">
                        <h1 className="font-bold text-xl text-blue-600"> Resultados</h1>
                        <h3><span className="font-semibold text-black underline decoration-indigo-500">VOCÊ ACERTOU ESSA PORCENTAGEM: </span> {(result.score / 25) * 100}% </h3>
                        <h3><span className="font-semibold text-black underline decoration-indigo-500">QUANTIDADE DE QUESTÕES: </span>{questions.length} </h3>
                        <h3><span className="font-semibold text-black underline decoration-indigo-500">QUAMTIDADE DE PONTOS: </span>{result.score}</h3>
                        <h3><span className="font-semibold text-black underline decoration-indigo-500">QUANTIDADE DE ACERTOS: </span>{result.correctAnswer}</h3>
                        <h3><span className="font-semibold text-black underline decoration-indigo-500">QUANTIDADE DE ERROS: </span>{result.wrongAnswer}</h3>


                        {
                            userAnswsers.map(
                                answer => <div
                                    key={answer.question}
                                    className="t"
                                >
                                    <div className="py-1">
                                        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow ">
                                            <p><span className="font-semibold text-black underline decoration-indigo-500">QUESTÃO: </span>{answer.question}</p>
                                            <p><span className="font-semibold text-black underline decoration-indigo-500">VOCE RESPONDEU: </span>{answer.userAnswer}</p>
                                            <p><span className="font-semibold text-black underline decoration-indigo-500">RUFEM OS TAMBORES... A RESPOSTA É: </span>{answer.correctAnswer} <br /> </p>
                                        </div>
                                    </div>
                                </div>

                            )
                        }


                        <div className="px-6 pt-4 pb-2 flex justify-center">
                            <button className={`
                                                    bg-gray-400  text-white font-bold 
                                                    py-2 px-4 rounded-full select-none
                                                    `}
                                onClick={() => router.push("/")}
                            >

                                Restart
                            </button>
                        </div>
                    </div>
                )
                }

            </div>
        </div>

    )
}