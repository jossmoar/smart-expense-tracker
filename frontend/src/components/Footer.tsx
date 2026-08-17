"use client";

import { useTranslation } from "react-i18next";

const EMAIL = "josi.montero@hotmail.com";
const WEBSITE_URL = "https://jossmoar.github.io/";
const LINKEDIN_URL = "https://www.linkedin.com/in/joselin-montero-arias-8aa641239";

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-header-bg">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-aos="fade-right"
          src="/footer-logo.png"
          alt="Ima Developer"
          className="h-24 w-auto object-contain sm:h-32"
        />

        <div data-aos="fade-left" className="flex flex-col items-center gap-3 text-center sm:items-end sm:text-right">
          <p className="max-w-xs text-xs text-header-icon">{t("footer.pitch")}</p>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              aria-label={t("footer.emailAriaLabel")}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-header-icon/40 text-header-icon transition-colors hover:border-header-icon"
            >
              <EmailIcon />
            </a>
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.websiteAriaLabel")}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-header-icon/40 text-header-icon transition-colors hover:border-header-icon"
            >
              <WebsiteIcon />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.linkedinAriaLabel")}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-header-icon/40 text-header-icon transition-colors hover:border-header-icon"
            >
              <LinkedinIcon />
            </a>
          </div>

          <p className="text-xs text-header-icon/70">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
