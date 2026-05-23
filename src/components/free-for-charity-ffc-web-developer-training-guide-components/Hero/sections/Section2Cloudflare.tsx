import React from 'react'

const Section2Cloudflare = () => {
  return (
    <>
      {/* 2. Cloudflare */}
      <section id="section2" className="mb-6">
        <ol className="list-decimal list-inside" start={2}>
          <li className="text-[30px] md:text-[36px] font-[700] text-[#005AA0] mt-16 mb-6 pb-3 border-b border-[#e1e5eb]">
            Cloudflare (DNS Management & Email Connection)
          </li>
        </ol>

        <p className="text-[14px] font-[500] leading-[25px] text-[#333d47]">
          Cloudflare manages the DNS settings for charity domains and is critical for setting up
          security (including DMARC) and email connectivity.
        </p>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-10 mb-4">
          2.1. Login URLs
        </h3>

        <ul className="pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Charity & Admin Login URL:</span>{' '}
            <a href="https://dash.cloudflare.com/" className="text-[#0066B8] underline">
              https://dash.cloudflare.com/
            </a>
          </li>
        </ul>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-[3rem] mb-4">
          2.2. Setup Steps
        </h3>

        <ul className="pl-[1.5rem] pb-[23px] list-disc space-y-[0.75rem]">
          {/* Step 1 */}
          <li className="pl-[0.5rem] text-[14px] font-[500] text-[#333d47] leading-[26px]">
            <span className="font-[600] text-[#1c2a38]">Change Name Servers in FFC Hub: </span>
            Update the charity’s DNS records in the FFC Hub to use the FFC Cloudflare nameservers.
            <ul className="list-disc list-inside mt-[0.5rem] space-y-[0.5rem]">
              <li className="text-[14px] font-[500] text-[#333d47] leading-[26px]">
                <code className="bg-[#f1f3f5] text-[#B82B5A] py-[0.3em] px-[0.5em] rounded-[6px] text-[0.9em]">
                  ns1.freeforcharity.org
                </code>
              </li>
              <li className="text-[14px] font-[500] text-[#333d47] leading-[26px]">
                <code className="bg-[#f1f3f5] text-[#B82B5A] py-[0.3em] px-[0.5em] rounded-[6px] text-[0.9em]">
                  ns2.freeforcharity.org
                </code>
              </li>
            </ul>
          </li>

          {/* Step 2 */}
          <li className="pl-[0.5rem] text-[14px] font-[500] text-[#333d47] leading-[26px]">
            <span className="font-[600] text-[#1c2a38]">Create a Cloudflare Account: </span>
            Assist the charity in setting up a Cloudflare account using their organizational email,
            e.g.,
            <code className="bg-[#f1f3f5] text-[#B82B5A] py-[0.3em] px-[0.5em] rounded-[6px] text-[0.9em] ml-1">
              charityname@outlook.com
            </code>
          </li>

          {/* Step 3 */}
          <li className="pl-[0.5rem] text-[14px] font-[500] text-[#333d47] leading-[26px]">
            <span className="font-[600] text-[#1c2a38]">Grant Domain Permissions: </span>
            In the Cloudflare dashboard, add the charity’s domain and assign the “Domain Admin” role
            to the organizational account.
          </li>

          {/* Step 4 */}
          <li className="pl-[0.5rem] text-[14px] font-[500] text-[#333d47] leading-[26px]">
            <span className="font-[600] text-[#1c2a38]">Set up Cloudflare DMARC Management: </span>
            Follow Cloudflare’s instructions to configure DMARC records for improved email security.
          </li>

          {/* Step 5 */}
          <li className="pl-[0.5rem] text-[14px] font-[500] text-[#333d47] leading-[26px]">
            <span className="font-[600] text-[#1c2a38]">
              Establish Email Connection to Microsoft 365:{' '}
            </span>
            Configure the DNS records (MX, SPF, and DKIM) so that emails route correctly to
            Microsoft 365:
            <ol className="list-decimal list-inside mt-[0.75rem] space-y-[0.4rem] pl-[1.5rem]">
              <li>
                Log in to your FFC Cloudflare admin account and navigate to the charity’s domain.
              </li>
              <li>Click on the DNS section in Cloudflare.</li>
              <li>
                Note the required DNS records provided by Microsoft 365 (these include MX records,
                SPF configuration, and DKIM keys).
              </li>
              <li>
                Open the{' '}
                <a
                  href="https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DcXdE9ZpBiUOIKrw41LubJrVLKlhcxriGV9xXed-qdbNIbM7XI9QfL_Lx0WxbxW8Un93hvwvLe36C5t_x4NE1DfrujTyRp8ThtIbS4sjKCSpmrAwmbCELkDhhuWoWA2C41BpRCIJaFUtw9DaD8Ztk-SWbNQyqMn3v8U3RTB_JkCtam2St5DQ7FuiPA7nGxIs-o_OMxRL1dIB8W5tg_Xl-KQ&response_mode=form_post&nonce=638975127534783663.MWM0NzJhN2UtMjMwMC00ODk0LWIxMDYtNDA0NTM1ZWIyOGM3N2FiMGRiYjktN2Q5Ni00NjliLThiMDgtYTNjYmJmODkxMzI4&redirect_uri=https%3A%2F%2Fadmin.microsoft.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=90c71719-12a6-4390-b854-f14ff3429635&claims=%7B%22id_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&x-client-SKU=ID_NET472&x-client-ver=8.9.0.0"
                  className="text-[#0066B8] underline hover:text-[#005AA0] transition-colors duration-200"
                >
                  Microsoft 365 Admin Portal
                </a>
                .
              </li>
              <li>Navigate to Setup → Domains and select “Add domain.”</li>
              <li>
                Enter the charity’s domain name. Microsoft 365 will detect missing DNS records.
              </li>
              <li>
                When prompted, choose the option to use your Cloudflare account credentials. Enter
                your Cloudflare username and password so Microsoft 365 can automatically add the
                necessary DNS records.
              </li>
              <li>
                Once the records are added, verify the domain within the Microsoft 365 portal.
              </li>
            </ol>
          </li>
        </ul>

        {/* ================  */}

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-[3rem] mb-6">
          2.3. Learning Resources
        </h3>
        <h4 className="text-[#1c2a38] text-[18px] pb-[10px] font-[700] leading-[23px]">
          Official Cloudflare Learning Resources:
        </h4>

        <ul className="p-[0_0_23px_1.5rem] list-disc">
          <li className="underline pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://www.cloudflare.com/learning/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare Learning Center
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://developers.cloudflare.com/dns/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare Developer Docs (DNS)
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a href="https://support.cloudflare.com/" target="_blank" rel="noopener noreferrer">
              Cloudflare Support Portal
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://www.youtube.com/c/cloudflare"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare YouTube Channel
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a href="https://blog.cloudflare.com/" target="_blank" rel="noopener noreferrer">
              Cloudflare Blog
            </a>
          </li>
        </ul>

        <h4 className="text-[#1c2a38] text-[18px] pb-[10px] font-[700] leading-[23px] mt-[1rem]">
          External Cloudflare Learning Resources:
        </h4>
        <ul className="p-[0_0_23px_1.5rem] list-disc">
          <li className="underline pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://kinsta.com/knowledgebase/install-cloudflare/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare DNS Tutorial for Beginners
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://www.wpbeginner.com/wp-tutorials/how-to-setup-cloudflare-free-cdn-in-wordpress/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare Setup for WordPress (WPBeginner)
            </a>
          </li>
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] leading-[26px] ">
            YouTube: Cloudflare DNS Explained:
            <a
              href="https://www.youtube.com/results?search_query=Cloudflare+DNS+Tutorial"
              className="text-[#0066B8] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              (Search for “Cloudflare DNS Tutorial” on YouTube.)
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://www.cloudwards.net/what-is-cloudflare/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog Resource at Cloudwards
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://www.siteground.com/kb/cloudflare-cdn-work/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Guide by SiteGround
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Section2Cloudflare
