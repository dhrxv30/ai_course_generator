import React from 'react';

const ChapterList = ({ course }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Chapters</h2>
      <div className="space-y-4">
        {course?.courseOutput?.chapters?.map((chapter, index) => (
          <div key={index} className="flex items-start gap-4">
            
            <div className='flex gap-5 border p-5 rounded-lg w-full'>
            <div className="bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center text-lg">
              {index + 1}
            </div>
              <h3 className="font-medium ">{chapter.chapterName}</h3>
              <p className="text-sm text-gray-600">{chapter.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
