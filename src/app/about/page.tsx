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
      <h2 className="my-2 text-xl font-semibold text-gray-800">About</h2>
              <p className="text-left text-gray-700 whitespace-wrap font-regular leading-none tracking-normal">
                This system is designed to predict the probability of students getting the PMYP Laptop Award.
              </p>
    </section>
  );
}
