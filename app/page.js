import React from "react";

import Section2 from "./components/section_2";
import Section3 from "./components/section_3";
import Section4 from "./components/section_4";
import Section5 from "./components/section_5";
import Section6 from "./components/section_6";
import Section7 from "./components/section_7";
import Section8 from "./components/section_8";



export default function Home() {
  return (
    <div className="main-container">

      {/* Section Two */}
      <Section2  />
      {/* Section Three */}
      <Section3 />
      {/* Section Four */}
      <Section4 />
      {/* Section Five */}
      <Section5 />
      {/* Section Six */}
      <Section6 /> 
      {/* Section Seven */}
      <Section7 />
      {/* Section Eight */}
      <Section8 />
    </div>
  );
}
