import React from 'react'
import Modulecard from '@/components/ui/Module-card'

const Module1 = () => {
  return (
    <Modulecard title="Module 1: LastPass - Our Security Standard" id="module1">
      <p className="font-500">
        <span className="font-[700]">Objective:</span> To understand the importance of password
        security and how to use LastPass to manage credentials securely.
      </p>

      <p className="mt-6">
        <span className="font-[700]">Estimated Time to Complete:</span> 1 - 2 Hours
      </p>

      <p className="mt-6">
        <span className="font-[700]">Why This Is First:</span> We handle sensitive information for
        our non-profit clients. Protecting that data is our highest priority. LastPass is the first
        and most critical training module because it is the secure foundation upon which all other
        system access is built. All passwords for the other training modules and FFC services will
        be stored in and managed by LastPass.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Recommended Training Resources</h2>

      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>
          <a
            href="https://www.youtube.com/watch?v=example-lastpass-101"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-medium"
          >
            LastPass 101: How to Use LastPass (Official Video)
          </a>{' '}
          - The best starting point for understanding your vault.
        </li>
        <li>
          <a
            href="https://usertraining.lastpass.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-medium"
          >
            LastPass User Training & Resources (Official)
          </a>{' '}
          - A comprehensive page with guides and videos for all features.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
        LastPass Authenticator for Multi-Factor Authentication (MFA)
      </h2>

      <p className="mt-4">
        For enhanced security, we use MFA. The LastPass Authenticator app is a required tool for
        verifying your identity when logging into secure systems.
      </p>

      <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
        <li>
          <a
            href="https://support.lastpass.com/s/document-item?language=en_US&bundleId=lastpass&topicId=LastPass%2FLastPass_Authenticator.html&_LANG=enus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-medium"
          >
            What is the LastPass Authenticator App? (Official Guide)
          </a>
        </li>
        <li>
          Mobile Apps:{' '}
          <a
            href="https://play.google.com/store/apps/details?id=com.lastpass.authenticator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Google Play Store
          </a>{' '}
          |{' '}
          <a
            href="https://apps.apple.com/us/app/lastpass-authenticator/id1079110004"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Apple App Store
          </a>
        </li>
      </ul>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Your Proficiency Task</h2>

      <div className="mt-4 p-4 bg-gray-50 border-l-4 border-red-600 rounded-r-lg">
        <p className="text-gray-800 font-medium">
          After completing the training, be prepared to explain why sharing passwords via email or
          text is a security risk.
        </p>
      </div>
    </Modulecard>
  )
}

export default Module1
