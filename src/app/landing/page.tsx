/**
 * /landing — explicit landing page route.
 * The root page.tsx already serves the landing page at "/".
 * This file satisfies the Next.js route requirement for the /landing segment
 * (required by the layout.tsx in this directory) and redirects to root.
 */
import { redirect } from 'next/navigation';

export default function LandingRedirect() {
  redirect('/');
}
