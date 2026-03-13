import React from "react";

function ServicesSection() {
  return (
    <div className="px-6 pb-[20vh] pt-[20vh]">
      <div className="grid grid-cols-12 ">
        <div className="col-span-5 ">
          <h2 className="text-[4.8rem]">Our Services</h2>
        </div>

        <div className="col-span-7 flex justify-between">
          <div className="col-span-2">
            <h3 className="text-[1.5rem] pb-2 font-200">Ideas &amp; Strategy</h3>

            <ul className="space-y-1 text-[1rem] font-200">
              <li>Consulting</li>
              <li>Positioning</li>
              <li>E-commerce strategy</li>
              <li>Brand strategy</li>
              <li>Brand content</li>
              <li>Copywriting</li>
              <li>Tone of voice</li>
            </ul>
          </div>

          <div className="col-span-2">
            <h3 className="text-[1.5rem] pb-2 font-200">
              Creation &amp; Design
            </h3>

            <ul className="space-y-1 text-[1rem] font-200">
              <li>Art Direction</li>
              <li>Brand identity</li>
              <li>User Experience (UX)</li>
              <li>User Interface (UI)</li>
              <li>Wireframe &amp; Prototyping</li>
              <li>Print &amp; Packaging</li>
              <li>CGI/3D</li>
              <li>Website &amp; E-commerce</li>
              <li>Videos Editing</li>
              <li>Mobile App</li>
            </ul>
          </div>

          <div className="col-span-2">
            <h3 className="text-[1.5rem] pb-2 font-200">Technology</h3>

            <ul className="space-y-1 text-[1rem] font-200">
              <li>Creative Development</li>
              <li>Front-end development</li>
              <li>Back-end development</li>
              <li>Shopify development</li>
              <li>Wix Development</li>
              <li>Mobile &amp; IOS web app</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesSection;

