

export const dynamic = 'force-dynamic'

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { authOptions } from '@/lib/next-auth'
import { cn } from '@/lib/utils'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { getServerSession } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'
import Link from "next/link"
import { redirect, useRouter } from 'next/navigation'

export default async function Home() {

  const session = await getServerSession(authOptions)

  if (session?.user.isNewUser) redirect('/new-user')

  if (session?.user.isNewUser === false) redirect('/quiz')

  return (
    <div>
      <PageHeader className="pb-8">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        >
          🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
          <span className="sm:hidden">Style, a new CLI and more.</span>
          <span className="hidden sm:inline">
            Take Quiz Now
          </span>
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
        <PageHeaderHeading>CareerNavigator: Your Path to Success Begins Here.</PageHeaderHeading>
        <PageHeaderDescription>
          Discover Your Path: Empowering Students for Future Success.
        </PageHeaderDescription>
        <div className="flex w-screen justify-center items-center space-x-4 pb-8 pt-4 md:pb-10">
          <Link href="/" className={cn(buttonVariants())}>
            Get Started
          </Link>
          {/* <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Link> */}
        </div>
      </PageHeader>
    </div>
  )
}
