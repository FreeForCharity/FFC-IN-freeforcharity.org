import React from 'react'
import Modulecard from '@/components/ui/Module-card'

const Module6 = () => {
  return (
    <Modulecard title="Module 6: Microsoft Planner – Task Management in Teams" id="module6">
      <p className="font-[500]">
        <span className="font-[700]">Objective:</span> To learn how to create, manage, and track
        tasks for individual and team projects using Microsoft Planner, both as a standalone app and
        within Microsoft Teams.
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Estimated Time to Complete:</span> 2 Hours
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Why This Matters:</span> Planner is our organization’s standard
        tool for task management. It provides clear visibility into project progress, clarifies
        responsibilities, and integrates directly into Teams, keeping all work-related communication
        and tasks in one place.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Recommended Training Resources</h2>

      <ul className="list-disc list-inside space-y-2 text-gray-700 font-[500]">
        <li>
          <a
            href="https://support.microsoft.com/en-us/planner"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Microsoft Planner Video Training (Official)
          </a>{' '}
          - The best starting point from Microsoft for understanding Planner’s features.
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/en-us/microsoftteams/manage-planner-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Use Planner in Microsoft Teams (Official Guide)
          </a>{' '}
          - A specific guide on how to add and use Planner as a tab in your Teams channels.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Your Proficiency Task</h2>

      <div className="mt-4 p-4 bg-gray-50 border-l-4 border-green-600 rounded-r-lg">
        <p className="text-gray-800 font-[500]">
          After completing the training, be prepared to explain the difference between a{' '}
          <span className="font-[700]">“Bucket”</span> and a{' '}
          <span className="font-[700]">“Task”</span> in Planner and how they are used for
          organization.
        </p>
      </div>
    </Modulecard>
  )
}

export default Module6
