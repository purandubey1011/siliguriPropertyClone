import Listinghero from '../../components/User/listing/Listinghero.jsx';
// import OwnerHero from '../../components/Owner/SignUp/OwnerHero';
import WhyUsSection from '../../components/Owner/SignUp/WhyUs.jsx';
import HowItWorksSection from '../../components/Owner/SignUp/Howitworks.jsx';
import TestimonialsSection from '../../components/Owner/SignUp/Testimonial.jsx';
import FinalCTA from '../../components/Owner/SignUp/FinalCta.jsx';
// import Listing from '../Listing';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
const OwnerSignUp = () => {
  return (
    <div>
        <Navbar bgcolor={"#CC0066"}/>
        <Listinghero/>
      {/* <OwnerHero /> */}
      <WhyUsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FinalCTA />
      <Footer/>
    </div>
  );
};

export default OwnerSignUp;