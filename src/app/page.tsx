// import Image from "next/image";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import About from "../components/About";
// import Skills from "../components/Skill";
// import Timeline from "../components/Timeline";
// import Contact from "../components/Contact";
// import Project from "../components/Project";


// export default function Home() {
//   return (
//     <>
//       <Navbar />
//       <Hero/>
//       <About/>
//       <Skills/>
//       <Project/>
//       <Timeline/>
//       <Contact/>
      
//     </>
//   );
// }




import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skill from "../components/Skill";
import Timeline from "../components/Timeline";
import Contact from "../components/Contact";
import Project from "../components/Project";
import { client } from "../sanity/lib/client";
import Footer from "../components/Footer";

export default async function Home() {
  const projects = await client.fetch(`*[_type == "project"] | order(order asc)`);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skill />
      <Project projects={projects} />
      <Timeline />
      <Contact />
      <Footer/>
    </>
  );
}