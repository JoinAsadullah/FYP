'use client'


import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Load the Google Tag Manager script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-NFBWBNWFKR';
    document.head.appendChild(script);

    // Initialize the gtag function and configuration
    const initGtag = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-NFBWBNWFKR');
    };

    script.onload = initGtag;

  }, []);

  const handleSearch = (e: React.FormEvent) => {
    
    e.preventDefault()
    if (/^[a-zA-Z0-9]{7}$/.test(searchTerm)) {
      router.push(`/uid/${searchTerm}`);
      setSearchTerm("")

    } else {
      alert('Please enter a valid 7-digit alphanumeric UID.');
    }
  }



  return (
    <html lang="en">
      
      <Analytics/>
      <body className={inter.className}>
        <main className=" h-svh">

          <div className="fixed top-0 w-full bg-gray-200 z-50 ">
          <section className="bg-gray-100 h-20 flex justify-between items-center">
            <Link href="/">
            <div className=" ml-4 flex justify-between items-center">
              <h1 className="font-extralight text-3xl text-green-600 text-outline">QAS</h1>
              <h1 className="font-black text-gray-300">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
              <Image src="/images/pmylogo.png" alt="pmy logo" width={150} height={100} />
            </div>
            </Link>
            <div className="w-12 h-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                  className="fill-transparent"
                />
                <path
                  d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                  className="fill-slate-400 dark:fill-slate-500"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                  className="fill-slate-400 dark:fill-slate-500"
                />
              </svg>
            </div>
          </section>

          <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSearch} className="flex items-center ">
        <input
          type="text"
          placeholder="Search UID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(e);
            }}}
          className="w-[50%] flex-grow px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </form>
    </div></div>
<div className="mt-[120px]">
          {children}
          </div>
        <div>
          <footer className="fixed bottom-0 w-full bg-gray-200 py-2 flex justify-center items-center">
            <p className="text-gray-500 text-center text-sm"> QAS © 2025. All rights reserved.<br/>Made with 💚 by <Link className="text-blue-600" href={"https://www.linkedin.com/in/iammqaisar/"}>Qaisar</Link>, <Link className="text-blue-600" href={"https://www.asadullah.dev"}>Asadullah</Link> and <Link className="text-blue-600" href={"https://github.com/SobanJ"}>Soban</Link></p>
          </footer>
        </div>
        </main>
      </body>
    </html>
  );
}
