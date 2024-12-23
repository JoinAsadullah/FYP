import data from '@/components/data'
import Link from 'next/link'


export default async function Page({
    params,
  }: {
    params: Promise<{ letter: string, city: string }>
  }) {
    const letter = (await params).letter
    const city = (await params).city.replaceAll("-", " ")

    const universities = data
    .filter(data => data.City_name === city) // Find the city
    .flatMap(data => data.Universities.map(uni => uni.University)); // Extract university names

    return (

        <section className=" bg-white relative py-20 md:mx-20 mx-4">
      <h2 className="my-2 text-xl font-semibold text-gray-800">Choose your Institute:</h2>
      <section className="grid grid-cols-2 sm:grid-cols-4  md:grid-cols-8 gap-4">

        {universities.map((university, index) => (
          <Link
            className="rounded-lg border text-card-foreground shadow-sm bg-gray-200"
            data-v0-t="card"
            href={`/${letter}/${city.replaceAll(" ", "-")}/${university.replaceAll(" ", "-")}`}
            key={university}
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-left whitespace-wrap text-sm font-semibold leading-none tracking-tight">
                {university}
              </h3>
            </div>
          </Link>
        ))}
      </section>
    </section>
    )
  }