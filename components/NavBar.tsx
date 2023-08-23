import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
import { getCurrentuser } from "@/lib/session";

import ProfileMenu from "./Profile";

const NavBar = async () => {
  const session = await getCurrentuser();

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
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
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
