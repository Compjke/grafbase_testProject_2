'use client'

import {useCallback , useRef} from 'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image'

const Modal = ({children} : {children : React.ReactNode}) => {
   const overlay = useRef<HTMLDivElement>(null)
   const wrapper = useRef<HTMLDivElement>(null)
   const router = useRouter();
   
   
   const onDismiss = useCallback(() => {
      router.back()
   },[router]);
   
   const handleClick = useCallback((e: React.MouseEvent) => {
      if(e.target === overlay.current && onDismiss){
         onDismiss()
      }
   },[onDismiss,overlay])
   return (
     <div ref={overlay} className="modal" onClick={handleClick}>
       <div ref={wrapper} className="modal_wrapper">
         <button
           type="button"
           onClick={onDismiss}
           className="absolute top-4 right-8 transition opacity-80 hover:opacity-100 hover:scale-110"
         >
           <Image src="/close.svg" width={20} height={20} alt="close-button" />
         </button>
         {children}
       </div>
     </div>
   );
}
 
export default Modal;