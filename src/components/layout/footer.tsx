import { Phone } from 'lucide-react'; // Github, Linkedin, Mail removed
import portfolioData from '@/config/portfolio-data.json'; // Import config data

export const Footer = () => {
  // Removed github, linkedin, email from here as they are no longer used directly in footer
  const { name, mobile } = portfolioData.personalInfo; 

  return (
    <footer className="bg-primary text-primary-foreground mt-12 py-6">
      <div className="container mx-auto px-4 text-center">
         {/* Social media icons div removed from here */}
         <p className="text-xs text-white opacity-90 mt-1">Designed & Built by {name}</p> {/* Updated class */}
         {/* Added mobile number below */}
          {mobile && (
            <p className="text-xs text-white flex items-center justify-center mt-1 opacity-90"> {/* Use text-white or primary-foreground */}
                <Phone className="mr-1 h-3 w-3" /> {mobile}
            </p>
          )}
      </div>
    </footer>
  );
};
