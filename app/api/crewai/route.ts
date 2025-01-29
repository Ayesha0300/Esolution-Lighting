import { NextResponse } from "next/server"
import { runCrew } from "@/lib/crewai-setup"

export async function GET() {
  try {
    const result = await runCrew("Get product information", {})
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error running CrewAI:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { prompt, productDetails } = await req.json()
    const result = await runCrew(prompt, productDetails)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    )
  }
}

