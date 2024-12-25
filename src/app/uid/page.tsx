import Image from 'next/image'


export default function Page() {
    const student = {
      uid: "ST123456",
      name: "John Doe",
      university: "Example University",
      program: "Computer Science",
      year: 3,
      cgpa: 3.75,
      campus: "Main Campus",
      department: "Computing",
      probability: 90,
      avatar: "/placeholder.svg?height=96&width=96"
    }

    const getAwardSuggestion = (probability: number) => {
        if (probability >= 90) return "You're probable to achieve the Laptop Award."
        if (probability >= 70) return "You have a good chance for the Laptop Award."
        return "Keep improving to qualify for the Laptop Award."
      }
    
      const getStatusColor = (cgpa: number) => {
        if (cgpa >= 3.5) return 'text-green-600'
        if (cgpa >= 3.0) return 'text-blue-600'
        return 'text-yellow-600'
      }
    
      const getStatus = (cgpa: number) => {
        if (cgpa >= 3.5) return 'Excellent'
        if (cgpa >= 3.0) return 'Good'
        return 'Average'
      }

  
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        
        <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Header Section with Avatar and Basic Info */}
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-orange-200 flex-shrink-0">
            {student.avatar ? (
              <Image
                src={student.avatar}
                alt="Student avatar"
                fill
                className="object-cover"
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
              <div>
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
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Campus:</div>
              <div className="font-medium">{student.campus}</div>
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
              <div className="font-medium">{student.cgpa.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Status:</div>
              <div className={`font-medium ${getStatusColor(student.cgpa)}`}>
                {getStatus(student.cgpa)}
              </div>
            </div>
          </div>
        </div>

        {/* Probability and Suggestion Section */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div>
            <div className="text-sm text-gray-500">Probability:</div>
            <div className="relative w-full h-2 bg-gray-100 rounded-full mt-2">
              <div 
                className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${student.probability}%` }}
              />
            </div>
            <div className="text-right text-sm font-medium text-blue-600 mt-1">
              {student.probability}%
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500">Suggestion:</div>
            <div className="font-medium text-gray-900 mt-1">
              {getAwardSuggestion(student.probability)}
            </div>
          </div>
        </div>
      </div>
    </div>

      </div>
    )
  }
  