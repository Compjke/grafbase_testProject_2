 import  {MouseEventHandler} from 'react'
 import Image from 'next/image'
 
 interface ButtonProps {
   children? : React.ReactNode,
   type? : 'button' | 'submit'
   title : string
   leftIcon? : string | null
   rigthIcon? : string | null
   isSubmiting? : boolean
   handleClick ? : MouseEventHandler
   bgColor? : string
   textColor? : string
 }


const Button:React.FC<ButtonProps> = ({
   children,
   title,
   type,
   textColor,
   rigthIcon,
   leftIcon,
   isSubmiting,
   bgColor,
   handleClick,
}) => {
   return ( 
   <button
   onClick={handleClick} 
   type={type || 'button'}
   disabled={isSubmiting}
   className={`
   flexCenter
   gap-3 
   px-4 
   py-3 
   rounded-xl
   text-sm
   font-medium
   max-md:w-full
   ${textColor || 'text-white'}
   ${isSubmiting ? 'bg-black/30' : bgColor || 'bg-primary-purple'}
   `}
   >
      {leftIcon && (
         <Image
         src={leftIcon}
         alt='left'
         width={14}
         height={14}
         className='text-white bg-white rounded-full'
         />
      )}
      {title}
      {rigthIcon && (
         <Image
         src={rigthIcon}
         alt='right'
         width={14}
         height={14}
         />
      )}
   </button> 
   );
}
 
export default Button;