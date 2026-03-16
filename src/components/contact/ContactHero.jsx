import React from "react";

function ContactHero() {
  return (
    <div className="relative min-h-[80vh] w-full bg-cover bg-center text-white">
      <div className="flex flex-col md:flex-row w-full items-center min-h-[80vh] p-4 sm:p-6 gap-10 md:gap-0">
        <div className="w-full md:w-1/2 text-[clamp(1.125rem,4vw,2rem)] flex flex-col justify-center">
          <div className="w-full md:w-[80%] flex flex-col items-start">
            Serving clients in the United States, Canada, Thailand, Singapore, and
            India as a Full-Service Digital Agency.
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-8 sm:gap-6">
          <div className="w-full sm:w-1/2 flex flex-col gap-8 sm:gap-12">
            <div className="flex flex-col">
              <div className="text-[clamp(1.125rem,2.5vw,1.875rem)] md:text-3xl mb-2">For projects inquiries</div>
              <a href="#" className="underline text-xs sm:text-sm tracking-wide break-all">
                CONNECT@PLETHORAIT.COM
              </a>
            </div>
            <div className="flex flex-col">
              <div className="text-[clamp(1.125rem,2.5vw,1.875rem)] md:text-3xl mb-2">For projects inquiries</div>
              <a href="#" className="underline text-xs sm:text-sm tracking-wide break-all">
                CONNECT@PLETHORAIT.COM
              </a>
            </div>
          </div>
          <div className="w-full sm:w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default ContactHero;

