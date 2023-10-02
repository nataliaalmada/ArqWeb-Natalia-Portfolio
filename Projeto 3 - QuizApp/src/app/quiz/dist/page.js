'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var quiz_1 = require("@/data/quiz");
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var main_1 = require("@/context/main");
function PageQuiz() {
    var _a = react_1.useState(0), activeQuestion = _a[0], setActiveQuestion = _a[1];
    var _b = react_1.useState(false), selectedAnswer = _b[0], setSelectedAnswer = _b[1];
    var _c = react_1.useState(false), checked = _c[0], setChecked = _c[1];
    var _d = react_1.useState(null), selectedAnswerIndex = _d[0], setSelectedAnswerIndex = _d[1];
    var _e = react_1.useState(false), showResult = _e[0], setShowResult = _e[1];
    var _f = react_1.useState({
        score: 0,
        correctAnswer: 0,
        wrongAnswer: 0
    }), result = _f[0], setResult = _f[1];
    var _g = react_1.useState([]), userAnswsers = _g[0], setUserAnswsers = _g[1];
    var _h = react_1.useState(0), switchTabCount = _h[0], setSwitchTabCount = _h[1];
    var questions = quiz_1.quiz.questions, subject = quiz_1.quiz.subject, totalQuestions = quiz_1.quiz.totalQuestions;
    var _j = questions[activeQuestion], id = _j.id, question = _j.question, answers = _j.answers, correctAnswer = _j.correctAnswer;
    var _k = main_1.useGlobalContext(), newName = _k.newName, newEmail = _k.newEmail;
    var router = navigation_1.useRouter();
    function onAnswerSelected(answer, idx) {
        setChecked(true);
        setSelectedAnswerIndex(idx);
        if (answer === correctAnswer) {
            setSelectedAnswer(true);
        }
        else {
            setSelectedAnswer(false);
        }
    }
    function nextQuestionHandler() {
        setUserAnswsers(function (prev) {
            return __spreadArrays(prev, [{ correct: selectedAnswer, question: question, userAnswer: questions[activeQuestion].answers[selectedAnswerIndex], correctAnswer: questions[activeQuestion].correctAnswer }]);
        });
        setSelectedAnswerIndex(null);
        setResult(function (prev) { return selectedAnswer ? __assign(__assign({}, prev), { score: prev.score + 5, correctAnswer: prev.correctAnswer + 1 }) : __assign(__assign({}, prev), { answers: [], wrongAnswer: prev.wrongAnswer + 1 }); });
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion(function (prev) { return prev + 1; });
        }
        else {
            setActiveQuestion(0);
            setShowResult(true);
        }
        setChecked(false);
    }
    console.log(userAnswsers);
    var handleVisibilityChange = function () {
        if (document.visibilityState === "hidden")
            setSwitchTabCount(function (c) { return c + 1; });
    };
    react_1.useEffect(function () {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return function () {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);
    react_1.useEffect(function () {
        console.log(switchTabCount);
        if (switchTabCount > 2 && !showResult) {
            window.alert("AVISO: SUA PARTIDA SERÁ FINALIZADA, VOCÊ TROCOU DE TELA MAIS DE 2 VEZES.");
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            setResult({ score: 0, correctAnswer: 0, wrongAnswer: 0 });
            setShowResult(true);
        }
        else if (switchTabCount > 0) {
            window.alert("ATENÇÃO, PRESTE MUITA ATENÇÃO: SÓ PODE TROCAR DE TELA 2x. VOCÊ ACAOU DE USAR 1!");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [switchTabCount]);
    return (React.createElement("div", { className: "flex flex-col justify-center items-center py-5 " },
        React.createElement("h1", null,
            "Ol\u00E1 ",
            React.createElement("span", { className: "font-bold text-center" }, newName),
            " BEM VINDO!"),
        React.createElement("div", { className: "flex flex-col p-2 items-center " },
            React.createElement("h2", null,
                "Assunto: ",
                subject,
                " "),
            React.createElement("h2", null,
                "Quest\u00E3o: ",
                activeQuestion + 1,
                "/",
                totalQuestions)),
        React.createElement("div", { className: "max-w-sm rounded overflow-hidden shadow-lg bg-gray-100" }, !showResult ? (React.createElement("div", { className: "px-6 py-4" },
            React.createElement("div", { className: "font-bold text-xl mb-2 text-black" }, question),
            React.createElement("div", { className: "text-gray-700 text-base flex flex-col gap-1" }, answers.map(function (answer, idx) { return (React.createElement("button", { key: idx, className: "bg-transparent hover:bg-blue-500\n                                                 text-blue-700 font-semibold hover:text-white \n                                                py-2 px-4 border  border-blue-500 \n                                                hover:border-transparent rounded\n                                                " + (selectedAnswerIndex === idx ? " text-white bg-blue-500" : ""), onClick: function () { return onAnswerSelected(answer, idx); } }, answer)); })),
            React.createElement("div", { className: "px-6 pt-4 pb-2 flex justify-center" },
                React.createElement("button", { disabled: !checked, className: "\n                                                    bg-gray-400  text-white font-bold \n                                                    py-2 px-4 rounded-full select-none\n                                                    " + (checked ? "hover:bg-gray-600" : "bg-gray-200 cursor-not-allowed") + "\n                                                    ", onClick: function () { return nextQuestionHandler(); } }, "Next")))) : (React.createElement("div", { className: "flex flex-col w-96 p-4 text-black" },
            React.createElement("h1", { className: "font-bold text-xl text-blue-600" }, " Resultados"),
            React.createElement("h3", null,
                React.createElement("span", { className: "font-semibold text-black underline decoration-indigo-500" }, "VOC\u00CA ACERTOU ESSA PORCENTAGEM: "),
                " ",
                (result.score / 25) * 100,
                "% "),
            React.createElement("h3", null,
                React.createElement("span", { className: "font-semibold text-black underline decoration-indigo-500" }, "QUANTIDADE DE QUEST\u00D5ES: "),
                questions.length,
                " "),
            React.createElement("h3", null,
                React.createElement("span", { className: "font-semibold text-black underline decoration-indigo-500" }, "QUAMTIDADE DE PONTOS: "),
                result.score),
            React.createElement("h3", null,
                React.createElement("span", { className: "font-semibold text-black underline decoration-indigo-500" }, "QUANTIDADE DE ACERTOS: "),
                result.correctAnswer),
            React.createElement("h3", null,
                React.createElement("span", { className: "font-semibold text-black underline decoration-indigo-500" }, "QUANTIDADE DE ERROS: "),
                result.wrongAnswer),
            userAnswsers.map(function (answer) { return React.createElement("div", { key: answer.question, className: "t" },
                React.createElement("div", { className: "py-1" },
                    React.createElement("div", { className: "w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow " },
                        React.createElement("p", null,
                            React.createElement("span", { className: "font-semibold text-black underline decoration-indigo-500" }, "QUEST\u00C3O: "),
                            answer.question),
                        React.createElement("p", null,
                            React.createElement("span", { className: "font-semibold text-black underline decoration-indigo-500" }, "VOCE RESPONDEU: "),
                            answer.userAnswer),
                        React.createElement("p", null,
                            React.createElement("span", { className: "font-semibold text-black underline decoration-indigo-500" }, "RUFEM OS TAMBORES... A RESPOSTA \u00C9: "),
                            answer.correctAnswer,
                            " ",
                            React.createElement("br", null),
                            " ")))); }),
            React.createElement("div", { className: "px-6 pt-4 pb-2 flex justify-center" },
                React.createElement("button", { className: "\n                                                    bg-gray-400  text-white font-bold \n                                                    py-2 px-4 rounded-full select-none\n                                                    ", onClick: function () { return router.push("/"); } }, "Restart")))))));
}
exports["default"] = PageQuiz;
