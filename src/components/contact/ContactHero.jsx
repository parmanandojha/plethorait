import React from "react";

function ContactHero() {
  return (
    <div className="relative w-full bg-cover bg-center text-white">
      <div className="flex flex-col md:flex-row w-full justify-center items-center h-[80vh] my-auto p-4 sm:p-6 gap-10 md:gap-0">
        <div className="w-full md:w-1/2 text-[clamp(1.125rem,4vw,1.8rem)] flex flex-col">
          <div className="w-full md:w-[80%] flex flex-col items-start">
            Serving clients in the United States, Canada, Thailand, Singapore, and
            India as a Full-Service Digital Agency.
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col sm:flex-row justify-between gap-8 sm:gap-4">
          <div className=" flex flex-col gap-8 w-full sm:w-1/2">
            <div className="flex flex-col">
              <div className="text-[clamp(1.125rem,2.5vw,1.8rem)]  mb-2">For projects inquiries</div>
              <a href="mailto:connect@plethorait.com" className="underline text-[1rem] sm:text-[0.8rem] tracking-wide break-all">
                CONNECT@PLETHORAIT.COM
              </a>
            </div>
            <div className="flex flex-col">
              <div className="text-[clamp(1.125rem,2.5vw,1.8rem)]  mb-2">Plethora IT</div>
              <div className="text-[1rem] sm:text-[0.8rem]  leading-[120%]">
              35/46, Supalai Essence Suanluang, Dokmai, Prawet, Bangkok - 10250, Thailand
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-[clamp(1.125rem,2.5vw,1.8rem)] mb-2">For Jobs and internships</div>
            <a href="mailto:jobs@plethorait.com" className="underline uppercase text-[1rem] sm:text-[0.8rem] tracking-wide break-all">
              Jobs@plethorait.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactHero;

