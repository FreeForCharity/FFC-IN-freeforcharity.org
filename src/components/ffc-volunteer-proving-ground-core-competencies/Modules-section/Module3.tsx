import React from 'react'
import Modulecard from '@/components/ui/Module-card'

const Module3 = () => {
  return (
    <Modulecard title="Module 3: MS-900 Microsoft 365 Fundamentals" id="module3">
      <p className="font-[500]">
        <span className="font-[700]">Objective:</span> To gain a foundational knowledge of Microsoft
        365 cloud services, including its apps, security, compliance, and pricing models.
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Estimated Time to Complete:</span> 12 - 16 Hours
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Why This Matters:</span> Free For Charity’s entire operational
        infrastructure is built on the Microsoft 365 platform. A fundamental understanding of this
        ecosystem is critical for every volunteer to work efficiently, securely, and understand the
        capabilities of the tools we use every day.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Recommended Training Resources</h2>

      <ul className="list-disc list-inside space-y-2 text-gray-700 font-[500]">
        <li>
          <a
            href="https://learn.microsoft.com/en-us/training/courses/ms-900t01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Microsoft Learn Self-Paced Course (Official)
          </a>{' '}
          - This is the primary, self-paced learning path provided directly by Microsoft.
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ms-900"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Official MS-900 Study Guide
          </a>{' '}
          - A detailed guide from Microsoft that outlines all exam objectives.
        </li>
      </ul>

      {/* Blue Callout Box */}
      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <p className="font-[700] text-blue-900">A Note on Certification:</p>
        <p className="mt-2 text-blue-800 font-[500]">
          Only completing the learning paths above is required to start volunteering. However,
          funding for the official Microsoft certification exam may be provided on a case-by-case
          basis, depending on available funds and volunteer commitment.
        </p>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Your Proficiency Task</h2>

      <div className="mt-4 p-4 bg-gray-50 border-l-4 border-red-600 rounded-r-lg">
        <p className="text-gray-800 font-[500]">
          After completing the training, be prepared to explain the primary difference between{' '}
          <span className="font-[700]">Microsoft 365</span> and{' '}
          <span className="font-[700]">Office 365</span>.
        </p>
      </div>
    </Modulecard>
  )
}

export default Module3
