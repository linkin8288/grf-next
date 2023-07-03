// Call getCurrentUser() function from lib file to get session (user data).
// Navbar is a server side component so you can do async call.

// Server-side rendering (SSR) allows you to pre-render your 
// pages with data fetched from external 
// sources or APIs, providing better performance and SEO optimization.

// This pre-rendering process allows the server to generate the HTML 
// content of the pages and include the necessary data before sending them to the clients.

// With Client-Side Rendering (CSR), the client's device or browser needs to download 
// the JavaScript bundle and execute it to render the page.

import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "@/constant";
import { getCurrentUser } from "@/lib/session";

import AuthProviders from "./AuthProviders";
import Button from "./Button";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser()

  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            width={116}
            height={43}
            alt='logo'
          />
        </Link>

        {/* Map the navbarlink */}
        <ul className='xl:flex hidden text-small gap-7'>
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      {/* Render conditionally based on session whether user log in */}
      <div className='flexCenter gap-4'>
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">
              <Button title='Share work' />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
