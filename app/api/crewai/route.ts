import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Import dynamically to avoid ESM issues
    const { runCrew } = await import('@/lib/crewai-setup')
    const result = await runCrew("Get product information", {})
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error running CrewAI:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const { runCrew } = await import('@/lib/crewai-setup')
    const result = await runCrew("Get product information", {})
    return NextResponse.json({ result })
  } catch (error) {
    console.error("CrewAI Error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

