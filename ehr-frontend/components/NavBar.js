'use client';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-2">
      <div className="max-w-5xl mx-auto flex gap-4">
        <Link href="/" className="font-bold hover:underline">
          Home
        </Link>
        <Link href="/patient/new" className="hover:underline">
          Add Patient
        </Link>
      </div>
    </nav>
  );
}
