export default function StudentDashboardSkeleton() {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* Header Section with Avatar and Basic Info */}
          <div className="flex items-start gap-6">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-200 animate-pulse flex-shrink-0" />
            
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse mt-1" />
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse mt-1" />
                </div>
                <div className="col-span-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse mt-1" />
                </div>
              </div>
            </div>
          </div>
  
          {/* Main Info Grid */}
          <div className="grid grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse mt-1" />
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse mt-1" />
                </div>
              </div>
            ))}
          </div>
  
          {/* Probability and Suggestion Section */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
              <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/6 mt-1 ml-auto" />
            </div>
            
            <div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
              <div className="h-6 bg-gray-200 rounded animate-pulse mt-1" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  