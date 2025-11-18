package com.portfolio.config;

import com.portfolio.entity.*;
import com.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final PersonalInfoRepository personalInfoRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final AcademicRepository academicRepository;
    private final SkillRepository skillRepository;

    @Override
    public void run(String... args) {
        log.info("Initializing portfolio data...");

        // Only initialize if database is empty
        if (personalInfoRepository.count() == 0) {
            initializePersonalInfo();
            initializeProjects();
            initializeExperiences();
            initializeAcademics();
            initializeSkills();
            log.info("Portfolio data initialization completed successfully!");
        } else {
            log.info("Database already contains data. Skipping initialization.");
        }
    }

    private void initializePersonalInfo() {
        PersonalInfo info = new PersonalInfo();
        info.setName("Tabish Tariq");
        info.setMobile("+91 8802456752");
        info.setEmail("tabish.tariq@start3tech.com");
        info.setProfilePicture("/images/profile.jpg");
        info.setProfilePictureHint("professional headshot portrait");
        info.setBio("A dedicated System Engineer at Tata Consultancy Services with over three years of experience in data analysis, AWS, ETL, and automation. Holding an MTech in Control and Instrumentation and a BTech in Electrical Engineering from Jamia Millia Islamia, I specialize in intelligent control systems, with published research on fuzzy logic-based irrigation systems in Springer and MDPI journals. My projects showcase expertise in Python, MATLAB, Arduino, and microcontroller-based designs, including algo trading bots, greenhouse automation, and traffic control systems. Certified in Quantum Computing, Java, and Rest API, I blend technical proficiency with innovative problem-solving to deliver impactful solutions.");
        info.setGithubUrl("https://github.com/TabTQ/");
        info.setLinkedinUrl("https://www.linkedin.com/in/ertabish97/");
        info.setFooterCopyrightName("StarT3Tech");
        personalInfoRepository.save(info);
        log.info("Personal info initialized");
    }

    private void initializeProjects() {
        Project proj1 = new Project();
        proj1.setTitle("Portfolio Website");
        proj1.setDescription("My personal portfolio website, developed using Google's Firebase Studio with Next.js, TypeScript, and Tailwind CSS, provides a detailed overview of my professional journey, technical skills, and academic background. This project showcases my experience with modern AI tools, app development and hosting. This website is running on my local linux server inside a docker container and accessed through a cloudflare tunnel running inside another docker container.");
        proj1.setImageUrl("/images/proj1.jpg");
        proj1.setImageHint("portfolio website ui");
        proj1.setTags("Google Gemini,Firebase Studio,Next.js,TypeScript,Tailwind CSS,Server administration,linux,Docker,Hosting");
        proj1.setLiveUrl("tabishtariq.start3tech.com");
        proj1.setRepoUrl("https://github.com/TabTQ/portfolio_website");
        proj1.setType("Web App");
        proj1.setDisplayOrder(1);

        Project proj2 = new Project();
        proj2.setTitle("Algo Trading Bot");
        proj2.setDescription("Simple Algo trading bot using Binance API, NumPy, Pandas in Python.");
        proj2.setImageUrl("/images/proj2.jpg");
        proj2.setImageHint("algo trading bot");
        proj2.setTags("Binance API,NumPy,Pandas,Python");
        proj2.setRepoUrl("https://github.com/TabTQ/Binance-Trading-Bot");
        proj2.setType("Web App");
        proj2.setDisplayOrder(2);

        Project proj3 = new Project();
        proj3.setTitle("Automatic Greenhouse Irrigation System");
        proj3.setDescription("Fuzzy Logic based Automation of Greenhouse irrigation system to control the flow rate of water using multiple environment factors");
        proj3.setImageUrl("/images/proj3.jpg");
        proj3.setImageHint("schematic diagram");
        proj3.setTags("Fuzzy Logic,MATLAB,Arduino,C++,Simulink,Control Systems,Instrumentation Systems");
        proj3.setRepoUrl("https://github.com/TabTQ/Intelligent-Control-of-Irrigation-System-using-Fuzzy-Logic-Controller");
        proj3.setType("Control Systems");
        proj3.setDisplayOrder(3);

        Project proj4 = new Project();
        proj4.setTitle("Spring Framework Shopping Cart");
        proj4.setDescription("A simple shopping cart app created using spring framework to demonstrate the cart flow and expertise in spring framework");
        proj4.setImageUrl("/images/proj4.jpg");
        proj4.setImageHint("shopping cart");
        proj4.setTags("Java,Spring framework,hibernate,JSP");
        proj4.setLiveUrl("https://github.com/TabTQ/Shopping-Cart-Spring-Framework");
        proj4.setType("Web App");
        proj4.setDisplayOrder(4);

        projectRepository.saveAll(Arrays.asList(proj1, proj2, proj3, proj4));
        log.info("Projects initialized");
    }

    private void initializeExperiences() {
        Experience exp1 = new Experience();
        exp1.setTitle("Systems Engineer");
        exp1.setCompany("Tata Consultancy Services");
        exp1.setDuration("Jan 2023 - Present");
        exp1.setLocation("Noida, UP");
        exp1.setResponsibilities("[\"Led the development of a Monitoring Console to raise tickets on service now auotmatically.\",\"Mentored junior engineers, fostering a collaborative team environment.\",\"Designed and implemented a Monitoring Dashboard using Stored Procedures and data transformation.\",\"Collaborated with product managers and designers to define project requirements and timelines.\"]");
        exp1.setAchievements("[\"Improved operations team efficiency by 90% by automating the issues identification processes.\"]");
        exp1.setDisplayOrder(1);

        Experience exp2 = new Experience();
        exp2.setTitle("Assistant System Engineer - Trainee");
        exp2.setCompany("Tata Consultancy Services");
        exp2.setDuration("Feb 2022 - Dec 2022");
        exp2.setLocation("Noida, UP");
        exp2.setResponsibilities("[\"Developed and maintained ETL pipelines on AWS cloud.\",\"Participated in code reviews and contributed to improving code quality standards.\",\"Worked in an Agile team, participating in daily stand-ups, sprint planning, and retrospectives.\",\"Coordinated with multiple teams to fix the various pipeline issues at a service level.\"]");
        exp2.setAchievements("[\"Successfully onboarded more than 100 data collection servers onto the existing AWS data pipeline.\"]");
        exp2.setDisplayOrder(2);

        Experience exp3 = new Experience();
        exp3.setTitle("Engineer Trainee");
        exp3.setCompany("Delhi Metro Rail Corporation Ltd");
        exp3.setDuration("Jun 2018 - Jul 2018");
        exp3.setLocation("New Delhi, Delhi");
        exp3.setResponsibilities("[\"Assisted server admin in monitoring and troubleshooting TVS and BMS Systems.\",\"Gained experience with SCADA and PLC systems.\"]");
        exp3.setDisplayOrder(3);

        experienceRepository.saveAll(Arrays.asList(exp1, exp2, exp3));
        log.info("Experiences initialized");
    }

    private void initializeAcademics() {
        Academic acad1 = new Academic();
        acad1.setType("Degree");
        acad1.setTitle("Master of Technology in Control and Instrumentation Systems");
        acad1.setInstitution("Jamia Millia Islamia University");
        acad1.setDate("Graduated Jul 2023");
        acad1.setDescription("Specialization in Control and Instrumentation Systems. Thesis: \"Intelligent Control of Irrigation Systems Using Fuzzy Logic Controller\". CGPA: 9.05");
        acad1.setUrl("#");
        acad1.setDisplayOrder(1);

        Academic acad2 = new Academic();
        acad2.setType("Degree");
        acad2.setTitle("Bachelor of Technology in Electrical Engineering");
        acad2.setInstitution("Jamia Millia Islamia University");
        acad2.setDate("Graduated Jul 2019");
        acad2.setDescription("Major in Control Systems. Capstone project: Design and implementation of a density-based traffic control system using microcontroller AT89S52.");
        acad2.setUrl("#");
        acad2.setDisplayOrder(2);

        Academic acad3 = new Academic();
        acad3.setType("Certification");
        acad3.setTitle("Qubit by Qubit's 2020-2021 Introduction to Quantum Computing Course sponsored by IBM Quantum");
        acad3.setInstitution("The Coding School");
        acad3.setDate("Issued May 2021");
        acad3.setDescription("Gained knowledge of basic Quantum Computing.");
        acad3.setUrl("https://drive.google.com/file/d/1A_6UPX2BSu54-1LhX63jC7-6rO2Rr27L/view?usp=drivesdk");
        acad3.setDisplayOrder(3);

        Academic acad4 = new Academic();
        acad4.setType("Degree");
        acad4.setTitle("Senior School Certificate");
        acad4.setInstitution("Jamia Senior Secondary School");
        acad4.setDate("Graduated May 2015");
        acad4.setUrl("#");
        acad4.setDisplayOrder(4);

        Academic acad5 = new Academic();
        acad5.setType("Degree");
        acad5.setTitle("Secondary School Certificate");
        acad5.setInstitution("Jamia Senior Secondary School");
        acad5.setDate("Graduated May 2013");
        acad5.setUrl("#");
        acad5.setDisplayOrder(5);

        Academic acad6 = new Academic();
        acad6.setType("Certification");
        acad6.setTitle("Java (Basic)");
        acad6.setInstitution("HackerRank");
        acad6.setDate("Issued Nov 2021");
        acad6.setDescription("Showcasing basic Java expertise.");
        acad6.setUrl("https://www.hackerrank.com/certificates/a2a0b6d60ed1");
        acad6.setDisplayOrder(6);

        Academic acad7 = new Academic();
        acad7.setType("Certification");
        acad7.setTitle("Python (Basic)");
        acad7.setInstitution("HackerRank");
        acad7.setDate("Issued Sep 2021");
        acad7.setDescription("Showcasing basic Python expertise.");
        acad7.setUrl("https://www.hackerrank.com/certificates/f8ebe76a9cf0");
        acad7.setDisplayOrder(7);

        Academic pub1 = new Academic();
        pub1.setType("Publication");
        pub1.setTitle("Analysis of Intelligent Control of Irrigation System");
        pub1.setInstitution("Springer, Singapore");
        pub1.setDate("Published Apr 2023");
        pub1.setDescription("Detailed study on different intelligent control techniques to improve the irrigation system.");
        pub1.setUrl("https://doi.org/10.1007/978-981-19-7993-4_24");
        pub1.setDisplayOrder(8);

        Academic pub2 = new Academic();
        pub2.setType("Publication");
        pub2.setTitle("Intelligent Control of Irrigation Systems Using Fuzzy Logic Controller");
        pub2.setInstitution("MDPI, Basel, Switzerland");
        pub2.setDate("Published Sep 2022");
        pub2.setDescription("Analysis and development of a fuzzy logic based control of irrigation system.");
        pub2.setUrl("https://doi.org/10.3390/en15197199");
        pub2.setDisplayOrder(9);

        academicRepository.saveAll(Arrays.asList(acad1, acad2, acad3, acad4, acad5, acad6, acad7, pub1, pub2));
        log.info("Academics initialized");
    }

    private void initializeSkills() {
        Skill sk1 = new Skill(null, "ETL / Amazon S3 / Amazon Redshift", 90, "Technical", 1);
        Skill sk2 = new Skill(null, "SCADA", 50, "Technical", 2);
        Skill sk3 = new Skill(null, "Java / Spring Framework", 85, "Technical", 3);
        Skill sk4 = new Skill(null, "Python", 60, "Technical", 4);
        Skill sk5 = new Skill(null, "SQL / PostgreSQL", 80, "Technical", 5);
        Skill sk6 = new Skill(null, "HTML / CSS / Tailwind", 30, "Technical", 6);
        Skill sk7 = new Skill(null, "AWS / Cloud Architecture", 70, "Technical", 7);
        Skill sk8 = new Skill(null, "Next.js / TypeScript", 25, "Technical", 8);
        Skill sk9 = new Skill(null, "Git / GitHub", 50, "Tools", 9);
        Skill sk10 = new Skill(null, "Docker / Docker-compose", 45, "Tools", 10);
        Skill sk11 = new Skill(null, "Grafana / Server Monitoring", 45, "Tools", 11);
        Skill sk12 = new Skill(null, "Linux / Server Administration", 45, "Tools", 12);
        Skill sk13 = new Skill(null, "App Deployment / Web Hosting", 80, "Tools", 13);
        Skill sk14 = new Skill(null, "Agile Tools", 75, "Tools", 14);
        Skill sk15 = new Skill(null, "Communication", 90, "Soft Skills", 15);
        Skill sk16 = new Skill(null, "Problem Solving", 90, "Soft Skills", 16);
        Skill sk17 = new Skill(null, "Teamwork & Collaboration", 90, "Soft Skills", 17);
        Skill sk18 = new Skill(null, "Leadership & Mentoring", 50, "Soft Skills", 18);

        skillRepository.saveAll(Arrays.asList(sk1, sk2, sk3, sk4, sk5, sk6, sk7, sk8, sk9, sk10, sk11, sk12, sk13, sk14, sk15, sk16, sk17, sk18));
        log.info("Skills initialized");
    }
}
