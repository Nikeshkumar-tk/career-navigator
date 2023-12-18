"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signIn, signOut, useSession } from "next-auth/react";
import MainNav from "./main-nav";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";


function Navbar() {
  const session = useSession();
  console.log(session.data)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <nav className="flex items-center gap-3">
            {/* <Link
                to={appConfig.links.twitter}
              > */}
            {/* <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "w-9 px-0"
                  )}
                >
                  <Icons.twitter className="h-3 w-3 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div> */}
            {/* </Link> */}
            <ModeToggle />
            {/* {session.status === "unauthenticated" && (
              <Button onClick={() => signIn("google")}>Sign In</Button>
            )} */}
            {session.status === "authenticated" && (
              <Popover>
                <PopoverTrigger>
                  <div className="flex items-center gap-2 cursor-pointer p-1 border-none rounded-md">
                    <Avatar className="h-8 w-8">
                      <AvatarImage sizes="" src={session.data.user?.image!} />
                    </Avatar>
                    <p className="text-muted-foreground">{session.data.user?.name}</p>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="">
                  <p>
                    <span className="block text-muted-foreground text-sm">
                      Signed in as
                    </span>
                    {session.data.user.email}
                  </p>
                  <p className="mt-2 cursor-pointer hover:text-gray-300">
                    Profile
                  </p>
                  <p className="mt-2 text-red-500 cursor-pointer hover:text-red-400" onClick={() => signOut()}>
                    Logout
                  </p>
                </PopoverContent>
              </Popover>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
