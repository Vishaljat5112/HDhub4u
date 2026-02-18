import { useState } from "react";
import DashboardHeader from "../components/DashboardComponents/DashboardHeader";


import GenresSection from "../components/DashboardComponents/GenresSection";
import Footer from "../components/DashboardComponents/Footer";


export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="space-y-2">
      <DashboardHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <GenresSection/>

   
      <Footer/>
    </div>
  );
}
