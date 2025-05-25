import React from "react";
import HeroSection from "./HeroSection";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";

const HomeContent = () => {
    return (
        <>
           
    <div className="w-full mx-auto">
    <HeroSection />
    <HowItWorks className="mt-10" />  {/* Add top margin */}
    <Features  className="mt-8"/>
    <CallToAction  className="-mt-10"/>
    <Testimonials />
    <Footer />
</div>
        </>
    );
};

export default HomeContent;
