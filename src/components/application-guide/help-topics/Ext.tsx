import React from 'react'

/** External link in help-topic copy: new tab, announced to screen readers. */
const Ext: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
)

export default Ext
