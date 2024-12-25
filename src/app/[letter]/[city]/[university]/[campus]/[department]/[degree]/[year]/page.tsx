import data from '@/components/data'
import Link from 'next/link'
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL || '');

type Student = {
  sr: number
  uid: string
  name: string
  fatherName: string
  rollNo: string
  program: string
  yearOfStudy: number
  semester: number
  cgpa: number
  percentage: number
}

const students: Student[] = [
  {
    sr: 1,
    uid: "STU001",
    name: "John Doe",
    fatherName: "Michael Doe",
    rollNo: "R001",
    program: "Computer Science",
    yearOfStudy: 2,
    semester: 3,
    cgpa: 3.7,
    percentage: 85
  },
  {
    sr: 2,
    uid: "STU002",
    name: "Jane Smith",
    fatherName: "Robert Smith",
    rollNo: "R002",
    program: "Electrical Engineering",
    yearOfStudy: 3,
    semester: 5,
    cgpa: 3.9,
    percentage: 92
  },
  // Add more sample data as needed
]


export default async function Page({
    params,
  }: {
    params: Promise<{ letter: string, city: string, university: string, campus: string, department: string, degree: string, year: string }>
  }) {
    const letter = (await params).letter
    const city = (await params).city.unslugify()
    const university = (await params).university.unslugify()
    const campus = (await params).campus.unslugify()
    const department = (await params).department.unslugify()
    const degree = (await params).degree.unslugify()
    const year = (await params).year.unslugify()


    const departmentValue = data
    .filter(data => data.City_name === city)
    .flatMap(data => data.Universities.filter(data => data.University === university))
    .flatMap(data => data.Campuses.filter(data => data.Campus === campus))
    .flatMap(data => data.Departments.filter(data => data.Department === department))
    .flatMap(data => data.Department_value).toString();

    const studentsData = await sql`
    SELECT 
    "sr_no", 
    "uid", 
    "name", 
    "father_name", 
    "roll_no", 
    "program", 
    "year_of_study", 
    "semester", 
    "cgpa", 
    "percentage"
FROM students
WHERE "department_value" = ${departmentValue}
  AND "degree" = ${degree}
  AND "year" = ${year}

    `
    console.log(studentsData)
    return (

        <section className=" bg-white relative py-20 md:mx-20 mx-4">
      <h2 className="my-2 text-xl font-semibold text-gray-800">List of students</h2>

        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 w-[50px]">Sr</th>
              <th scope="col" className="px-6 py-3">UID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Father Name</th>
              <th scope="col" className="px-6 py-3">Roll No</th>
              <th scope="col" className="px-6 py-3">Program</th>
              <th scope="col" className="px-6 py-3">Year of Study</th>
              <th scope="col" className="px-6 py-3">Semester</th>
              <th scope="col" className="px-6 py-3">CGPA</th>
              <th scope="col" className="px-6 py-3">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student, index) => (
              <tr key={student.uid} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b hover:bg-gray-100`}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{student.sr_no}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.uid}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.father_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.roll_no}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.program}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.year_of_study}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.semester}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.cgpa}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>



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
  return this.replaceAll(' ', '-')    // Replace all spaces with hyphens
             .replaceAll('&', '_and_')  // Replace all '&' with 'and'
             .replaceAll('/', '_or_') // Replace all '/' with 'or'
             .replaceAll(',', '_comma_')
             .replaceAll('.', '_dot_')
};

// Add unslugify method to String prototype
String.prototype.unslugify = function () {
  return this.replaceAll('-', ' ')    // Replace all hyphens with spaces
             .replaceAll('_and_', '&')  // Replace all 'and' with '&'
             .replaceAll('_or_', '/')  // Replace all 'or' with '/'
             .replaceAll('_comma_' , ",")
             .replaceAll('_dot_' , ".")
};