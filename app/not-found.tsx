import Link from "next/link";
import { Shell } from "@/components/site";
export default function NotFound() {
  return (
    <Shell>
      <section className="section container center-heading">
        <span className="eyebrow">404 — PAGE NOT FOUND</span>
        <h1 style={{ fontSize: 48 }}>This page is off the paper trail.</h1>
        <p>Let’s get you back to the right place.</p>
        <Link href="/" className="button" style={{ marginTop: 30 }}>
          Back to home ↗
        </Link>
      </section>
    </Shell>
  );
}
