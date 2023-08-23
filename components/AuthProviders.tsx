'use client'

import {useState,useEffect} from 'react'
import {signIn , getProviders} from 'next-auth/react'
import Button from './Button'

type Provider = {
   id : string
   name : string
   type : string
   sigInUrl : string
   callbackUrl : string
   signinUrlParams : Record<string , string> | null
}

type Providers = Record<string , Provider>;

const AuthProviders = () => {

   const [providers, setproviders] = useState<Providers | null>(null);
 console.log(providers)
 useEffect(() => {
   const fetchProviders = async () => {
      const res = await getProviders()
      setproviders(res)
   }
   fetchProviders()
 },[])

   if(providers) {
      return (
        <div>
          {Object.values(providers).map((provider: Provider) => (
            <Button 
            key={provider.id} 
            handleClick={() => signIn(provider?.id)}
            title='Sign in'
            type='button'
            />
          ))}
        </div>
      );
   }
}
 
export default AuthProviders;