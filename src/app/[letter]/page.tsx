import data from '@/components/data'
import Link from 'next/link'


export default async function Page({
    params,
  }: {
    params: Promise<{ letter: string }>
  }) {
    const letter1 = (await params).letter

    const cityNames = data
    .filter(item => item.City_name.startsWith(letter1.toUpperCase()))
    .map(item => item.City_name)

    return (

        <section className=" bg-white relative py-20 md:mx-20 mx-4">
      <h2 className="my-2 text-xl font-semibold text-gray-800">Choose your Institute&apos;s city:</h2>
      <section className="grid grid-cols-2 sm:grid-cols-4  md:grid-cols-8 gap-4">

        {cityNames.map((cityName, index) => (
          <Link
            className="rounded-lg border text-card-foreground shadow-sm bg-gray-200"
            data-v0-t="card"
            href={`/${letter1}/${cityName.replaceAll(" ", "-")}`}
            key={cityName}
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-left whitespace-wrap text-sm font-semibold leading-none tracking-tight">
                {cityName}
              </h3>
            </div>
          </Link>
        ))}
      </section>
    </section>
    )
  }