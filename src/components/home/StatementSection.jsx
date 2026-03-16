import React from "react";

function StatementSection() {
  return (
    <section id="statement" className="flex items-center py-[12vh] sm:py-[20vh] px-4 sm:px-6">
      <div className="text-center">
        <p
          id="statementText"
          className="text-[clamp(2.2rem,4vw,4rem)] w-full md:w-[90%] m-auto text-white/20"
        >
          We love what we do, and it shows in our work. Every project we
          undertake is carefully moulded to the needs and expectations of our
          clients and their users.
        </p>
      </div>
    </section>
  );
}

export default StatementSection;

