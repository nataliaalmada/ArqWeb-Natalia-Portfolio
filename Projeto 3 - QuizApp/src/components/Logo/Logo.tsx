import Image from "next/image"
import LogoQuiz from "@/assets/logo.png"

export default function Logo(){
    return (
        <div className="relative flex justify-center py-3">
        <Image className="fill" src={LogoQuiz} width={400} alt="logo"/>
      </div>
    )
}