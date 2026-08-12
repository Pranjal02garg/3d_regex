import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="shell pt-16 md:pt-28">
      <div className="max-w-xl">
        <p className="eyebrow">404</p>
        <h1 className="display mt-5 text-h1">That page does not exist.</h1>
        <p className="mt-6 text-lead text-fg-2">
          It may have moved, or the link may be wrong. The five remedies and the ingredient index
          are the two things most people are looking for.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/shop">See the range</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back to the homepage
          </ButtonLink>
        </div>
        <p className="mt-10 text-[0.9375rem] text-fg-3">
          Looking for a batch certificate?{" "}
          <Link href="/verify" className="link-underline text-brand">
            Verify a batch code
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
