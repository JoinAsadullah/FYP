'use client'

import data from '@/components/data'
import Link from 'next/link'
import { neon } from "@neondatabase/serverless"
import TableLink from '@/components/TableLink'
import copy from 'clipboard-copy'
import CopyIcon from '@/components/CopyIcon'
import { useRouter } from 'next/navigation';
import { useState } from 'react';


type Student = {
    uid: string
    name: string
    father_name: string
    roll_no: string
    program: string
    year_of_study: number
    semester: number
    cgpa: number
    percentage: number
  }
  



export default function StudentsTable({ studentsData }: any) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
        const uid = e.currentTarget.getAttribute("id");
        const url = `/uid/${uid}`;
        router.push(url);
    }

    const onChange = (search: string) => {
        setSearch(search);
    }


    return (
        <section className=" bg-white relative py-20 md:mx-20 mx-4"><TableLink />


                <h2 className="text-xl font-semibold text-gray-800">List of students</h2>
                <p className='text-green-500 text-[14px]'>(Click on Your Row to view Details and Prediction.)</p>
                <div className="h-10 mt-4">
                <input
        type="text"
        value={search}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search name..."
        className="absolute right-0 w-[10rem] px-4 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-2 py-3 w-[50px]">Sr</th>
                            <th scope="col" className="px-2 py-3">UID</th>
                            <th scope="col" className="px-2 py-3">Name</th>
                            <th scope="col" className="px-2 py-3">Father Name</th>
                            <th scope="col" className="px-2 py-3">Roll No</th>
                            <th scope="col" className="px-2 py-3">Program</th>
                            <th scope="col" className="px-2 py-3">Year of Study</th>
                            <th scope="col" className="px-2 py-3">Semester</th>
                            <th scope="col" className="px-2 py-3">CGPA</th>
                            <th scope="col" className="px-2 py-3">Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsData.length === 0 ? (
                            <tr><td colSpan={10} className="text-center">No data found...</td></tr>
                        ) : (
                            studentsData
                              .filter((student:Student) =>{
                                if(search === "") return student;
                                return(
                                student.name.toLowerCase().includes(search.toLowerCase()))}
                              )
                            .map((student:Student, index: number) => (
                            <tr onClick={handleRowClick} id={student.uid} key={student.uid} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b h-10 hover:bg-gray-100 cursor-pointer`}>
                                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
                                <td className="px-2 py-4 whitespace-nowrap"><p className='inline'>{student.uid}</p> <CopyIcon text={student.uid}/></td>
                                <td className="px-2 py-4 whitespace-nowrap">{student.name}</td>
                                <td className="px-2 py-4 whitespace-nowrap">{student.father_name}</td>
                                <td className="px-2 py-4 whitespace-nowrap">{student.roll_no}</td>
                                <td className="px-2 py-4 whitespace-nowrap">{student.program}</td>
                                <td className="px-2 py-4 whitespace-nowrap">{student.year_of_study}</td>
                                <td className="px-2 py-4 whitespace-nowrap">{student.semester}</td>
                                <td className="px-2 py-4 whitespace-nowrap">{student.cgpa}</td>
                                <td className="px-2 py-4 whitespace-nowrap">{student.percentage}%</td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>



        </section>
    );
}
