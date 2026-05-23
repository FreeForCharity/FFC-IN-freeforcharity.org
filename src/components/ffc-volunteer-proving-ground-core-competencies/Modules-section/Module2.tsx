import React from 'react'
import Modulecard from '@/components/ui/Module-card'

const Module2 = () => {
  return (
    <Modulecard title="Module 2: Introduction to AI Assistants" id="module2">
      <p className="font-[500]">
        <span className="font-[700]">Objective:</span> To understand the basic capabilities of
        generative AI tools and learn how to write effective prompts to boost productivity.
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Estimated Time to Complete:</span> 2 - 4 Hours
      </p>

      <p className="mt-6 font-[500]">
        <span className="font-[700]">Why This Is Second:</span> AI assistants are powerful learning
        accelerators. Mastering them early will drastically speed up your learning process for all
        subsequent modules. When you encounter a new term, product, or tool in this training, your
        first step should be to ask an AI assistant to explain it to you. This practice of
        self-directed learning is a critical skill for all FFC volunteers.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Recommended Training Resources</h2>

      <ul className="list-disc list-inside space-y-2 text-gray-700 font-[500]">
        <li>
          <a
            href="https://learn.microsoft.com/en-us/copilot/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Get Started with Microsoft Copilot (Official Tutorial)
          </a>
        </li>
        <li>
          <a
            href="https://gemini.google/about/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            About Gemini (Official Google Page)
          </a>
        </li>
        <li>
          Mobile Apps (Google Play Store):{' '}
          <a
            href="https://play.google.com/store/apps/details?id=com.microsoft.copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Microsoft Copilot
          </a>{' '}
          |{' '}
          <a
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.bard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Google Gemini
          </a>
        </li>
      </ul>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Your Proficiency Task</h2>

      <div className="mt-4 p-4 bg-gray-50 border-l-4 border-red-600 rounded-r-lg">
        <p className="text-gray-800 font-[500]">
          After completing the training, be prepared to list the four key elements of an effective
          prompt for an AI assistant.
        </p>
      </div>
    </Modulecard>
  )
}

export default Module2
