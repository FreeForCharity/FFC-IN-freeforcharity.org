import React from 'react'
import Modulecard from '@/components/ui/Module-card'

const Module5 = () => {
  return (
    <Modulecard title="Module 5: Microsoft OneDrive – Our Shared File System" id="module5">
      <p className="font-[500]">
        <span className="font-[700]">Objective:</span> To learn how to access, organize, and
        securely share documents within the FFC ecosystem.
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Estimated Time to Complete:</span> 2 Hours
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Why This Matters:</span> OneDrive is our single source of truth
        for all official documents, from SOPs to client-facing materials. Using OneDrive correctly
        prevents version control issues and ensures everyone is working from the most current
        information.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Recommended Training Resources</h2>

      <ul className="list-disc list-inside space-y-2 text-gray-700 font-[500]">
        <li>
          <a
            href="https://support.microsoft.com/en-us/office/video-onedrive-basics-fe8aab1e-3d1a-4a65-a9b6-77b79b6dbb30"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            OneDrive Video Basics (Official)
          </a>{' '}
          - A short, visual introduction to the platform.
        </li>
        <li>
          <a
            href="https://adoption.microsoft.com/files/onedrive/Microsoft-OneDrive-quick-start-guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            OneDrive Quickstart Guide (PDF)
          </a>{' '}
          - A detailed guide you can save and reference later.
        </li>
        <li>
          <a
            href="https://support.microsoft.com/en-us/onedrive"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            OneDrive Help & Learning Center (Official)
          </a>{' '}
          - The main portal for all OneDrive documentation and tutorials.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Your Proficiency Task</h2>

      <div className="mt-4 p-4 bg-gray-50 border-l-4 border-green-600 rounded-r-lg">
        <p className="text-gray-800 font-[500]">
          After completing the training, be prepared to describe the steps to share a file and grant{' '}
          <span className="font-[700]">“View Only”</span> permissions.
        </p>
      </div>
    </Modulecard>
  )
}

export default Module5
