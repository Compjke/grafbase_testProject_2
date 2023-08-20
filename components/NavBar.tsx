import Link from 'next/link';
import Image from 'next/image'
import { NavLinks } from '@/constants';
import AuthProviders from './AuthProviders';
const NavBar = () => {
const session = undefined

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/" className="rounded-full hover:bg-slate-200 transition">
          <Image
            className="hover:scale-90 transition"
            alt="logo"
            src="/logo.png"
            width={50}
            height={43}
          />
        </Link>
        <ul
          className="
         xl:flex 
         hidden
         text-small
         gap-7
         "
        >
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session ? (
          <>
            UserPhoto
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
