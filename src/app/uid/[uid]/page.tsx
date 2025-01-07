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
  SELECT
    sp.uid,
    sp.name,
    sp.roll_no,
    un.university_name,
    cp.campus_name,
    pr.program,
    sp.cgpa,
    d.department_name,
    dg.year_of_study,
    pd.prediction,
    sp.probability,
    sp.suggestions 
FROM student sp
JOIN department d ON sp.department_value = d.department_value
JOIN campus cp ON d.campus_uid = cp.campus_uid
JOIN university un ON cp.university_uid = un.university_uid 
JOIN degree_uid dg ON sp.degree_uid = dg.degree_uid
JOIN program pr ON dg.prog_uid = pr.prog_uid
JOIN pred_uid pd ON sp.pred_uid = pd.pred_uid
WHERE sp.uid = ${/^[a-zA-Z0-9]{7}$/.test(uid.replace(" ", ""))? uid : ""};
`
   if(studentsData.length === 0) {
    return(
      <h1>No data is found.</h1>
    )
   }

    const student = {
      uid: uid,
      name: studentsData[0].name,
      university: studentsData[0].university_name,
      program: studentsData[0].program,
      year: studentsData[0].year_of_study,
      cgpa: studentsData[0].cgpa,
      campus: studentsData[0].campus_name,
      department: studentsData[0].department_name,
      probability: studentsData[0].probability.replace('%', ''),
      sugestions: studentsData[0].suggestions,
      status: studentsData[0].prediction,
      avatar: "/images/avatar.jpg"
    }


    
      const getStatusColor = (probability: number) => {
        if (probability >= 65) return 'text-green-600'
        if (probability >= 40) return 'text-yellow-500'
        return 'text-red-600'
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
              <div className={`font-medium ${getStatusColor(student.probability)}`}>
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
                className="overflow-x-hidden absolute left-0 top-0 h-full bg-gradient-to-r  rounded-full transition-all duration-500 ease-out"
                style={{ width:`${student.probability}%` }}
              >
                              <div 
                className=" absolute left-0 top-0 h-full bg-gradient-to-r from-[#f9d9cc] via-[#a4f4d1]  to-[#64bffb]   rounded-full transition-all duration-500 ease-out"
                style={{ width:`${100*(100/student.probability)}%` }}
              />
              </div>
            </div>
            <div className={`text-right text-sm font-medium ${getStatusColor(student.probability)} mt-1`}>
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
        <div className="text-xl font-bold text-gray-500 pt-6">ACADEMIC STANDINGS<br/> <p className="text-[13px] font-extralight text-gray-700 mt-0">(in your same dept and semester)</p> </div>

        <div className="grid max-md:grid-cols-2 grid-cols-3 gap-6 ">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Position in Campus:</div>
              <div className="font-medium text-wrap">{student.campus} </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Position in University:</div>
              <div className="font-medium">{student.program}</div>
            </div>

          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Position in City:</div>
              <div className="font-medium">{student.cgpa}</div>
            </div>

          </div> 
          
        </div>
        <div>
              <div className="text-sm text-gray-500">Position in Pakistan:</div>
              <div className="font-medium">{student.year}</div>
            </div>

      </div>
    </div>

      </div>
    )
  }
  