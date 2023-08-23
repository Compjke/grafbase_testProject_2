'use client'

import {useState , useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image'
interface ProjectCardPops {
   id : string
   image : string
   title : string
   avatarUrl : string
   name : string
   userId : string
}

const ProjectCard = ({ 
   avatarUrl,
   id,
   image,
   name,
   title,
   userId
}: ProjectCardPops) => {

 const [randomLikes, setRandomLikes] = useState(0);
 const [randomViews, setRandomViews] = useState("");

 useEffect(() => {
   setRandomLikes(Math.floor(Math.random() * 10000));
   setRandomViews(
     String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
   );
 }, []);

  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          width={414}
          height={314}
          alt="Project image"
          className="w-full h-full object-contain rounded-2xl"
        />
        <div className="hidden group-hover:flex profile_card-title transition">
          <p className="w-full">{title}</p>
        </div>
      </Link>
      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={30}
              height={30}
              className="rounded-full"
              alt="profile image"
            />
            <p>{name}</p>
          </div>
        </Link>
        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image
              src={`/heart.svg`}
              width={15}
              height={15}
              alt="heart"
              className="shadow-inner shadow-red-500 rounded-full"
            />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src={`/eye.svg`} width={15} height={15} alt="heart" />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ProjectCard;