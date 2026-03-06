import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(){

const data = await prisma.doctorWorkload.findMany()

return NextResponse.json(data)

}