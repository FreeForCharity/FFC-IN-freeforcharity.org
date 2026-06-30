import React from 'react'
import Script from 'next/script'
import { ZEFFY_EMBED_SCRIPT } from '@/data/donation-campaigns'

/**
 * Loads the Zeffy embed script once. It scans the page for elements carrying a
 * `zeffy-form-link` attribute (see ZeffyPopupButton) and wires them to open the
 * campaign form in a modal. next/script dedupes by src, so it's safe to render
 * on any page that uses pop-up buttons.
 */
const ZeffyEmbedScript = () => <Script src={ZEFFY_EMBED_SCRIPT} strategy="afterInteractive" />

export default ZeffyEmbedScript
