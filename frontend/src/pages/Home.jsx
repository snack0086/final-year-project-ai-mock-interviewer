import Navbar from "../components/global/Navbar/Navbar";
import Hero from "../components/global/Hero/Hero";
import CardTab from "../components/global/CardTab/CardTab";
import Stat from "../components/global/Stat/Stat";
import CTA from "../components/global/CTA/Cta";
import Footer from "../components/global/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CardTab />
      <Stat />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
