import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, START, END, StateGraph, ReducedValue, MessagesValue } from "@langchain/langgraph";
import { z } from 'zod';
import type { GraphNode } from "@langchain/langgraph";
import aiModels from "./models.service.js";
import { providerStrategy, createAgent } from "langchain";

const State = new StateSchema({
  problem: z.string().default(""),
  messages: MessagesValue,
  solution_1: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => next
  }),
  solution_2: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => next
  }),
  judgeRecommendation: new ReducedValue(
    z.object({
      solution_1_score: z.number(),
      solution_2_score: z.number(),
      solution_1_reasonig: z.string().default(""),
      solution_2_reasoning: z.string().default("")

    }).default({
      solution_1_score: 0,
      solution_2_score: 0,
      solution_1_reasonig: "",
      solution_2_reasoning: ""
    }),
    {
      reducer: (_, next) => next,
    }
  )
})




const solutionNode: GraphNode<typeof State> = async (state: typeof State.State) => {


  const [mistralSolution, cohereSolution] = await Promise.all([
    aiModels.mistralModel.invoke(state.messages),
    aiModels.cohereModel.invoke(state.messages)
  ]);

  return {
    solution_1: String(mistralSolution.content),
    solution_2: String(cohereSolution.content)
  };
};
const judgeNode: GraphNode<typeof State> = async (state) => {
  try {
    const judge = createAgent({
      model: aiModels.geminiModel,
      tools: [],
      responseFormat: providerStrategy(
        z.object({
          solution_1_score: z.number(),
          solution_2_score: z.number(),
        })
      )
    });

    const response = await judge.invoke({
      messages: [
        new HumanMessage(`
          Solution 1:
          ${state.solution_1}

          Solution 2:
          ${state.solution_2}
          `)
      ]
    });
    console.log(response.structuredResponse)
    return {
      judgeRecommendationNum: {
        solution_1_score: 10,
        solution_2_score: 5,
      },
      judgeRecommendation: response.structuredResponse
    };

  } catch (error) {
    console.error("JUDGE ERROR");
    console.error(error);
    throw error;
  }
};
const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge")
  .addEdge("judge", END)
  .compile();

export default async function (userMessage: string) {
  const result = await graph.invoke({
    messages: [new HumanMessage(userMessage)]
  });
  console.log(result)


  return result;
}