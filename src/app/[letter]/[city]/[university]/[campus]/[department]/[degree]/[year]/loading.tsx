export default function TableSkeleton() {
  // Create an array of 5 items for skeleton rows
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div className="container py-20 md:mx-20 mx-4">
      {/* Skeleton for the title */}
      <div className="h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              {/* Skeleton headers */}
              <th scope="col" className="px-6 py-3 w-[50px]">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </th>
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
                {/* Sr. No. */}
                <td className="px-6 py-4">
                  <div className="h-4 w-6 bg-gray-200 rounded animate-pulse" />
                </td>
                {/* UID */}
                <td className="px-6 py-4">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </td>
                {/* Name */}
                <td className="px-6 py-4">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </td>
                {/* Father Name */}
                <td className="px-6 py-4">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </td>
                {/* Roll No */}
                <td className="px-6 py-4">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </td>
                {/* Program */}
                <td className="px-6 py-4">
                  <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                </td>
                {/* Year of Study */}
                <td className="px-6 py-4">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                </td>
                {/* Semester */}
                <td className="px-6 py-4">
                  <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                </td>
                {/* CGPA */}
                <td className="px-6 py-4">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                </td>
                {/* Percentage */}
                <td className="px-6 py-4">
                  <div className="h-4 w-14 bg-gray-200 rounded animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

