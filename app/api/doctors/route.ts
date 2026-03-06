import { prisma } from "../../../lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {

    const doctors = await prisma.doctor.findMany({
        orderBy: {
            patients: "desc"
        }
    })

    return NextResponse.json(doctors)

}