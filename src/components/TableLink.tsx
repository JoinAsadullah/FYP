'use client'
import { useEffect } from "react";
import { useRouter } from 'next/navigation';


export default function TableLink({}: Readonly<{}>) {
    const router = useRouter();
    useEffect(() => {
        const studentRow = document.querySelectorAll("#students-table>tr");

        studentRow.forEach((row) => {
            row.addEventListener("click", (e) => {
                const uid = row.getAttribute("id");
                const url = `/uid/${uid}`;
                router.push(url);
            });
        });

    }, []);

  return (
    <>
    </>
  );
}