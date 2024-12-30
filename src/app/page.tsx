import type { Metadata } from "next";
import Link from 'next/link'


export const metadata: Metadata = {
  title: "QAS - Laptop award Prediction for PMYP",
  description: "Quantification and Analysis System (QAS) for Prediction of Prime Minister Youth Program Laptop Scheme. This system is designed to predict the probability of students getting the PMYP Laptop Award."
};
export default function Home() {

  const letters = "ABCDFGHIJKLMNOPQRST".split("");
  return (
    <section className=" bg-white relative py-20 md:mx-20 mx-4">
      <h2 className="my-2 text-xl font-semibold text-gray-800">Select City&apos;s Letter</h2>
      <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">

        {letters.map((letter, index) => (
          <Link
            className="rounded-lg border text-card-foreground shadow-sm bg-gray-200"
            data-v0-t="card"
            href={`/${letter.toLowerCase()}`}
            key={letter}
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-left text-gray-700 whitespace-wrap text-2xl font-semibold leading-none tracking-tight">
                {letter}
              </h3>
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
}
