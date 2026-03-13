import React from "react";

function ContactHero() {
  return (
    <div className="relative h-[80vh] w-full bg-cover bg-center text-white">
      <div className="flex flex-row w-full items-center h-full p-6">
        <div className="w-1/2 text-[clamp(2rem,4vw,4rem)]">
          Serving clients in the United States, Canada, Thailand, Singapore, and
          India as a Full-Service Digital Agency.
        </div>
        <div className="w-1/2 flex flex-row">
          <div className="w-1/2 flex flex-col gap-12">
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl mb-2">For projects inquiries</div>
              <a href="#" className="underline text-sm tracking-wide">
                CONNECT@PLETHORAIT.COM
              </a>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl mb-2">For projects inquiries</div>
              <a href="#" className="underline text-sm tracking-wide">
                CONNECT@PLETHORAIT.COM
              </a>
            </div>
          </div>
          <div className="w-1/2">cnk</div>
        </div>
      </div>
    </div>
  );
}

export default ContactHero;

