import React from "react";
import AnimatedLink from "../AnimatedLink.jsx";

function HeroSection() {
  return (
    <div
      className="relative h-[150vh] w-full bg-cover bg-center text-white"
      style={{ backgroundImage: 'url("/herobg.png")' }}
    >
      <div className="flex flex-col items-start px-6 pt-[16vh] h-full justify-center">
        <div className="text-[1.5rem] w-full md:w-[35%]">
          We partner with founders and founder-led brands to build, launch &
          scale their digital presence through storytelling
        </div>

        <div className="flex flex-col items-start justify-center text-[clamp(3rem,8vw,7rem)] uppercase font-bold py-5">
          <h1>Storytelling, Design,</h1>
          <h1>Content Production &amp;</h1>
          <h1>Technology.</h1>
        </div>

        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="text-[1rem] w-full md:w-[38%]">
            We are not just vendors of digital solutions → we are your trusted
            digital partners!
          </div>

          <div className="underline-link flex flex-col gap-1 text-[0.8rem] cursor-pointer">
            <AnimatedLink to="/about">
              <div className="underline-trigger inline-block">
                <div>[ About Us ]</div>

                <div className="underline-line border-b border-white w-full origin-left scale-x-0 pt-1" />
              </div>
            </AnimatedLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

