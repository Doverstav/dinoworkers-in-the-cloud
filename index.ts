import { Router } from 'itty-router'
import { getRandomDino, likeDino } from './api/dinos'

const router = Router()

export default {
  fetch: router.handle
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Allow-Headers": "*",
}

router.options("*", () => new Response(null, {headers: corsHeaders}))

router.get("/api/dinos", () => {
  return getRandomDino()
})

router.post("/api/dinos/:userId", (req: Request, env: any) => {
  return likeDino(req, env)
})

router.get("*", () => new Response("Not found", { status: 404 }))