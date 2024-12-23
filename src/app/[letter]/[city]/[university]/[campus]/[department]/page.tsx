import data from '@/components/data'
import Link from 'next/link'


export default async function Page({
    params,
  }: {
    params: Promise<{ letter: string, city: string, university: string, campus: string, department: string }>
  }) {
    const letter = (await params).letter
    const city = (await params).city.replaceAll("-", " ")
    const university = (await params).university.replaceAll("-", " ")
    const campus = (await params).campus.replaceAll("-", " ")
    const department = (await params).department.replaceAll("-", " ")

    const departments = data
    .filter(data => data.City_name === city)
    .flatMap(data => data.Universities.filter(data => data.University === university))
    .flatMap(data => data.Campuses.filter(data => data.Campus === campus))
    .flatMap(data => data.Departments.map(uni => uni.Department));

    return (

        <section className=" bg-white relative py-20 md:mx-20 mx-4">
      <h2 className="my-2 text-xl font-semibold text-gray-800">Choose your Degree Program:</h2>
      <section className="grid grid-cols-2 sm:grid-cols-4  md:grid-cols-8 gap-4">


          <Link
            className="rounded-lg border text-card-foreground shadow-sm bg-gray-200"
            data-v0-t="card"
            href={`/${letter}/${city.replaceAll(" ", "-")}/${university.replaceAll(" ", "-")}/${campus.replaceAll(" ", "-")}/${department.replaceAll(" ", "-")}/16`}
            key={department}
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-left whitespace-wrap text-sm font-semibold leading-none tracking-tight">
                16
              </h3>
            </div>
          </Link>

          <Link
            className="rounded-lg border text-card-foreground shadow-sm bg-gray-200"
            data-v0-t="card"
            href={`/${letter}/${city.replaceAll(" ", "-")}/${university.replaceAll(" ", "-")}/${campus.replaceAll(" ", "-")}/${department.replaceAll(" ", "-")}/18`}
            key={department}
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-left whitespace-wrap text-sm font-semibold leading-none tracking-tight">
                18
              </h3>
            </div>
          </Link>


      </section>
    </section>
    )
  }