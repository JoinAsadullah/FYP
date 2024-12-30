import Image from 'next/image'
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL || '');


export default async function page({
  params,
}: {
  params: Promise<{ uid: string }>
}) {
  const uid = (await params).uid
  const studentsData = await sql`
  SELECT *
FROM students
WHERE "uid" = ${/^[a-zA-Z0-9]{7}$/.test(uid.replace(" ", ""))? uid : ""};
`
   if(studentsData.length === 0) {
    return(
      <h1>No data is found.</h1>
    )
   }

    const student = {
      uid: uid,
      name: studentsData[0].name,
      university: studentsData[0].university,
      program: studentsData[0].program,
      year: studentsData[0].year,
      cgpa: studentsData[0].cgpa,
      campus: studentsData[0].campus,
      department: studentsData[0].department,
      probability: studentsData[0].probability.replace('%', ''),
      sugestions: studentsData[0].suggestions,
      status: studentsData[0].prediction,
      avatar: "/images/avatar.jpg"
    }


    
      const getStatusColor = (cgpa: number) => {
        if (cgpa >= 3.5) return 'text-green-600'
        if (cgpa >= 3.0) return 'text-blue-600'
        return 'text-yellow-600'
      }


  
    return (
      <div className="min-h-screen bg-gray-50 py-8 pb-20">
        
        <div className="max-w-3xl mx-auto p-6">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-6">
        {/* Header Section with Avatar and Basic Info */}
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {student.avatar ? (
              <Image
                src={student.avatar}
                alt="Student avatar"
                fill
                className="object-cover opacity-30"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">
                {student.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">UID:</div>
                <div className="font-medium">{student.uid}</div>
              </div>
              <div className="max-md:col-span-2">
                <div className="text-sm text-gray-500">Name:</div>
                <div className="font-medium">{student.name}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-gray-500">University:</div>
                <div className="font-medium">{student.university}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Info Grid */}
        <div className="grid max-md:grid-cols-2 grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Campus:</div>
              <div className="font-medium text-wrap">{student.campus}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Dept:</div>
              <div className="font-medium">{student.department}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Program:</div>
              <div className="font-medium">{student.program}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Year:</div>
              <div className="font-medium">{student.year}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">CGPA:</div>
              <div className="font-medium">{student.cgpa}</div>
            </div>

          </div>            <div>
              <div className="text-sm text-gray-500">Status:</div>
              <div className={`font-medium ${getStatusColor(student.cgpa)}`}>
                {student.status}
              </div>
            </div>
        </div>

        {/* Probability and Suggestion Section */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div>
            <div className="text-sm text-gray-500">Probability:</div>
            <div className="relative w-full h-4 bg-white rounded-full mt-2">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r  rounded-full transition-all duration-500 ease-out"
                style={{ width:`${student.probability}%` }}
              >
                              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#F5C900] to-[#183182]  rounded-full transition-all duration-500 ease-out"
                style={{ width:`${student.probability}%` }}
              />
              </div>
            </div>
            <div className="text-right text-sm font-medium text-blue-600 mt-1">
              {student.probability}%
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500">Suggestion:</div>
            <div className="font-medium text-gray-900 mt-1">
              {student.sugestions}
            </div>
          </div>
        </div>
      </div>
    </div>

      </div>
    )
  }
  