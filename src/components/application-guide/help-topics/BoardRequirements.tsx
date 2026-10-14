import React from 'react'
import { type Track } from '@/data/application-fields'
import Ext from './Ext'

const BoardRequirements: React.FC<{ track: Track }> = ({ track }) => (
  <>
    <p>
      A real, working board is the clearest sign that an organization is a genuine charity rather
      than one person’s project. Every application asks for three officers: a <strong>Chair</strong>
      , a <strong>Secretary</strong> and a <strong>Treasurer</strong>.
    </p>
    {track === '501c3' ? (
      <p>
        On the 501(c)(3) application, each of the three gives their own phone number, an individual
        email address (not a shared inbox) and a working LinkedIn profile link. We contact them to
        verify the application, and their phone numbers and emails stay private. The Vice Chair and
        Member-at-Large seats are optional.
      </p>
    ) : (
      <p>
        On the Pre-501(c)(3) application, each of the three officers gives a working LinkedIn
        profile link, and you list the names and roles of at least three team members (up to five)
        to show who is building the organization.
      </p>
    )}

    <h2>What the IRS expects</h2>
    <p>
      The IRS does not set a single magic number, but a 501(c)(3) is expected to be governed by a
      board that exercises real oversight. In practice that means at least three directors, a
      majority of whom are <strong>not related by blood, marriage or business</strong>. A board made
      up of one family, or one person wearing every hat, undermines the independence tax-exempt
      status assumes.
    </p>

    <h2>What donors and partners look for</h2>
    <p>
      Donors, grantmakers and platforms like Candid look at your board to judge credibility. Named
      leaders with real professional profiles show that the organization answers to more than its
      founder. That is why we ask for a LinkedIn profile for each officer: it lets a stranger
      confirm that real, identifiable people stand behind the mission.
    </p>

    <h2>Officer LinkedIn profiles</h2>
    <p>
      The profile doesn’t need much public information. A name and the officer’s role at your
      organization is plenty. But it must exist, and the link must open for someone who isn’t logged
      in as that person. Creating a profile is free.
    </p>
    <ol>
      <li>The officer opens their own LinkedIn profile.</li>
      <li>
        They copy the address from the browser bar. It looks like{' '}
        <code>linkedin.com/in/their-name</code>.
      </li>
      <li>
        You test it: paste it into a private or incognito browser window and check it opens their
        profile.
      </li>
    </ol>
    <p>
      New to LinkedIn? Follow{' '}
      <Ext href="https://ffcadmin.org/guides/linkedin/">
        Set up LinkedIn (you + your charity Page)
      </Ext>
      .
    </p>

    <h2>Leaders shown on your website</h2>
    <p>
      FFC websites show your Chair, Secretary and Treasurer by name and role, so donors can see who
      leads the charity. The application asks for their names exactly as they should appear, and a
      consent tickbox.{' '}
      <strong>We cannot accept an application unless all three agree to appear</strong>, so ask them
      before you apply. Other leaders can be listed too, only with their agreement. Phone numbers
      and email addresses are never shown on your site.
    </p>

    <h2>Common pitfalls</h2>
    <ul>
      <li>
        <strong>Single-person boards.</strong> One person as Chair, Secretary and Treasurer is not a
        board. Recruit at least two more unrelated people before applying.
      </li>
      <li>
        <strong>All-family boards.</strong> A board where everyone is related raises
        conflict-of-interest concerns. Aim for an unrelated majority.
      </li>
      <li>
        <strong>Boards that never meet.</strong> Hold at least an annual meeting and keep minutes;
        recording decisions is the Secretary’s job. No paper trail looks like no governance.
      </li>
      <li>
        <strong>Profiles that don’t open.</strong> A private, deleted or mistyped LinkedIn link is
        the most common reason we have to send an application back.
      </li>
    </ul>

    <h2>Don’t have three people yet?</h2>
    <p>
      That’s common and fixable, but all three officers are required, so recruit them before you
      apply. Start with people who genuinely believe in the mission: a former colleague, a community
      leader, a professional whose work touches your cause. You are asking for a few hours a year of
      real oversight, not a full-time job.
    </p>

    <h2>Template: a basic board agreement</h2>
    <p>Some boards ask each new officer to sign a short agreement like this one:</p>
    <blockquote>
      <p>
        <em>
          I, [Name], agree to serve as [Role] of [Organization]. I will act in the organization’s
          best interest, avoid conflicts of interest, attend at least the annual board meeting,
          review the organization’s finances, and help ensure it operates lawfully and in
          furtherance of its charitable mission. I understand this is a voluntary, uncompensated
          governance role.
        </em>
      </p>
    </blockquote>
  </>
)

export default BoardRequirements
