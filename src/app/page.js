import JobPortalHero from "./components/JobPortalHero";
import AboutSection from "./components/Aboutsction";
import Browsercategory from "./components/Browsercategory";
// import FAQSection from "./components/Faqsection";
import Blog from "./components/Blog";
import Aboutsection from "./components/Aboutsection";
import Trendingjob from "./components/Trendingjob";
import Testimonial from "./components/Testimonial";
import Popular from "./components/Popular";
// import FAQsection from "./components/FAQsection";
import WantToHire from "./components/WantToHire";
// import FAQSection from "./components/Faqsection";
import Herosection from './components/Herosection';
import Aboutsectionnew from './components/Aboutsectionnew'

export default function Home() {
  return (


    <>

   <Herosection/>
   <Aboutsectionnew/>

   {/* <AboutSection/> */}



     <Aboutsection />

<Popular />

{/* <Trendingjob /> */}

<Testimonial />

<WantToHire />
     {/* <FAQSection/> */}
     <Blog/>

    </>
  
  );
}
