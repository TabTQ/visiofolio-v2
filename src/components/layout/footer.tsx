
import portfolioData from '@/config/portfolio-data.json'; // Import config data

export const Footer = () => {
  // Removed github, linkedin, email from here as they are no longer used directly in footer
  const { name } = portfolioData.personalInfo; // mobile removed from here

  return (
    <footer className="bg-primary text-primary-foreground mt-12 py-6">
      <div className="container mx-auto px-4 text-center">
         {/* Social media icons div removed from here */}
         <p className="text-xs text-white opacity-90 mt-1">Designed & Built by {name}</p> {/* Updated class */}
         {/* Mobile number removed from here */}
      </div>
    </footer>
  );
};

