'use client'

import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import { deleteProject, fetchToken } from '@/lib/actions'
type Props = {
   projectId  : string
}

const ProjectActions = ({
   projectId
}: Props) => {
  const router = useRouter()
   const [isDeliting, setisDeliting] = useState(false);
   const handleDEleteProject = async() => {
      setisDeliting(true)
      
      const {token} = await fetchToken();
      try {
         await deleteProject(projectId , token)
         router.refresh()
         router.push('/')
      } catch (err) {
         console.log(err)
      } finally {
         setisDeliting(false)
      }
   }
   return (
     <>
       <Link
         href={`/edit-project/${projectId}`}
         className={`edit-action_btn ${isDeliting ? "hidden" : 'flexCenter'}`}
       >
         <Image src={"/pencil.svg"} alt="edit" width={20} height={20} />
       </Link>
       <button
         onClick={handleDEleteProject}
         disabled={isDeliting}
         type="button"
         className={`flexCenter delete-action_btn ${
           isDeliting ? "hover:bg-gray bg-gray" : "bg-primary-purple"
         }`}
       >
         <Image src={"/basket.svg"} alt="edit" width={20} height={20} />
       </button>
     </>
   );
}
 
export default ProjectActions;