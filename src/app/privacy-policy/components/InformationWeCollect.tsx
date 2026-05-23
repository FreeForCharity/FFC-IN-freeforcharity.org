export function InformationWeCollect() {
  return (
    <>
      {/* Section 3 */}
      <ol className="list-decimal list-inside pb-[1em]" start={3}>
        <li>
          <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
            <strong>Information We Collect</strong>
          </h2>
        </li>
      </ol>

      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        <strong>3.1. Comments</strong>
      </p>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        When visitors leave comments on the site, we collect:
      </p>
      <ul className="list-disc list-inside space-y-[4px] pb-[1em]">
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Data from the comments form:</strong> This includes your name, email address,
          website, and the comment itself.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>IP Address and Browser User Agent String:</strong> To assist with spam detection
          and enhance security.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Gravatar Service:</strong> An anonymized string created from your email address
          (also called a hash) may be provided to the Gravatar service to see if you are using it.
          After approval of your comment, your profile picture (if available) is visible to the
          public in the context of your comment. The Gravatar service privacy policy is available
          here: Gravatar Privacy Policy
        </li>
      </ul>

      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
        <strong>3.2. Media</strong>
      </p>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        If you upload images to the website:
      </p>
      <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Embedded Location Data:</strong> Please avoid uploading images with embedded
          location data (EXIF GPS) included. Visitors can download and extract any location data
          from images on the website.
        </li>
      </ul>

      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
        <strong>3.3. Cookies</strong>
      </p>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        Our website uses cookies to enhance your browsing experience:
      </p>
      <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Comments Cookies:</strong> When you leave a comment, you may opt-in to saving your
          name, email address, and website in cookies. These are for your convenience for future
          comments and last for one year.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Login Cookies:</strong> When you log in, we set up cookies to save your login
          information and screen display choices.
          <ul className="list-disc list-inside ml-[1rem] mt-[4px] pb-[1em] space-y-[2px]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Login cookies last for two days.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Screen options cookies last for one year.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Selecting “Remember Me” extends login retention to two weeks.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Logging out removes login cookies.
            </li>
          </ul>
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Temporary Cookies:</strong> Visiting our login page sets a temporary cookie to
          determine if your browser accepts cookies. It contains no personal data and is discarded
          when you close your browser.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Editing or Publishing Articles:</strong> This sets an additional cookie in your
          browser, indicating the post ID of the article you just edited. It expires after one day.
        </li>
      </ul>

      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
        <strong>3.4. Embedded Content from Other Websites</strong>
      </p>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        Articles on this site may include embedded content (e.g., videos, images, articles).
        Embedded content from other websites behaves as if you have visited the other website
        directly. These websites may:
      </p>
      <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          Collect data about you.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">Use cookies.</li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          Embed additional third-party tracking.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          Monitor your interaction with the embedded content, including tracking your interaction if
          you have an account and are logged in to that website.
        </li>
      </ul>
    </>
  )
}
