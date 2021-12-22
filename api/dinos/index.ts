export enum Dinos {
  Stegosaurus = "Stegosaurus",
  Velociraptor = "Velociraptor",
  TyrannosaurusRex = "Tyrannosaurus Rex",
  Triceratops = "Triceratops",
}

export interface dinoResponse {
  dino: Dinos
}

interface UserData {
  dinosLiked: string[]
  dinosLikedAmount: number
}

interface LikeDinoBody {
  dino: string
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Allow-Headers": "*",
}

export const getRandomDino = () => {
  const dinos = ["Velociraptor", "Stegosaurus", "Tyrannosaurus Rex", "Triceratops"]
  const response = {
    dino: dinos[Math.round(Math.random() * dinos.length)]
  }

  return new Response(JSON.stringify(response), { headers: { "Content-Type": "application/json", ...corsHeaders } })
}

export const likeDino = async (request: any, env: any) => {
  const { params } = request

  const body = (await request.json()) as LikeDinoBody
  const currentUserData = (await env.DINOS.get(params.userId, { type: "json" })) as UserData


  let newUserData: UserData
  if (currentUserData) {
    newUserData = {
      dinosLiked: [...currentUserData.dinosLiked, body.dino],
      dinosLikedAmount: currentUserData.dinosLikedAmount + 1
    }
  } else {
    newUserData = {
      dinosLiked: [body.dino],
      dinosLikedAmount: 1
    }
  }

  await env.DINOS.put(params.userId, JSON.stringify(newUserData))

  return new Response(JSON.stringify(newUserData), { headers: { "Content-Type": "application/json", ...corsHeaders } })
}
