export const dynamic = "force-dynamic";

import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/next-auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Balancer from "react-wrap-balancer";
export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (session && !(session?.user.isAccountConfirmed)) {
    redirect("/new-user");
  }

  // session?.user.isAccountConfirmed && ((user?.attendedQuizs?.length ?? []) === 0)
  //   ? redirect("/quiz")
  //   : redirect("/lobby");

  return (
    <div className="">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto h-[80vh] flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 py-12 text-center md:pt-32">
        <Balancer
          as="h1"
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          CareerNavigator: Your Path to Success Begins Here.
        </Balancer>
        <Balancer className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Discover Your Path: Empowering Students for Future Success.
        </Balancer>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/quiz" className={cn(buttonVariants())}>
            Take Quiz
            <span className="sr-only">Take Quiz</span>
          </Link>
          <Link
            href="/careers"
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}>
            Check Careers
            <span className="sr-only">Check Careers</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
