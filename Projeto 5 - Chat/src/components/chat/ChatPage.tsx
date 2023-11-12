"client component";

import { useConnection } from "@/context/connect";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import style from "./chat.module.css";

interface IMsgDatTypes {
  user: String;
  msg: String;
  time: String;
}

interface IUser {
  id: string;
  name: string;
  onUserClick: (id: string, name: string) => void;
}

export default function ChatPage({ userName }: any) {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chatMessages, setChatMessages] = useState<IMsgDatTypes[]>([]);
  const [usuariosOnline, setUsuariosOnline] = useState<IUser[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [privateChatUser, setPrivateChatUser] = useState<IUser | null>(null);
  const [privateChatMessages, setPrivateChatMessages] = useState<
    IMsgDatTypes[]
  >([]);

  const { connection } = useConnection();

  const handleUserClick = (userId: string, username: string) => {
    setPrivateChatUser({
      id: userId,
      name: username,
      onUserClick: handleUserClick,
    });

    // Limpe as mensagens de chat privado
    setPrivateChatMessages([]);

    // Emita uma mensagem para iniciar o chat privado
    connection.emit("start-private-chat", userId);
  };

  const handlePrivateSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const newMsg: IMsgDatTypes = {
        user: userName,
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      // Envie a mensagem privada para o usuário
      if (privateChatUser) {
        connection.emit("private-message", {
          to: privateChatUser.id,
          message: newMsg,
        });
        setPrivateChatMessages((msgs) => [...msgs, newMsg]);
      }

      setCurrentMsg("");
    }
  };

  useEffect(() => {
    if (connection) {
      connection.on("private-message", (message: any) => {
        setPrivateChatMessages((msgs) => [...msgs, message]);
      });
    }
  }, [connection]);

  useEffect(() => {
    if (connection) {
      connection.on("private-message", (message: any) => {
        if (privateChatUser && message.user === privateChatUser.id) {
          setPrivateChatMessages((msgs) => [...msgs, message]);
        }
      });
    }
  }, [connection, privateChatUser]);

  useEffect(() => {
    if (connection) {
      connection.on("private-chat-started", (targetUserId: string) => {
        // Aqui você pode realizar ações adicionais, se necessário
        console.log(`Chat privado iniciado com ${targetUserId}`);
      });
    }
  }, [connection]);

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (currentMsg !== "") {
      const newMsg: IMsgDatTypes = {
        user: userName,
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      connection.emit("send-message", newMsg);
      setCurrentMsg("");
    }
  }

  useEffect(() => {
    if (connection) {
      connection.on("receive-msg", (msg: IMsgDatTypes) => {
        setChatMessages((msgs) => [...msgs, msg]);
      });
    }
  }, [connection]);

  useEffect(() => {
    if (connection) {
      connection.on("updateUsers", (usuarios: any) => {
        const updatedUsuarios = usuarios.map((user: IUser) => ({
          ...user,
          onUserClick: (id: any, name: any) => handleUserClick(id, name),
        }));
        setUsuariosOnline(updatedUsuarios);
      });

      connection.on("userConnected", (userName: string) => {
        setChatMessages((msgs) => [
          ...msgs,
          {
            user: "Chat",
            msg: `Usuário ${userName} se conectou!`,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          },
        ]);
      });

      connection.on("userDisconnected", (userName: string) => {
        setChatMessages((msgs) => [
          ...msgs,
          {
            user: "Chat",
            msg: `Usuário ${userName} se desconectou!`,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          },
        ]);

        setUsuariosOnline((users) =>
          users.filter((user) => user.name !== userName)
        );
      });
    }
  }, [connection]);

  useEffect(() => {
    if (connection) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 3000); // Assumindo que um usuário está digitando por 2 segundos após a última tecla pressionada

      connection.emit("userTyping", isTyping, userName);

      return () => clearTimeout(timeout);
    }
  }, [isTyping, connection]);

  useEffect(() => {
    if (connection) {
      connection.on("updateTypingUsers", (users: string[]) => {
        setTypingUsers(users);
      });
    }
  }, [connection]);

  return (
    <div className="flex">
      {/* Barra Lateral */}
      <div className="flex flex-col w-96 h-screen bg-white p-3 gap-6">
        <div className="w-2/3">
          <Image
            src="/images/logo-chat.png"
            alt="Logo chat"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full"
            priority
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-semibold flex justify-left py-4 text-black">
            Usuários Online:
          </span>
          {usuariosOnline.map((usuario, index) => (
            <div className="bg-gray-200 rounded py-2">
              <button
                key={index}
                onClick={() => usuario.onUserClick(usuario.id, usuario.name)}
                className="m-1 text-black flex justify-left"
              >
                {usuario.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Main chat */}
      <div className="flex flex-col w-full h-screen px-10 py-5 bg-purple-500 justify-between ">
        {privateChatUser && (
          <div className="private-chat-container">
            <div className="private-chat-header flex justify-between pb-10">
              <span className="font-semibold">Chat Privado: {privateChatUser.name}</span>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setPrivateChatUser(null)}
              >
                Sair
              </button>
            </div>
            <div className="private-chat-messages">
              {privateChatMessages.map(({ user, msg, time }, key) => {
                const isOwnMensage = user === userName;
                const menssageStyle = isOwnMensage ? "bg-gray-300 mr-[500px]" : "bg-gray-200 ml-[500px]";
                return (
                  <div
                    key={key}
                    className={`flex flex-row p-2 text-black mb-1 place-content-between rounded ${menssageStyle}`}
                  >
                    {!isOwnMensage && (
                      <div className="text-xs mb-auto mr-2">{time}</div>
                    )}
                    <div className={"flex flex-col"}>
                      {isOwnMensage ? <span>{msg}</span> : <div><strong>{user}</strong><br /><span>{msg}</span></div>}
                    </div>
                    {isOwnMensage && (
                      <div className="text-xs mb-auto ml-2">{time}</div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col fixed bottom-0 w-2/3 py-4">
              <form
                onSubmit={handlePrivateSendMessage}
                className="flex gap-2 w-full justify-center"
              >
                <input
                  type="text"
                  className="rounded px-2 py-3 text-gray-700 border border-gray-400 w-2/3"
                  value={currentMsg}
                  onChange={(e) => setCurrentMsg(e.target.value)}
                  placeholder="Digite uma mensagem"
                />
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4  rounded"
                  type="submit"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        )}
        {!privateChatUser && (
          <div>
            {chatMessages.map(({ user, msg, time }, key) => (
              <div
                key={key}
              >
                <div className={style.userName}>{user}:</div>
                <div>{msg}</div>
                <div className={style.time}>{time}</div>
              </div>
            ))}

            {/* Exibir usuários que estão digitando*/}
            {typingUsers.length > 0 && (
              <div className={style.chatProfileLeft}>
                <span>
                  {typingUsers
                    .filter((user) => user !== userName)
                    .map((user, index, array) => (
                      <span key={user} className="font-style: italic">
                        {user}{" "}
                        {index === array.length - 1 ? "está digitando..." : ","}{" "}
                      </span>
                    ))}
                </span>
              </div>
            )}

            <div className="flex flex-col fixed bottom-0 w-2/3 py-4">
              <form
                onSubmit={sendMessage}
                className="flex gap-2 w-full justify-center"
              >
                <input
                  type="text"
                  className="rounded px-2 py-3 text-gray-700 border border-gray-400 w-2/3"
                  value={currentMsg}
                  placeholder={"Digite uma mensagem"}
                  onChange={(e) => {
                    setCurrentMsg(e.target.value);
                    setIsTyping(true);
                  }}
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
