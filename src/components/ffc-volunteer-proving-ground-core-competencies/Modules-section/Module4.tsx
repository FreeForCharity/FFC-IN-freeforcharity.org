import React from 'react'
import Modulecard from '@/components/ui/Module-card'

const Module4 = () => {
  return (
    <Modulecard title="Module 4: MS-700 Teams Administration Fundamentals" id="module4">
      <p className="font-[500]">
        <span className="font-[700]">Objective:</span> To gain a foundational understanding of
        Microsoft Teams administration, including the management of teams, channels, meetings, and
        collaboration features, aligned with the MS-700 certification path.
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Estimated Time to Complete:</span> 8 - 12 Hours
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Why This Matters:</span> As our central collaboration hub,
        Teams requires proper governance to be effective and secure. Volunteers with a deeper
        understanding of its structure can help manage channels, configure meeting policies, and
        troubleshoot issues, making our entire operation more efficient.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Recommended Training Resources</h2>

      <ul className="list-disc list-inside space-y-2 text-gray-700 font-[500]">
        <li>
          <a
            href="https://support.microsoft.com/en-us/office/microsoft-teams-video-training-4f108e54-240b-4351-8084-b1089f0d21d7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Microsoft Teams Quick Start Video Training (Official)
          </a>{' '}
          - A quick, official overview of the essential features.
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/en-us/training/paths/get-started-managing-microsoft-teams/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            MS-700 Get started with managing Microsoft Teams - Training | Microsoft Learn
          </a>{' '}
          - The official entry-level learning path from Microsoft for Teams administration.
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ms-700"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Official MS-700 Study Guide
          </a>{' '}
          - A detailed guide from Microsoft that outlines all exam objectives and is essential for
          understanding the core concepts.
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

      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <p className="text-gray-800 font-[500]">
          After completing the training, be prepared to explain the difference between a{' '}
          <span className="font-[700]">standard</span>, a{' '}
          <span className="font-[700]">private</span>, and a{' '}
          <span className="font-[700]">shared channel</span> in Teams, and provide a use case for
          each.
        </p>
      </div>
    </Modulecard>
  )
}

export default Module4
