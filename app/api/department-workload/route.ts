import { prisma } from "../../../lib/prisma"
import { NextResponse } from "next/server"

export async function GET(){

const workload = await prisma.departmentWorkload.findMany()

return NextResponse.json(workload)

}