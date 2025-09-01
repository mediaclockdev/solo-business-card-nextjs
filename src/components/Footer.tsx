"use client";

import { Container } from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

type FooterLink = {
  text: string;
  to: string;
};

const footerLinks: FooterLink[] = [
  { text: "How to Use", to: "/how-to-use" },
  { text: "How it works", to: "/how-it-works" },
  { text: "Earn Passive Income", to: "/passive-income" },
  { text: "Cards Directory", to: "/members-directory" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 mt-auto">
      <Container maxWidth="lg" className="mx-2 sm:mx-auto px-8 py-6">
        <div className="relative mx-2 sm:mx-4">
          {/* Left Section: Copyright */}
          <div className="text-xs sm:text-sm text-gray-500 text-center lg:absolute lg:left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2">
            Copyright &copy; {new Date().getFullYear()} - BizCardNow.Com
          </div>

          {/* Large Screens Nav */}
          <nav className="mt-4 lg:mt-0 mx-auto flex items-center justify-center gap-1 sm:gap-2 max-[500px]:hidden">
            {footerLinks.map((link, index) => (
              <Fragment key={index}>
                <Link href={link.to} className="text-xs sm:text-sm text-gray-500 no-underline hover:text-gray-800">
                  {link.text}
                </Link>
                {index < footerLinks.length - 1 && (
                  <span className="text-xs sm:text-sm text-gray-500 sm:mx-2">|</span>
                )}
              </Fragment>
            ))}
          </nav>

          {/* Small Screens Nav */}
          <nav className="mt-4 lg:mt-0 mx-auto flex flex-col items-center justify-center gap-2 min-[500px]:hidden">
            {/* First row */}
            <div className="flex items-center justify-center gap-2">
              <Link href={footerLinks[0].to} className="text-xs sm:text-sm text-gray-500 text-center no-underline hover:text-gray-800 block">
                {footerLinks[0].text}
              </Link>
              <span className="text-xs sm:text-sm text-gray-500">|</span>
              <Link href={footerLinks[1].to} className="text-xs sm:text-sm text-gray-500 text-center no-underline hover:text-gray-800 block">
                {footerLinks[1].text}
              </Link>
            </div>
            {/* Second row */}
            <div className="flex items-center justify-center gap-2">
              <Link href={footerLinks[2].to} className="text-xs sm:text-sm text-gray-500 text-center no-underline hover:text-gray-800 block">
                {footerLinks[2].text}
              </Link>
              <span className="text-xs sm:text-sm text-gray-500">|</span>
              <Link href={footerLinks[3].to} className="text-xs sm:text-sm text-gray-500 text-center no-underline hover:text-gray-800 block">
                {footerLinks[3].text}
              </Link>
            </div>
          </nav>

          {/* Social Icons */}
          <div className="mt-4 lg:mt-0 flex items-center justify-center gap-4 lg:absolute lg:right-0 lg:top-1/2 lg:transform lg:-translate-y-1/2">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="text-gray-400 hover:text-gray-800" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="text-gray-400 hover:text-gray-800" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="text-gray-400 hover:text-gray-800" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="text-gray-400 hover:text-gray-800" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
