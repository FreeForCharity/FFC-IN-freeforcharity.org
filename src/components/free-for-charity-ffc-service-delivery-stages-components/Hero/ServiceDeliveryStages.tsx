import React from 'react'
import Stage from './Stage'

const ServiceDeliveryStages = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="mb-[18px] pb-[8px] border-b border-[#e5e7eb] text-[24px] leading-[40px] font-[700] text-[#111827]">
        Supported Organization Establishment: Order of Operations
      </h2>
      <div>
        <Stage
          step={1}
          first={true}
          title="Initial Contact &amp; Onboarding"
          description="A charity discovers FFC services through any means (web, phone, personal referral, etc.)."
        >
          <ul className=" text-[14px] leading-[24px] font-[500] mt-[8px] text-[#374151] list-disc list-inside space-y-[10px] pb-[23px] pl-[1em]">
            <li>
              The charity navigates to the WHMCS portal and selects the “Charity Onboarding &amp;
              Validation” product.
            </li>
            <li>A full account creation and checkout process is completed (at a $0 fee).</li>
            <li>The charity answers required prompts from the FFC Intake Guide Page.</li>
            <li>Direct Link: Shopping Cart.</li>
            <li>
              The charitys Point of Contact and declared status are saved to their new account.
            </li>
          </ul>
        </Stage>

        <Stage
          step={2}
          title="FFC Validation Checks"
          description="FFC begins the validation process based on the submitted information."
        >
          <ul className=" text-[14px] leading-[24px] font-[500] mt-[8px] text-[#374151] list-disc list-inside space-y-[10px] pb-[23px] pl-[1em]">
            <li>Verify the declared status of the organization (e.g., 501c3).</li>
            <li>Review the charitys mission statement for alignment.</li>
            <li>Check external validation URLs for trust indicators.</li>
          </ul>
        </Stage>

        <Stage
          step={3}
          title="FFC Offers Services"
          description="Charities are offered services based on mission alignment and operational capacity."
        >
          <ul className=" text-[14px] leading-[24px] font-[500] mt-[8px] text-[#374151] list-disc list-inside space-y-[10px] pb-[23px] pl-[1em]">
            <li>
              We prioritize charities with revenue under $1 million that are not federally
              grant-funded.
            </li>
            <li>FFC can currently manage up to 100 organizations simultaneously.</li>
          </ul>
          <div className="bg-[#fffbeb] border-l-4 border-[#facc15] p-4 my-4 rounded text-[14px] leading-[24px] font-[500] w-[100%] text-[#374151]">
            <p>
              <strong className="text-[#8A6400]">NOTE:</strong> FFC is restricted to serving only
              US-based charities with a US citizen as the Point of Contact.
            </p>
          </div>
          <div className="bg-[#fffbeb] border-l-4 border-[#facc15] p-4 my-4 rounded text-[14px] leading-[24px] font-[500] w-[100%] text-[#374151]">
            <p>
              <strong className="text-[#8A6400]">NOTE:</strong> FFC does not provide design services
              but does provide the Divi Builder and training resources for organizations to
              self-build their website or hire a designer.
            </p>
          </div>
        </Stage>

        <Stage
          step={4}
          title="Receiving Basic Services Package"
          description="Once approved, charities begin receiving the core package of services."
        >
          <ul className=" text-[14px] leading-[24px] font-[500] mt-[8px] text-[#374151] list-disc list-inside space-y-[10px] pb-[23px] pl-[1em]">
            <li>
              <strong>Free Domain Name:</strong> Paid in full by FFC, owned by the charity, and
              connected to the FFC Cloudflare account for security. We assist with transfers if
              needed.
            </li>
            <li>
              <strong>Microsoft 365 Tenant:</strong> We establish the organizations Microsoft 365
              for Nonprofits presence and validate domain records.
            </li>
          </ul>
          <div className="bg-[#fffbeb] border-l-4 border-[#facc15] p-4 my-4 rounded text-[14px] leading-[24px] font-[500] w-[100%] text-[#374151]">
            <p>
              <strong className="text-[#8A6400]">NOTE:</strong> FFC is Pre-501c3 organizations must
              purchase these services until Microsoft validation is complete. Organizations must add
              FFC as a guest to their tenant for collaboration.
            </p>
          </div>
        </Stage>

        <Stage
          step={5}
          title="Charity System & Website Setup"
          description="The process splits based on the charitys official status."
        >
          <ul className=" text-[14px] leading-[24px] font-[500] mt-[8px] text-[#374151] list-disc list-inside space-y-[10px] pb-[23px] pl-[1em]">
            <li>
              <strong>Pre-501c3: </strong> Completes the FFC website product checkout. The system
              auto-builds the WordPress site on shared hosting.
            </li>
            <li>
              <strong>501c3: </strong> Completes the Interserver nonprofit application process and
              agrees to have FFC as its technology sponsor.
            </li>
          </ul>
        </Stage>

        <Stage
          step={6}
          title="Technical Stack Assignment"
          description="Volunteers assign the site to the approved tech stack and configure access."
        >
          <ul className=" text-[14px] leading-[24px] font-[500] mt-[8px] text-[#374151] list-disc list-inside space-y-[10px] pb-[23px] pl-[1em]">
            <li>Create WordPress core install and Single Sign-On accounts.</li>
            <li>
              Validate `/wp-admin` access and resolve common SSL redirect issues with the following
              code in `wp-config.php`:
            </li>
          </ul>
          <pre
            className="bg-[#111827] text-white p-[1rem] rounded-md my-4 text-[14px] leading-[24px] font-[500] whitespace-pre-wrap break-words"
            id="courier-font"
          >
            <code>
              {`// ** Fixes admin portal CloudFlare re-direct issue ** //
if (strpos($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false)
    $_SERVER['HTTPS'] = 'on';`}
            </code>
          </pre>

          <ul className=" text-[14px] leading-[24px] font-[500] mt-[8px] text-[#374151] list-disc list-inside space-y-[10px] pb-[23px] pl-[1em]">
            <li>Assign admin rights to global, volunteer, designer, and charity POC accounts.</li>
          </ul>

          <div className="bg-[#fffbeb] border-l-4 border-[#facc15] p-4 my-4 rounded text-[14px] leading-[24px] font-[500] w-[100%] text-[#374151]">
            <p>
              <strong className="text-[#8A6400]">NOTE:</strong> The `GlobalAdmin@freeforcharity.org`
              account is a root tenant account used by highly trusted individuals for continuity,
              with credentials managed via a shared password manager.
            </p>
          </div>
        </Stage>

        <Stage
          step={7}
          title="Plugin & Theme Deployment"
          description="The site is equipped with essential tools for management and design."
        >
          <ul className=" text-[14px] leading-[24px] font-[500] mt-[8px] text-[#374151] list-disc list-inside space-y-[10px] pb-[23px] pl-[1em]">
            <li>Install and authenticate the WPMUDEV Dashboard plugin.</li>
            <li>Automatically install remaining WPMUDEV plugins from pre-set configurations.</li>
            <li>Configure weekly backups, security scans, and admin email reports.</li>
            <li>Provide WPMUDEV Dashboard access to the charitys technical POC.</li>
            <li>Install and authenticate the Divi Theme using the assigned designers API key.</li>
            <li>Deploy the default Divi Child Layout.</li>
          </ul>
        </Stage>

        <Stage
          step={8}
          title="Initial Site Launch & Configuration"
          description="A functional, single-page website is published within minutes."
        >
          <ul className=" text-[14px] leading-[24px] font-[500] mt-[8px] text-[#374151] list-disc list-inside space-y-[10px] pb-[23px] pl-[1em]">
            <li>Populate the default charity template with details from the onboarding form.</li>
            <li>
              Upgrade PHP to version 8.x and check for compatibility issues in the Divi Support
              pane.
            </li>
          </ul>
          <div className="bg-[#fffbeb] border-l-4 border-[#facc15] p-4 my-4 rounded text-[14px] leading-[24px] font-[500] w-[100%] text-[#374151]">
            <p>
              <strong className="text-[#8A6400]">NOTE:</strong> This default page acts as a coming
              soon page while the full design is completed on a staging site.
            </p>
          </div>
          <div className="bg-[#fffbeb] border-l-4 border-[#facc15] p-4 my-4 rounded text-[14px] leading-[24px] font-[500] w-[100%] text-[#374151]">
            <p>
              <strong className="text-[#8A6400]">NOTE:</strong> All organizations must agree to use
              the default Divi footer with a link back to FFC for validation and network effects.
            </p>
          </div>
        </Stage>
      </div>
    </div>
  )
}

export default ServiceDeliveryStages
