import Link from 'next/link'


export default async function Page({
    params,
  }: {
    params: Promise<{ letter: string, city: string, university: string, campus: string, department: string, degree: string }>
  }) {
    const letter = (await params).letter
    const city = (await params).city.unslugify()
    const university = (await params).university.unslugify()
    const campus = (await params).campus.unslugify()
    const department = (await params).department.unslugify()
    const degree = (await params).degree.unslugify()



    return (

        <section className=" bg-white relative py-20 md:mx-20 mx-4">
      <h2 className="my-2 text-xl font-semibold text-gray-800">Choose your Year of Study:</h2>
      <section className="grid grid-cols-2 sm:grid-cols-4  md:grid-cols-8 gap-4">

      {[...Array(5)].map((_, index) => (
        <Link
            className="rounded-lg border text-card-foreground shadow-sm bg-gray-200"
            data-v0-t="card"
            href={`/${letter}/${city.slugify()}/${university.slugify()}/${campus.slugify()}/${department.slugify()}/${degree.slugify()}/${index+1}`}
            key={index}
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-left whitespace-wrap text-sm font-semibold leading-none tracking-tight">
                {index+1 + (index==4 ? " / Passed out" : " Year")}
              </h3>
            </div>
          </Link>
      ))}
      </section>
    </section>
    )
  }


  declare global {
    interface String {
      slugify(): string;
      unslugify(): string;
    }
  }
  
// Add slugify method to String prototype
String.prototype.slugify = function () {
  return this.replaceAll(' ', '_-_')    // Replace all spaces with hyphens
             .replaceAll('&', '_and_')  // Replace all '&' with 'and'
             .replaceAll('/', '_or_') // Replace all '/' with 'or'
             .replaceAll(',', '_comma_')
             .replaceAll('.', '_dot_')
};

// Add unslugify method to String prototype
String.prototype.unslugify = function () {
  return this.replaceAll('_-_', ' ')    // Replace all hyphens with spaces
             .replaceAll('_and_', '&')  // Replace all 'and' with '&'
             .replaceAll('_or_', '/')  // Replace all 'or' with '/'
             .replaceAll('_comma_' , ",")
             .replaceAll('_dot_' , ".")
};