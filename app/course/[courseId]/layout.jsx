// app/course/[courseId]/layout.jsx
export default function CourseLayout({ children }) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }