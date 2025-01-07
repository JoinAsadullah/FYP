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
    sp.uid,
    sp.name,
    sp.father_name,
    sp.roll_no,
    d.department_name,
    dg.degree,
    pr.program,
    dg.year_of_study,
    dg.semester,
    sp.cgpa,
    sp.percentage
FROM student sp
JOIN department d ON sp.department_value = d.department_value
JOIN degree_uid dg ON sp.degree_uid = dg.degree_uid
JOIN program pr ON dg.prog_uid = pr.prog_uid
JOIN pred_uid p ON sp.pred_uid = p.pred_uid
WHERE sp.department_value = ${validatedDepartmentValue}
AND dg.degree = ${validatedDegree}
AND (dg.year_of_study = ${validatedYear} OR  dg.year_of_study =  ${validatedYear == "5" ? "-1" : "9"} );
  
  `

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