import React from 'react'
import { TRACKS, type Track } from '@/data/application-fields'
import Ext from './Ext'

const SocialMedia: React.FC<{ track: Track }> = ({ track }) => (
  <>
    <p>
      The {TRACKS[track].name} application requires a charity <strong>Facebook Page</strong> and a
      charity <strong>LinkedIn Page</strong>. Instagram, X and YouTube are optional. You don’t need
      to be everywhere: a couple of well-kept, organization-owned Pages do more for donor trust than
      many empty ones.
    </p>

    <h2>Pages, not personal profiles</h2>
    <p>
      Facebook and LinkedIn both let you create a free <strong>organization Page</strong> from a
      personal account. Your personal account is only the login; the Page itself speaks as the
      charity and is what the public sees. The application needs the link to the Page. A link to
      someone’s personal profile can’t be accepted.
    </p>

    <h2>Set up your Facebook Page</h2>
    <ol>
      <li>Log in to Facebook and open the Pages section of the menu.</li>
      <li>Create a new Page using your charity’s name and a nonprofit category.</li>
      <li>Add your logo, a cover image, a short description and your contact details.</li>
      <li>Publish at least one post so visitors can see the Page is active.</li>
    </ol>
    <p>
      Detailed steps:{' '}
      <Ext href="https://ffcadmin.org/guides/facebook-organization/">
        Run your charity’s Facebook Page
      </Ext>
      .
    </p>

    <h2>Set up your LinkedIn Page</h2>
    <ol>
      <li>Log in to LinkedIn and choose to create a Company Page (under the For Business menu).</li>
      <li>Enter your charity’s name, choose its public LinkedIn address, and pick an industry.</li>
      <li>Add your logo and a one-line tagline, then publish the Page.</li>
      <li>Ask your officers to list their role at the charity so they show up on the Page.</li>
    </ol>
    <p>
      Detailed steps:{' '}
      <Ext href="https://ffcadmin.org/guides/linkedin-organization/">
        Run your charity’s LinkedIn Page
      </Ext>
      .
    </p>

    <h2>Good habits</h2>
    <ul>
      <li>
        <strong>Add a second admin</strong> to every Page, so access never depends on one person.
      </li>
      <li>
        <strong>Use the same name, logo and website link everywhere</strong>, so supporters can tell
        they’ve found the real you.
      </li>
      <li>
        <strong>Post now and then.</strong> A Page with no posts in years looks abandoned.
      </li>
    </ul>

    <h2>Copy the right link</h2>
    <p>
      Open the Page (not your profile) and copy the address from the browser bar. A Facebook Page
      link usually looks like <code>facebook.com/YourCharity</code>, and a LinkedIn Page link like{' '}
      <code>linkedin.com/company/your-charity</code>. Paste each link into a private or incognito
      browser window to check it opens for someone who isn’t logged in.
    </p>

    <h2>Optional: Instagram, X and YouTube</h2>
    <p>
      If you already use these, paste their full links and we’ll link them from your website. Add
      Instagram if your work is visual; skip any channel you don’t keep up. Instagram tips:{' '}
      <Ext href="https://ffcadmin.org/guides/instagram-organization/">
        Run your charity’s Instagram
      </Ext>
      .
    </p>
  </>
)

export default SocialMedia
