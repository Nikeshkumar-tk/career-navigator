"use client";

import Link from "next/link";
import { appConfig } from "@/config/app";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";

export default function MainNav() {
  const pathname = usePathname();
  return (
    <div className="mr-4 hidden md:flex">
      <Link href={"/"} className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {appConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/quiz"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/quiz")
              ? "text-foreground"
              : "text-foreground/60"
          )}>
          Quiz
        </Link>
        <Link
          href="/careers"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/careers")
              ? "text-foreground"
              : "text-foreground/60"
          )}>
          Career Info
        </Link>
        <Link
            href={"/"}
            className={cn(
              "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
            )}
          >
            Help
          </Link>
      </nav>
    </div>
  );
}
