import data from '@/components/data'
import { neon } from "@neondatabase/serverless"
import StudentsTable from '@/components/StudentsTable'


const sql = neon(process.env.DATABASE_URL || '');


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

  const validatedDegree =   degree.replace(/\D/g, '')
  const validatedYear = year.replace(/\D/g, '')
  const validatedDepartmentValue = departmentValue.replace(/\D/g, '')
  
  const studentsData = await sql`
    SELECT 
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
WHERE "department_value" = ${validatedDepartmentValue}
  AND "degree" = ${validatedDegree}
  AND ("year" = ${validatedYear} OR "year" = ${year == "5" ? "-1" : ""}) ;`

  return (
    <StudentsTable studentsData={studentsData} />
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
    .replaceAll('_comma_', ",")
    .replaceAll('_dot_', ".")
};