import React from 'react'
import TrackCards from './TrackCards'

/**
 * "Which application is yours?" (the old /application-guide/ chooser, folded
 * into /help-for-charities/): two big cards to the application pages plus the
 * Help me choose picker. No Apply buttons: every application starts on its
 * own page, under the wrong-application warning.
 */
const WhichApplication: React.FC = () => (
  <section
    id="which-application"
    aria-labelledby="which-application-heading"
    className="w-full py-[50px] scroll-mt-[120px]"
  >
    <div className="w-[90%] md:w-[80%] max-w-[1000px] mx-auto text-center">
      <h2
        id="which-application-heading"
        className="text-[26px] md:text-[30px] font-[700] text-[#0567B1] mb-[10px]"
      >
        Which application is yours?
      </h2>
      <p
        className="text-[17px] font-[500] leading-[27px] text-[#555] max-w-[720px] mx-auto mb-[12px]"
        data-font="lato-font"
      >
        How to tell: if the IRS has sent your organization a <b>determination letter</b> recognizing
        it as a 501(c)(3), use the 501(c)(3) application; if not, use the pre-501(c)(3) application.
      </p>
      <p
        className="text-[16px] font-[500] leading-[25px] text-[#555] max-w-[720px] mx-auto mb-[28px]"
        data-font="lato-font"
      >
        Free For Charity serves <b>US-based</b> nonprofits (US territories included) with annual
        revenue under $1 million. Each application page explains who qualifies, what you commit to,
        and every field, with its Apply button at the end.
      </p>
      <TrackCards />
    </div>
  </section>
)

export default WhichApplication
