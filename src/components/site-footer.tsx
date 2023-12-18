import Link from "next/link"

import { appConfig } from "@/config/app"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SubscribeToNewsletterForm } from "@/components/forms/subscribe-to-newsletter-form"
import { Icons } from "@/components/icons"
// import { ModeToggle } from "@/components/layouts/mode-toggle"
import { Shell } from "@/components/shells/shell"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell>
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex justify-between gap-10 lg:flex-row lg:gap-20"
        >
          <section
            id="footer-branding"
            aria-labelledby="footer-branding-heading"
          >
            <Link href="/" className="w-fit flex items-center space-x-2">
              <Icons.logo className="h-6 w-6" aria-hidden="true" />
              <span className="font-bold">{appConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </section>
          <section
            id="newsletter"
            aria-labelledby="newsletter-heading"
            className="space-y-3 self-end"
          >
            <h4 className="text-base text-muted-foreground w-[25rem] font-medium">
            Career Navigator is a comprehensive platform designed to guide students toward successful and independent career choices. By providing tailored assessments, personalized insights, and valuable resources, it empowers students to make informed decisions, aligning their skills and passions with diverse career opportunities for a fulfilling and prosperous future.            </h4>
            {/* <SubscribeToNewsletterForm /> */}
          </section>
        </section>
      </Shell>
    </footer>
  )
}
