import { Agent, Crew, Task } from "crewai"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Move CustomTask class here
export class CustomTask {
  description: string;
  agent: any;

  constructor(options: { description: string; agent: any }) {
    this.description = options.description;
    this.agent = options.agent;
  }
}

// Initialize the Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

// Wrapper function to make Gemini compatible with CrewAI
const geminiWrapper = {
  call: async (prompt: string) => {
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  },
}

// Create agents
const productManager = new Agent({
  name: "Product Manager",
  role: "Product expert for luxury lighting",
  goal: "Provide accurate and detailed product information",
  backstory: "Experienced in high-end lighting products",
  llm: geminiWrapper,
})

const designer = new Agent({
  name: "Lighting Designer",
  role: "Creates innovative and aesthetically pleasing lighting designs",
  goal: "Design unique and functional lighting products",
  backstory: "Award-winning designer with a passion for modern aesthetics",
  llm: geminiWrapper,
})

const marketingSpecialist = new Agent({
  name: "Marketing Specialist",
  role: "Develops marketing strategies and content",
  goal: "Increase brand awareness and drive sales",
  backstory: "Digital marketing expert with a focus on luxury goods",
  llm: geminiWrapper,
})

// Define tasks
const task1 = new CustomTask({
  description: "Develop a new line of smart home lighting products",
  agent: productManager,
})

const task2 = new Task({
  description: "Create designs for the smart home lighting product line",
  agent: designer,
})

const task3 = new Task({
  description: "Develop a marketing campaign for the new smart home lighting products",
  agent: marketingSpecialist,
})

// Create the crew
const crew = new Crew({
  agents: [productManager, designer, marketingSpecialist],
  tasks: [task1, task2, task3],
  verbose: true,
})

export async function runCrew(prompt: string, productDetails: any) {
  const task = new Task({
    description: `Analyze the following product and ${prompt}:\n${JSON.stringify(productDetails, null, 2)}`,
    agent: productManager,
  })

  const crew = new Crew({
    agents: [productManager],
    tasks: [task],
    verbose: true,
  })

  const result = await crew.sequential_process()
  return result
}

