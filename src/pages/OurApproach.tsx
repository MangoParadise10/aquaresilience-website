import { approach } from "@/content/site";
import { CtaBand, PageHero } from "@/components/site/Blocks";
import { Partnerships, Principles, Steps } from "./Index";

const OurApproach = () => (
  <>
    <PageHero eyebrow="Our approach" title={approach.headline} />
    <Steps />
    <div className="bg-stone"><Principles /></div>
    <div className="pt-20 md:pt-28"><Partnerships /></div>
    <CtaBand />
  </>
);

export default OurApproach;
