'use client'
import { GoogleAnalytics } from '@next/third-parties/google'


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



  const handleSearch = (e: React.FormEvent) => {
    
    e.preventDefault()
    if (/^[a-zA-Z0-9]{7}$/.test(searchTerm.replace(" ", ""))) {
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
            <Link href="/about">
            <div className="w-12 h-6 font-black text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" id="svg2" height="25" width="25" version="1.0" viewBox="-25 -25 250 250">
      <path
        id="path2382"
        d="m165.33 113.44a103.61 103.61 0 1 1 -207.22 0 103.61 103.61 0 1 1 207.22 0z"
        transform="matrix(.93739 0 0 .93739 42.143 -6.3392)"
        strokeWidth="0"
        fill="#fff"
      />
      <g id="layer1">
        <path
          fill='#4b5563'
          stroke='#4b5563'
          strokeWidth="5"
          id="path2413"
          d="m100 0c-55.2 0-100 44.8-100 100-5.0495e-15 55.2 44.8 100 100 100s100-44.8 100-100-44.8-100-100-100zm0 12.812c48.13 0 87.19 39.058 87.19 87.188s-39.06 87.19-87.19 87.19-87.188-39.06-87.188-87.19 39.058-87.188 87.188-87.188zm1.47 21.25c-5.45 0.03-10.653 0.737-15.282 2.063-4.699 1.346-9.126 3.484-12.876 6.219-3.238 2.362-6.333 5.391-8.687 8.531-4.159 5.549-6.461 11.651-7.063 18.687-0.04 0.468-0.07 0.868-0.062 0.876 0.016 0.016 21.702 2.687 21.812 2.687 0.053 0 0.113-0.234 0.282-0.937 1.941-8.085 5.486-13.521 10.968-16.813 4.32-2.594 9.808-3.612 15.778-2.969 2.74 0.295 5.21 0.96 7.38 2 2.71 1.301 5.18 3.361 6.94 5.813 1.54 2.156 2.46 4.584 2.75 7.312 0.08 0.759 0.05 2.48-0.03 3.219-0.23 1.826-0.7 3.378-1.5 4.969-0.81 1.597-1.48 2.514-2.76 3.812-2.03 2.077-5.18 4.829-10.78 9.407-3.6 2.944-6.04 5.156-8.12 7.343-4.943 5.179-7.191 9.069-8.564 14.719-0.905 3.72-1.256 7.55-1.156 13.19 0.025 1.4 0.062 2.73 0.062 2.97v0.43h21.598l0.03-2.4c0.03-3.27 0.21-5.37 0.56-7.41 0.57-3.27 1.43-5 3.94-7.81 1.6-1.8 3.7-3.76 6.93-6.47 4.77-3.991 8.11-6.99 11.26-10.125 4.91-4.907 7.46-8.26 9.28-12.187 1.43-3.092 2.22-6.166 2.46-9.532 0.06-0.816 0.07-3.03 0-3.968-0.45-7.043-3.1-13.253-8.15-19.032-0.8-0.909-2.78-2.887-3.72-3.718-4.96-4.394-10.69-7.353-17.56-9.094-4.19-1.062-8.23-1.6-13.35-1.75-0.78-0.023-1.59-0.036-2.37-0.032zm-10.908 103.6v22h21.998v-22h-21.998z"
        />
      </g>
    </svg>

            </div></Link>
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
            <p className="text-gray-500 text-center text-sm"> QAS © 2025. All rights reserved.<br/>Developed by <Link className="text-blue-600" href={"https://github.com/ProfessorHusnain/"}>Professor Husnain</Link></p>
          </footer>
        </div>
        </main>
      </body>
      <GoogleAnalytics gaId="G-NFBWBNWFKR" />
    </html>
  );
}
