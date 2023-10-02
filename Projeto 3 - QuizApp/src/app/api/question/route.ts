import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { question, answers, correctAnswer } = await await request.json();
  console.log(question, answers, correctAnswer)
  const createdQuestion = await prisma.question.create({
    data: { question, answers:JSON.stringify(answers) , correctAnswer },
  });

  

  return NextResponse.json({ question: createdQuestion });
}