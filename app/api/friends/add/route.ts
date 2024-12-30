import { addFriendValidator } from "@/app/lib/validation/add-friend"
import { auth } from "@/auth"

export async function POST(req: Request){
    try {
        const body = await req.json()
        const {
            email:emailtoAdd} = addFriendValidator.parse(body.email)
        const RESTResponce = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailtoAdd}`,{
            headers:{
                Authorization:`Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, 
                
            },
            cache:'no-cache'
        }) 
        const data = await RESTResponce.json() as {result:string}
        const idToAdd = data.result
        
        if(!idToAdd){
            return new Response('This person does not exist' ,{status:400})
        }
        const session = await auth()
        if(!session) {
            return new Response('Unauthorized', {status:401})
        }
        if(idToAdd === session.user.id){
            return new Response('you cannot add yourself')
        }
        
       
       console.log(data) 
    } catch (error) {
        
    }

} 