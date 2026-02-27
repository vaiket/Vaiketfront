import Hero from "../components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProblemSolution from "@/components/ProblemSolution";
import Services from "@/components/Services";

import Features from "../components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTA from "../components/CTA";
import HomeBlogSection from "@/components/HomeBlogSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "760px" }}>
        <TrustStrip />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "860px" }}>
        <ProblemSolution />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}>
        <Services />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "820px" }}>
        <Features />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "820px" }}>
        <HowItWorks />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "980px" }}>
        <HomeBlogSection />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "460px" }}>
        <CTA />
      </div>
    </>
  );
}
