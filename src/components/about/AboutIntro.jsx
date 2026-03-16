import React from "react";

function AboutIntro() {
  return (
    <>
      <div className="relative h-full pt-[30vh] pb-[20vh] px-6 w-full">
        <div>
          <div className=" text-[2rem] sm:text-[3rem] md:text-[4rem] m-auto">
            We like to support our clients at all stages of their projects from
            strategy, design and technical development. Insight driven and user
            centric. We strongly believe every brand and project is unique and
            should be tailor-made from industry leaders to early stage
            companies. We don’t do one size fits all.
          </div>
        </div>
      </div>

      <div
        className="w-[100vw] h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: 'url("/aboutpagebg.png")' }}
      />

      <section
        id="about-intro-highlight"
        className="relative h-full py-[20vh] px-6 w-full flex items-center"
      >
        <div className=" text-[2rem] sm:text-[3rem] md:text-[4rem] w-[90%] text-white/20">
          <p id="aboutIntroText">
            We strongly believe every brand and project is unique and should be
            tailor-made from industry leaders to early stage companies. We don’t
            do one size fits all.
          </p>
        </div>
      </section>
    </>
  );
}

export default AboutIntro;

