import data from '@/components/data'
import Link from 'next/link'


export default async function Page({
    params,
  }: {
    params: Promise<{ letter: string, city: string, university: string }>
  }) {
    const letter = (await params).letter
    const city = (await params).city.replaceAll("-", " ")
    const university = (await params).university.replaceAll("-", " ")

    const campuses = data
    .filter(data => data.City_name === city)
    .flatMap(data => data.Universities.filter(data => data.University === university))
    .flatMap(data => data.Campuses.map(uni => uni.Campus));

    return (

        <section className=" bg-white relative py-20 md:mx-20 mx-4">
      <h2 className="my-2 text-xl font-semibold text-gray-800">Choose your Campus:</h2>
      <section className="grid grid-cols-2 sm:grid-cols-4  md:grid-cols-8 gap-4">

        {campuses.map((campus, index) => (
          <Link
            className="rounded-lg border text-card-foreground shadow-sm bg-gray-200"
            data-v0-t="card"
            href={`/${letter}/${city.replaceAll(" ", "-")}/${university.replaceAll(" ", "-")}/${campus.replaceAll(" ", "-")}`}
            key={campus}
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-left whitespace-wrap text-sm font-semibold leading-none tracking-tight">
                {campus}
              </h3>
            </div>
          </Link>
        ))}
      </section>
    </section>
    )
  }