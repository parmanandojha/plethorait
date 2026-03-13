import React from "react";
import AnimatedLink from "./AnimatedLink.jsx";

function Footer() {
  return (
    <>
      <div
        className="w-[100vw] h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: 'url("/footerbg.png")' }}
      />

      <footer className="relative px-6 md:px-16 py-20 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-6">
            <h2 className="text-2xl md:text-3xl mb-4">Let’s work together</h2>

            <a href="#" className="underline text-sm tracking-wide">
              CONNECT@PLETHORAIT.COM
            </a>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-10 text-[1rem]">
            <div className="space-y-2">
              <AnimatedLink className="block underline" to="/work">
                WORK
              </AnimatedLink>
              <AnimatedLink className="block underline" to="/about">
                ABOUT &amp; SERVICES
              </AnimatedLink>
              <AnimatedLink className="block underline" to="/blog">
                BLOGS
              </AnimatedLink>
              <AnimatedLink className="block underline" to="/contact">
                CONTACT
              </AnimatedLink>
            </div>

            <div className="space-y-2">
              <a className="block underline" href="#">
                INSTAGRAM
              </a>
              <a className="block underline" href="#">
                LINKEDIN
              </a>
              <a className="block underline" href="#">
                BEHANCE
              </a>
            </div>

            <div className="space-y-2 uppercase col-span-2 md:col-span-1">
              <span>PLETHORA IT</span>

              <p className="uppercase text-sm leading-relaxed">
                35/46, SUPALAI ESSENCE <br />
                SUNALUANG, DOKMAI <br />
                PRAWET, BANGKOK -10250 <br />
                THAILAND
              </p>
            </div>
          </div>
        </div>

        <div>
          <img src="/plethorait logo.svg" className="w-full" alt="Plethora IT" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-12 text-sm">
          <p>All rights Reserved 2025</p>

          <a href="#" className="underline">
            {" "}
            SUBSCRIBE TO OUR NEWSLETTER{" "}
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;

