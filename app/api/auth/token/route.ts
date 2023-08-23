import {getToken} from 'next-auth/jwt'
import {NextResponse,NextRequest} from 'next/server'

const secret = process.env.NEXTAUTH_SECRET || '3zsrw'

export const GET = async (req: NextRequest) => {

   const token = await getToken({req, secret , raw : true})

   return NextResponse.json({token} , {status : 200})

   
};