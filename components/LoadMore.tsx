'use client'

import {useRouter} from 'next/navigation'
import Button from './Button';


type Props = {
  startCursor : string
  endCursor : string
  hasPreviousPage : boolean
  hasNextPage : boolean
};

const LoadMore = ({
endCursor,
hasNextPage,hasPreviousPage,startCursor
}: Props) => {

const router = useRouter()
const handleNavigation = (direction : string) => {
   const currentParams = new URLSearchParams(window.location.search)
   

   if(direction === 'next' && hasNextPage){
      currentParams.delete('startcursor')
      currentParams.set('endcursor', endCursor)
   }else if(direction === 'first' && hasPreviousPage){
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
   }
   console.log(currentParams);
   const newSearchParams = currentParams.toString()
   const newPathName = `${window.location.pathname}?${newSearchParams}`

   router.push(newPathName)
}

   return ( 
      <div className='w-full flexCenter gap-5 mt-10'>
         {hasPreviousPage && (
            <Button
            title='Fisrt page'
            handleClick={() => handleNavigation('first')}
            />
         )}
         {hasNextPage && (
            <Button
            title='Next'
            handleClick={() => handleNavigation('next')}
            />
         )}
      </div>
    );
}
 
export default LoadMore;