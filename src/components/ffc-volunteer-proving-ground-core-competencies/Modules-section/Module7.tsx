import React from 'react'
import Modulecard from '@/components/ui/Module-card'

const Module7 = () => {
  return (
    <Modulecard title="Module 7: Microsoft 365 Apps Quick Start" id="module7">
      <p className="font-[500]">
        <span className="font-[700]">Objective:</span> To learn the basic functions of the core
        Microsoft 365 web apps for document creation (Word), data analysis (Excel), and
        presentations (PowerPoint).
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Estimated Time to Complete:</span> 6 - 8 Hours
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Why This Matters:</span> These applications are the universal
        standard for creating and sharing professional documents. A baseline proficiency is
        essential for nearly every volunteer role, from writing reports to creating client-facing
        presentations.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Recommended Training Resources</h2>

      <ul className="list-disc list-inside space-y-2 text-gray-700 font-[500]">
        <li>
          <a
            href="https://support.microsoft.com/en-us#id0ebbh=web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Microsoft 365 Quick Starts (Official Hub)
          </a>{' '}
          - This single page provides access to the Quick Start guides for Word, Excel, PowerPoint,
          and more.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Your Proficiency Task</h2>

      <div className="mt-4 p-4 bg-gray-50 border-l-4 border-blue-600 rounded-r-lg">
        <p className="text-gray-800 font-[500]">
          After completing the training, be prepared to explain how you would{' '}
          <span className="font-[700]">share a document</span> from any of the Microsoft 365 web
          apps.
        </p>
      </div>
    </Modulecard>
  )
}

export default Module7
