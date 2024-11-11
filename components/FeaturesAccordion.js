"use client";

import { useState, useRef } from "react";
import Image from "next/image";

// The features array is a list of features that will be displayed in the accordion.
// - title: The title of the feature
// - description: The description of the feature (when clicked)
// - type: The type of media (video or image)
// - path: The path to the media (for better SEO, try to use a local path)
// - format: The format of the media (if type is 'video')
// - alt: The alt text of the image (if type is 'image')
const features = [
  {
    title: "Emails",
    description:
      "Send transactional emails, setup your DNS to avoid spam folder (DKIM, DMARC, SPF in subdomain), and listen to webhook to receive & forward emails",
    type: "video",
    path: "https://d3m8mk7e1mf7xn.cloudfront.net/app/newsletter.webm",
    format: "video/webm",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
        />
      </svg>
    ),
  },
  {
    title: "Payments",
    description:
      "Create checkout sessions, handle webhooks to update user's account (subscriptions, one-time payments...) and tips to setup your account & reduce chargebacks",
    type: "image",
    path: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    alt: "A computer",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
        />
      </svg>
    ),
  },
  {
    title: "Authentication",
    description:
      "Magic links setup, login with Google walkthrough, save user in MongoDB/Supabase, private/protected pages & API calls",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Style",
    description:
      "Components, animations & sections (like this features section), 20+ themes with daisyUI, automatic dark mode",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
  },
];

// An SEO-friendly accordion component including the title and a description (when clicked.)
const Item = ({ feature, isOpen, setFeatureSelected }) => {
  const accordion = useRef(null);
  const { title, description, svg } = feature;

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left md:text-lg"
        onClick={(e) => {
          e.preventDefault();
          setFeatureSelected();
        }}
        aria-expanded={isOpen}
      >
        <span className={`duration-100 ${isOpen ? "text-primary" : ""}`}>
          {svg}
        </span>
        <span
          className={`flex-1 text-base-content ${
            isOpen ? "text-primary font-semibold" : ""
          }`}
        >
          <h3 className="inline">{title}</h3>
        </span>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out text-base-content-secondary overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{description}</div>
      </div>
    </li>
  );
};

// A component to display the media (video or image) of the feature. If the type is not specified, it will display an empty div.
// Video are set to autoplay for best UX.
const Media = ({ feature }) => {
  const { type, path, format, alt } = feature;
  const style = "rounded-2xl aspect-square w-full sm:w-[26rem]";
  const size = {
    width: 500,
    height: 500,
  };

  if (type === "video") {
    return (
      <video
        className={style}
        autoPlay
        muted
        loop
        playsInline
        controls
        width={size.width}
        height={size.height}
      >
        <source src={path} type={format} />
      </video>
    );
  } else if (type === "image") {
    return (
      <Image
        src={path}
        alt={alt}
        className={`${style} object-cover object-center`}
        width={size.width}
        height={size.height}
      />
    );
  } else {
    return <div className={`${style} !border-none`}></div>;
  }
};

// A component to display 2 to 5 features in an accordion.
// By default, the first feature is selected. When a feature is clicked, the others are closed.
// const FeaturesAccordion = () => {
//   const [featureSelected, setFeatureSelected] = useState(0);
//
//   return (
//     <section
//       className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-base-100 "
//       id="features"
//     >
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//           All you need to ship your startup fast
//           <span className="bg-neutral text-neutral-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
//             and get profitable
//           </span>
//         </h2>
//         <div className=" flex flex-col md:flex-row gap-12 md:gap-24">
//           <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
//             <ul className="w-full">
//               {features.map((feature, i) => (
//                 <Item
//                   key={feature.title}
//                   index={i}
//                   feature={feature}
//                   isOpen={featureSelected === i}
//                   setFeatureSelected={() => setFeatureSelected(i)}
//                 />
//               ))}
//             </ul>
//
//             <Media feature={features[featureSelected]} key={featureSelected} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


// const FeaturesAccordion = () => {
//   const [featureSelected, setFeatureSelected] = useState(0);
//
//   return (
//     <section className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-base-100">
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//            What is a Lead Generator?
//         </h2>
//         <p>
//           Before we explore the incredible benefits of our automated lead generator, let's start with the basics. Understanding what a lead generator is and how it works is crucial to appreciating its value in your marketing arsenal.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Understanding Lead Generation
//         </h3>
//         <p>
//           Lead generation is the cornerstone of successful marketing. It's the process of identifying and cultivating potential customers for your products or services. A lead generator is a tool or strategy designed to attract and capture these potential customers, converting them into valuable leads for your sales team.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            How Lead Generators Work
//         </h3>
//         <p>
//           Lead generators function by creating opportunities for potential customers to interact with your brand. They typically offer something of value – such as informative content, free trials, or exclusive offers – in exchange for contact information. Our automated lead generator streamlines this process, making it more efficient and effective than ever before.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Types of Lead Generators
//         </h3>
//         <p>
//           There are various types of lead generators in the market, each with its unique approach. Our automated lead generator incorporates the best features of different types, including:
//         </p>
//         <ul>
//           <li>Content-based lead magnets</li>
//           <li>Email capture forms</li>
//           <li>Social media campaigns</li>
//           <li>Targeted advertisements</li>
//           <li>Automated lead discovery</li>
//           <li>Webinars and online events</li>
//           <li>Referral programs</li>
//           <li>Chat and chatbot interactions</li>
//         </ul>
//         <p>
//           By leveraging this diverse range of strategies, our lead generator ensures you're capturing the most relevant and high-quality leads for your business.
//         </p>
//       </div>
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//            Why Use an Automated Lead Generator?
//         </h2>
//         <p>
//           Now that we understand what a lead generator is, let's explore why an automated solution like weblead.ai is the way to go. Our lead generator offers numerous advantages that can transform your marketing efforts and drive unprecedented growth.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Increase Efficiency
//         </h3>
//         <p>
//           In the fast-paced world of digital marketing, efficiency is key. Our automated lead generator helps you save valuable time and resources by:
//         </p>
//         <ul>
//           <li>Reaching a larger audience in less time</li>
//           <li>Reducing manual data entry errors</li>
//           <li>Allowing your team to focus on high-value tasks while the lead generator works tirelessly in the background</li>
//           <li>Providing 24/7 lead generation capabilities</li>
//           <li>Scaling your efforts without proportionally increasing workload</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Improve Lead Quality
//         </h3>
//         <p>
//           Not all leads are created equal, and our lead generator understands this. By using advanced algorithms and machine learning, we help you identify and prioritize the most promising prospects. This means:
//         </p>
//         <ul>
//           <li>Higher conversion rates for your sales team</li>
//           <li>More efficient use of your resources</li>
//           <li>Improved ROI on your marketing efforts</li>
//           <li>Personalized lead scoring based on your specific criteria</li>
//           <li>Continuous learning and optimization of lead quality over time</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Save Time and Resources
//         </h3>
//         <p>
//           Implementing our automated lead generator can significantly reduce the resources required for lead generation. You'll benefit from:
//         </p>
//         <ul>
//           <li>Reduced manpower needs for lead generation tasks</li>
//           <li>Lower overall marketing costs</li>
//           <li>Faster lead acquisition and nurturing processes</li>
//           <li>Elimination of repetitive tasks</li>
//           <li>More time for strategic planning and creative marketing initiatives</li>
//         </ul>
//       </div>
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//            Who Benefits from Lead Generators?
//         </h2>
//         <p>
//           Our automated lead generator is designed to help a wide range of businesses and organizations. Let's look at who can benefit most from this powerful tool and how it can address their specific needs.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Small and Medium Businesses
//         </h3>
//         <p>
//           For SMBs, every lead counts, and resources are often limited. Our lead generator helps level the playing field, allowing smaller businesses to compete with larger competitors by:
//         </p>
//         <ul>
//           <li>Expanding reach without increasing overhead</li>
//           <li>Providing enterprise-level lead generation capabilities at an affordable price</li>
//           <li>Offering scalable solutions that grow with your business</li>
//           <li>Automating processes that would otherwise require a larger team</li>
//           <li>Providing valuable insights and analytics typically reserved for larger corporations</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Marketing Agencies
//         </h3>
//         <p>
//           If you're a marketing agency, our lead generator can be a game-changer for your clients. You'll be able to:
//         </p>
//         <ul>
//           <li>Offer more comprehensive services to your clients</li>
//           <li>Demonstrate clear ROI and value-add to your service offerings</li>
//           <li>Handle multiple lead generation campaigns simultaneously</li>
//           <li>Customize lead generation strategies for different client needs</li>
//           <li>Stay ahead of the competition with cutting-edge technology</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            E-commerce Companies
//         </h3>
//         <p>
//           In the competitive world of e-commerce, finding and nurturing leads is crucial. Our lead generator helps by:
//         </p>
//         <ul>
//           <li>Identifying potential customers across various online platforms</li>
//           <li>Automating follow-up emails for abandoned carts</li>
//           <li>Creating personalized offers based on browsing behavior</li>
//           <li>Segmenting leads based on purchase history and preferences</li>
//           <li>Integrating with popular e-commerce platforms for seamless operation</li>
//         </ul>
//       </div>
//
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//            When to Implement a Lead Generator?
//         </h2>
//         <p>
//           Timing is everything in marketing. Here's when you should consider implementing our automated lead generator to maximize its impact on your business growth.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Starting a New Marketing Campaign
//         </h3>
//         <p>
//           Launching a new campaign? It's the perfect time to integrate our lead generator. You'll be able to:
//         </p>
//         <ul>
//           <li>Capture leads from day one of your campaign</li>
//           <li>A/B test different lead generation strategies in real-time</li>
//           <li>Quickly adapt your approach based on real-time data and insights</li>
//           <li>Build a solid foundation for long-term marketing success</li>
//           <li>Create buzz and momentum around your new campaign</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Scaling Up Your Lead Acquisition
//         </h3>
//         <p>
//           If you're looking to grow your business, our lead generator can help you scale your lead acquisition efforts efficiently. It's ideal when:
//         </p>
//         <ul>
//           <li>Your current lead generation methods are maxed out</li>
//           <li>You're entering new markets or launching new products</li>
//           <li>You need to support an expanding sales team</li>
//           <li>You're ready to take your business to the next level</li>
//           <li>You want to explore new channels and opportunities for growth</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Enhancing Customer Outreach
//         </h3>
//         <p>
//           Ready to take your customer outreach to the next level? Our lead generator can help by:
//         </p>
//         <ul>
//           <li>Personalizing communication at scale</li>
//           <li>Automating follow-up sequences for improved engagement</li>
//           <li>Identifying cross-selling and upselling opportunities</li>
//           <li>Reactivating dormant leads and customers</li>
//           <li>Creating targeted campaigns for different customer segments</li>
//         </ul>
//       </div>
//
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//            Where to Use a Lead Generator?
//         </h2>
//         <p>
//           Our versatile lead generator can be applied across various marketing channels and strategies. Let's explore where you can leverage this powerful tool to maximize your marketing impact.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            B2B Marketing
//         </h3>
//         <p>
//           In the B2B space, quality leads are everything. Our lead generator excels in:
//         </p>
//         <ul>
//           <li>Identifying decision-makers within target companies</li>
//           <li>Generating leads through industry-specific content and thought leadership</li>
//           <li>Automating outreach for account-based marketing strategies</li>
//           <li>Nurturing long-term relationships with potential clients</li>
//           <li>Providing valuable insights into your B2B target market</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            B2C Campaigns
//         </h3>
//         <p>
//           For B2C businesses, casting a wide net is often crucial. Our lead generator helps by:
//         </p>
//         <ul>
//           <li>Capturing leads through engaging social media campaigns</li>
//           <li>Generating interest through targeted ads across multiple platforms</li>
//           <li>Creating personalized offers based on consumer behavior and preferences</li>
//           <li>Automating lead nurturing for different consumer segments</li>
//           <li>Integrating with e-commerce platforms for seamless lead-to-customer conversion</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Email Marketing Strategies
//         </h3>
//         <p>
//           Email remains one of the most effective marketing channels, and our lead generator takes it to the next level:
//         </p>
//         <ul>
//           <li>Building and segmenting email lists automatically</li>
//           <li>Crafting personalized email sequences for different lead types</li>
//           <li>Optimizing send times for maximum engagement</li>
//           <li>Analyzing email performance and adjusting strategies in real-time</li>
//           <li>Ensuring compliance with email marketing regulations</li>
//         </ul>
//       </div>
//
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//            How Our Lead Generator Works
//         </h2>
//         <p>
//           Now, let's dive into the nuts and bolts of our automated lead generator. Here's how this powerful tool works to supercharge your marketing efforts and drive substantial business growth.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Automated Lead Discovery
//         </h3>
//         <p>
//           Our lead generator doesn't just wait for leads to come to you – it actively seeks them out. Here's how:
//         </p>
//         <ol>
//           <li>It scans various online sources, including social media, business directories, and industry forums.</li>
//           <li>Advanced algorithms identify potential leads based on your specified criteria and ideal customer profile.</li>
//           <li>The system verifies and enriches lead data to ensure accuracy and completeness.</li>
//           <li>Leads are scored and prioritized based on their likelihood to convert.</li>
//           <li>The process continually refines itself through machine learning, improving accuracy over time.</li>
//         </ol>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Bulk Email Sending
//         </h3>
//         <p>
//           Once leads are identified, our generator helps you reach out at scale without losing the personal touch:
//         </p>
//         <ol>
//           <li>Personalized email templates are created based on lead characteristics and behavior.</li>
//           <li>Emails are sent in bulk while maintaining a personal feel for each recipient.</li>
//           <li>The system manages unsubscribes and bounces automatically to maintain list hygiene.</li>
//           <li>A/B testing is utilized to optimize email content and subject lines.</li>
//           <li>Detailed analytics provide insights into open rates, click-through rates, and conversions.</li>
//         </ol>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Integration with Marketing Tools
//         </h3>
//         <p>
//           Our lead generator doesn't work in isolation. It seamlessly integrates with your existing marketing stack:
//         </p>
//         <ul>
//           <li>CRM systems for efficient lead management and tracking</li>
//           <li>Marketing automation platforms for nurturing campaigns</li>
//           <li>Analytics tools for comprehensive performance tracking</li>
//           <li>Social media platforms for integrated social lead generation</li>
//           <li>E-commerce platforms for direct sales integration</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Analyzing and Optimizing Performance
//         </h3>
//         <p>
//           Continuous improvement is key to successful lead generation. Our tool provides:
//         </p>
//         <ul>
//           <li>Real-time performance metrics and customizable dashboards</li>
//           <li>A/B testing capabilities for different lead generation strategies</li>
//           <li>AI-driven insights for optimizing your approach</li>
//           <li>Predictive analytics to forecast future lead generation trends</li>
//           <li>Detailed reports for stakeholders and decision-makers</li>
//         </ul>
//       </div>
//
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//            What Does a Lead Generator Do?
//         </h2>
//         <p>
//           A lead generator is a powerful tool in your marketing arsenal, designed to streamline and optimize the process of attracting potential customers. Let's delve into the key functions of a lead generator:
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Capturing Potential Customer Information
//         </h3>
//         <p>
//           At its core, a lead generator collects valuable contact information from individuals interested in your products or services. This typically includes:
//         </p>
//         <ul>
//           <li>Names</li>
//           <li>Email addresses</li>
//           <li>Phone numbers</li>
//           <li>Company details (for B2B)</li>
//           <li>Specific interests or pain points</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Qualifying Leads
//         </h3>
//         <p>
//           Not all leads are created equal. A sophisticated lead generator, like the one offered by weblead.ai, goes beyond mere data collection:
//         </p>
//         <ul>
//           <li>It assesses lead quality based on predetermined criteria</li>
//           <li>Scores leads to prioritize follow-up actions</li>
//           <li>Filters out low-quality or irrelevant leads to save your team's time</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Nurturing Prospects
//         </h3>
//         <p>
//           Lead generation doesn't stop at information gathering. Our lead generator also:
//         </p>
//         <ul>
//           <li>Initiates automated follow-up sequences</li>
//           <li>Delivers targeted content based on lead preferences</li>
//           <li>Tracks interactions to gauge interest levels</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Providing Actionable Insights
//         </h3>
//         <p>
//           A good lead generator is also an analytical powerhouse:
//         </p>
//         <ul>
//           <li>It offers detailed reports on lead generation performance</li>
//           <li>Identifies trends and patterns in your target audience</li>
//           <li>Suggests optimizations for your lead generation strategies</li>
//         </ul>
//       </div>
//
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//            Are Lead Generators Worth It?
//         </h2>
//         <p>
//           This is a crucial question for any business considering investing in a lead generator. Let's break down the value proposition:
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Return on Investment (ROI)
//         </h3>
//         <p>
//           Lead generators can significantly boost your ROI:
//         </p>
//         <ul>
//           <li>They increase the quantity and quality of leads</li>
//           <li>Reduce the cost per lead acquisition</li>
//           <li>Improve conversion rates, leading to higher revenue</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Time and Resource Savings
//         </h3>
//         <p>
//           By automating many aspects of lead generation, these tools free up your team:
//         </p>
//         <ul>
//           <li>Reduce manual data entry and lead research time</li>
//           <li>Allow your sales team to focus on closing deals rather than finding prospects</li>
//           <li>Provide 24/7 lead generation, even outside business hours</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Scalability
//         </h3>
//         <p>
//           As your business grows, a lead generator grows with you:
//         </p>
//         <ul>
//           <li>Easily handle increased lead volumes without proportional increase in resources</li>
//           <li>Quickly adapt to new markets or product lines</li>
//           <li>Integrate with other tools as your marketing stack evolves</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Data-Driven Decision Making
//         </h3>
//         <p>
//           Lead generators provide valuable insights:
//         </p>
//         <ul>
//           <li>Understand your audience better through detailed analytics</li>
//           <li>Make informed decisions about marketing strategies</li>
//           <li>Continuously optimize your lead generation efforts based on real data</li>
//         </ul>
//       </div>
//
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//            How Can I Generate My Own Leads?
//         </h2>
//         <p>
//           While using a professional lead generator like weblead.ai offers numerous advantages, there are also strategies you can employ to generate your own leads:
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Content Marketing
//         </h3>
//         <p>
//           Create valuable content to attract potential customers:
//         </p>
//         <ul>
//           <li>Blog posts addressing common pain points in your industry</li>
//           <li>Whitepapers or ebooks offering in-depth insights</li>
//           <li>Webinars or video tutorials showcasing your expertise</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Social Media Engagement
//         </h3>
//         <p>
//           Leverage social platforms to connect with your audience:
//         </p>
//         <ul>
//           <li>Share relevant content regularly</li>
//           <li>Engage in conversations within your industry</li>
//           <li>Use targeted ads to reach potential leads</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Networking and Events
//         </h3>
//         <p>
//           Don't underestimate the power of personal connections:
//         </p>
//         <ul>
//           <li>Attend industry conferences and trade shows</li>
//           <li>Host your own events (virtual or in-person)</li>
//           <li>Join professional associations related to your field</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Referral Programs
//         </h3>
//         <p>
//           Encourage your satisfied customers to bring in new leads:
//         </p>
//         <ul>
//           <li>Offer incentives for successful referrals</li>
//           <li>Make it easy for customers to share your products or services</li>
//           <li>Provide excellent service to increase the likelihood of referrals</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            SEO Optimization
//         </h3>
//         <p>
//           Improve your visibility in search engine results:
//         </p>
//         <ul>
//           <li>Optimize your website for relevant keywords</li>
//           <li>Create landing pages tailored to specific search intents</li>
//           <li>Regularly update your content to stay relevant</li>
//         </ul>
//       </div>
//
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//            How Do You Generate Leads Instantly?
//         </h2>
//         <p>
//           While sustainable lead generation is typically a long-term process, there are strategies to quickly boost your lead acquisition:
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Paid Advertising
//         </h3>
//         <p>
//           Invest in targeted ads for immediate visibility:
//         </p>
//         <ul>
//           <li>Google Ads for search engine marketing</li>
//           <li>Social media ads on platforms like Facebook, LinkedIn, or Instagram</li>
//           <li>Retargeting campaigns to re-engage website visitors</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Limited-Time Offers
//         </h3>
//         <p>
//           Create a sense of urgency to encourage quick action:
//         </p>
//         <ul>
//           <li>Flash sales or time-limited discounts</li>
//           <li>Exclusive access to new products or services</li>
//           <li>Countdown timers on landing pages to drive conversions</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Chatbots and Live Chat
//         </h3>
//         <p>
//           Engage visitors in real-time:
//         </p>
//         <ul>
//           <li>Implement chatbots to qualify leads 24/7</li>
//           <li>Offer live chat support during business hours</li>
//           <li>Use conversational marketing to guide visitors towards conversion</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Pop-Ups and Exit Intent Offers
//         </h3>
//         <p>
//           Capture leads before they leave your site:
//         </p>
//         <ul>
//           <li>Use exit-intent pop-ups with special offers</li>
//           <li>Implement slide-in forms for newsletter sign-ups</li>
//           <li>Create welcome mats with lead magnets for new visitors</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//            Partnerships and Co-Marketing
//         </h3>
//         <p>
//           Leverage other brands' audiences:
//         </p>
//         <ul>
//           <li>Collaborate on webinars or events with complementary businesses</li>
//           <li>Guest post on popular industry blogs</li>
//           <li>Participate in podcast interviews to reach new audiences</li>
//         </ul>
//         <p>
//           While these strategies can generate leads quickly, it's important to remember that sustainable lead generation is an ongoing process. Combining these quick-win tactics with a robust, automated lead generator like weblead.ai can provide both immediate results and long-term success.
//         </p>
//       </div>
//
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//            Conclusion
//         </h2>
//         <p>
//           By implementing these strategies and leveraging the power of an automated lead generator, you can create a comprehensive approach to lead generation that drives your business forward. Whether you're looking for instant results or building a sustainable pipeline of high-quality leads, the right combination of tactics and tools can help you achieve your goals and grow your business effectively.
//         </p>
//         <p>
//           Are you ready to transform your online marketing with weblead.ai's automated lead generator? Start efficiently finding leads and sending bulk emails to boost your business growth today. Don't let valuable leads slip through your fingers – harness the power of automation and watch your business soar!
//         </p>
//       </div>
//
//
//     </section>
//   );
// };



//4.9%
// const FeaturesAccordion = () => {
//   const [featureSelected, setFeatureSelected] = useState(0);
//
//   return (
//     <section className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-base-100">
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//           What is a Lead Generator?
//         </h2>
//         <p>
//           Before we explore the incredible benefits of our Lead Generator, let's start with the basics. Understanding what a Lead Generator is and how it works is crucial to appreciating its value in your marketing arsenal. A Lead Generator is more than just a tool; it's a key component of successful marketing strategies.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//           Understanding Lead Generation and Lead Generators
//         </h3>
//         <p>
//           Lead generation is the cornerstone of successful marketing. It's the process of identifying and cultivating potential customers for your products or services. A Lead Generator is a tool or strategy designed to attract and capture these potential customers, converting them into valuable leads for your sales team. Without a Lead Generator, your marketing efforts might fall short of their full potential.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//           How Lead Generators Work
//         </h3>
//         <p>
//           Lead Generators function by creating opportunities for potential customers to interact with your brand. They typically offer something of value – such as informative content, free trials, or exclusive offers – in exchange for contact information. Our automated Lead Generator streamlines this process, making it more efficient and effective than ever before. With a Lead Generator, you can effortlessly capture leads while focusing on other crucial aspects of your business.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//           Types of Lead Generators
//         </h3>
//         <p>
//           There are various types of Lead Generators in the market, each with its unique approach. Our automated Lead Generator incorporates the best features of different types, including:
//         </p>
//         <ul>
//           <li>Content-based Lead Generators</li>
//           <li>Email capture forms</li>
//           <li>Social media campaigns</li>
//           <li>Targeted advertisements</li>
//           <li>Automated lead discovery</li>
//           <li>Webinars and online events</li>
//           <li>Referral programs</li>
//           <li>Chat and chatbot interactions</li>
//         </ul>
//         <p>
//           By leveraging this diverse range of strategies, our Lead Generator ensures you're capturing the most relevant and high-quality leads for your business. A well-rounded Lead Generator is essential for maximizing your lead generation potential.
//         </p>
//       </div>
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//           Why Use an Automated Lead Generator?
//         </h2>
//         <p>
//           Now that we understand what a Lead Generator is, let's explore why an automated solution like weblead.ai is the way to go. Our Lead Generator offers numerous advantages that can transform your marketing efforts and drive unprecedented growth. An automated Lead Generator is more than just a convenience; it's a necessity in today's fast-paced digital world.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//           Increase Efficiency with a Lead Generator
//         </h3>
//         <p>
//           In the fast-paced world of digital marketing, efficiency is key. Our automated Lead Generator helps you save valuable time and resources by:
//         </p>
//         <ul>
//           <li>Reaching a larger audience in less time with a Lead Generator</li>
//           <li>Reducing manual data entry errors through automation in your Lead Generator</li>
//           <li>Allowing your team to focus on high-value tasks while the Lead Generator works tirelessly in the background</li>
//           <li>Providing 24/7 lead generation capabilities with an automated Lead Generator</li>
//           <li>Scaling your efforts without proportionally increasing workload, thanks to your Lead Generator</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//           Improve Lead Quality with a Lead Generator
//         </h3>
//         <p>
//           Not all leads are created equal, and our Lead Generator understands this. By using advanced algorithms and machine learning, we help you identify and prioritize the most promising prospects. This means:
//         </p>
//         <ul>
//           <li>Higher conversion rates for your sales team with the help of a Lead Generator</li>
//           <li>More efficient use of your resources when using a Lead Generator</li>
//           <li>Improved ROI on your marketing efforts with a Lead Generator</li>
//           <li>Personalized lead scoring based on your specific criteria through your Lead Generator</li>
//           <li>Continuous learning and optimization of lead quality over time by your Lead Generator</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//           Save Time and Resources with a Lead Generator
//         </h3>
//         <p>
//           Implementing our automated Lead Generator can significantly reduce the resources required for lead generation. You'll benefit from:
//         </p>
//         <ul>
//           <li>Reduced manpower needs for lead generation tasks through a Lead Generator</li>
//           <li>Lower overall marketing costs with a Lead Generator</li>
//           <li>Faster lead acquisition and nurturing processes with the support of a Lead Generator</li>
//           <li>Elimination of repetitive tasks by using a Lead Generator</li>
//           <li>More time for strategic planning and creative marketing initiatives, thanks to a Lead Generator</li>
//         </ul>
//       </div>
//       <div className="px-8">
//         <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
//           Who Benefits from Lead Generators?
//         </h2>
//         <p>
//           Our automated Lead Generator is designed to help a wide range of businesses and organizations. Let's look at who can benefit most from this powerful tool and how it can address their specific needs. Whether you're a small business or a large enterprise, a Lead Generator can be a game-changer for your marketing efforts.
//         </p>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//           Small and Medium Businesses Need a Lead Generator
//         </h3>
//         <p>
//           For SMBs, every lead counts, and resources are often limited. Our Lead Generator helps level the playing field, allowing smaller businesses to compete with larger competitors by:
//         </p>
//         <ul>
//           <li>Expanding reach without increasing overhead with the help of a Lead Generator</li>
//           <li>Providing enterprise-level lead generation capabilities at an affordable price through a Lead Generator</li>
//           <li>Offering scalable solutions that grow with your business, thanks to a Lead Generator</li>
//           <li>Automating processes that would otherwise require a larger team with a Lead Generator</li>
//           <li>Providing valuable insights and analytics typically reserved for larger corporations through a Lead Generator</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//           Marketing Agencies Can Benefit from a Lead Generator
//         </h3>
//         <p>
//           If you're a marketing agency, our Lead Generator can be a game-changer for your clients. You'll be able to:
//         </p>
//         <ul>
//           <li>Offer more comprehensive services to your clients with a Lead Generator</li>
//           <li>Demonstrate clear ROI and value-add to your service offerings with a Lead Generator</li>
//           <li>Handle multiple lead generation campaigns simultaneously using a Lead Generator</li>
//           <li>Customize lead generation strategies for different client needs through a Lead Generator</li>
//           <li>Stay ahead of the competition with cutting-edge technology like our Lead Generator</li>
//         </ul>
//         <h3 className="font-extrabold text-2xl lg:text-4xl tracking-tight mb-8 md:mb-12">
//           E-commerce Companies Need a Lead Generator
//         </h3>
//         <p>
//           In the competitive world of e-commerce, finding and nurturing leads is crucial. Our Lead Generator helps by:
//         </p>
//         <ul>
//           <li>Identifying potential customers across various online platforms with a Lead Generator</li>
//           <li>Automating follow-up emails for abandoned carts using a Lead Generator</li>
//           <li>Creating personalized offers based on browsing behavior with a Lead Generator</li>
//           <li>Segmenting leads based on interests and purchase history through a Lead Generator</li>
//           <li>Increasing conversion rates and average order value with a Lead Generator</li>
//         </ul>
//         <p>
//           The benefits of a Lead Generator are clear – whether you're looking to save time, reduce costs, or improve lead quality, an automated Lead Generator like ours is the perfect solution.
//         </p>
//       </div>
//     </section>
//   );
// };
//
// export default FeaturesAccordion;



const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState(0);

  return (
    <section className="bg-gray-100">
    <div className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto">

      <div className="px-8 space-y-12">
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight text-gray-900">
          What is a Lead Generator?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Before we explore the incredible benefits of our Lead Generator, let&apos;s start with the basics. Understanding what a Lead Generator is and how it works is crucial to appreciating its value in your marketing arsenal. A Lead Generator is more than just a tool; it&apos;s a key component of successful marketing strategies.
        </p>
        <div className="space-y-8">
          <h3 className="font-bold text-2xl lg:text-3xl tracking-tight text-gray-800">
            Understanding Lead Generation and Lead Generators
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lead generation is the cornerstone of successful marketing. It&apos;s the process of identifying and cultivating potential customers for your products or services. A Lead Generator is a tool or strategy designed to attract and capture these potential customers, converting them into valuable leads for your sales team. Without a Lead Generator, your marketing efforts might fall short of their full potential.
          </p>
        </div>
        <div className="space-y-8">
          <h3 className="font-bold text-2xl lg:text-3xl tracking-tight text-gray-800">
            How Lead Generators Work
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lead Generators function by creating opportunities for potential customers to interact with your brand. They typically offer something of value – such as informative content, free trials, or exclusive offers – in exchange for contact information. Our automated Lead Generator streamlines this process, making it more efficient and effective than ever before. With a Lead Generator, you can effortlessly capture leads while focusing on other crucial aspects of your business.
          </p>
        </div>
        <div className="space-y-8">
          <h3 className="font-bold text-2xl lg:text-3xl tracking-tight text-gray-800">
            Types of Lead Generators
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            There are various types of Lead Generators in the market, each with its unique approach. Our automated Lead Generator incorporates the best features of different types, including:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-4">
            <li>Content-based Lead Generators</li>
            <li>Email capture forms</li>
            <li>Social media campaigns</li>
            <li>Targeted advertisements</li>
            <li>Automated lead discovery</li>
            <li>Webinars and online events</li>
            <li>Referral programs</li>
            <li>Chat and chatbot interactions</li>
          </ul>
          <p className="text-lg text-gray-700 leading-relaxed">
            By leveraging this diverse range of strategies, our Lead Generator ensures you&apos;re capturing the most relevant and high-quality leads for your business. A well-rounded Lead Generator is essential for maximizing your lead generation potential.
          </p>
        </div>
      </div>

      <div className="px-8 space-y-12">
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight text-gray-900">
          Why Use an Automated Lead Generator?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Now that we understand what a Lead Generator is, let&apos;s explore why an automated solution like weblead.ai is the way to go. Our Lead Generator offers numerous advantages that can transform your marketing efforts and drive unprecedented growth. An automated Lead Generator is more than just a convenience; it&apos;s a necessity in today&apos;s fast-paced digital world.
        </p>
        <div className="space-y-8">
          <h3 className="font-bold text-2xl lg:text-3xl tracking-tight text-gray-800">
            Increase Efficiency with a Lead Generator
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            In the fast-paced world of digital marketing, efficiency is key. Our automated Lead Generator helps you save valuable time and resources by:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-4">
            <li>Reaching a larger audience in less time with a Lead Generator</li>
            <li>Reducing manual data entry errors through automation in your Lead Generator</li>
            <li>Allowing your team to focus on high-value tasks while the Lead Generator works tirelessly in the background</li>
            <li>Providing 24/7 lead generation capabilities with an automated Lead Generator</li>
            <li>Scaling your efforts without proportionally increasing workload, thanks to your Lead Generator</li>
          </ul>
        </div>
        <div className="space-y-8">
          <h3 className="font-bold text-2xl lg:text-3xl tracking-tight text-gray-800">
            Improve Lead Quality with a Lead Generator
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Not all leads are created equal, and our Lead Generator understands this. By using advanced algorithms and machine learning, we help you identify and prioritize the most promising prospects. This means:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-4">
            <li>Higher conversion rates for your sales team with the help of a Lead Generator</li>
            <li>More efficient use of your resources when using a Lead Generator</li>
            <li>Improved ROI on your marketing efforts with a Lead Generator</li>
            <li>Personalized lead scoring based on your specific criteria through your Lead Generator</li>
            <li>Continuous learning and optimization of lead quality over time by your Lead Generator</li>
          </ul>
        </div>
        <div className="space-y-8">
          <h3 className="font-bold text-2xl lg:text-3xl tracking-tight text-gray-800">
            Save Time and Resources with a Lead Generator
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Implementing our automated Lead Generator can significantly reduce the resources required for lead generation. You&apos;ll benefit from:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-4">
            <li>Reduced manpower needs for lead generation tasks through a Lead Generator</li>
            <li>Lower overall marketing costs with a Lead Generator</li>
            <li>Faster lead acquisition and nurturing processes with the support of a Lead Generator</li>
            <li>Elimination of repetitive tasks by using a Lead Generator</li>
            <li>More time for strategic planning and creative marketing initiatives, thanks to a Lead Generator</li>
          </ul>
        </div>
      </div>

      <div className="px-8 space-y-12">
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight text-gray-900">
          Who Benefits from Lead Generators?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our automated Lead Generator is designed to help a wide range of businesses and organizations. Let&apos;s look at who can benefit most from this powerful tool and how it can address their specific needs. Whether you&apos;re a small business or a large enterprise, a Lead Generator can be a game-changer for your marketing efforts.
        </p>
        <div className="space-y-8">
          <h3 className="font-bold text-2xl lg:text-3xl tracking-tight text-gray-800">
            Small and Medium Businesses Need a Lead Generator
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            For SMBs, every lead counts, and resources are often limited. Our Lead Generator helps level the playing field, allowing smaller businesses to compete with larger competitors by:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-4">
            <li>Expanding reach without increasing overhead with the help of a Lead Generator</li>
            <li>Providing enterprise-level lead generation capabilities at an affordable price through a Lead Generator</li>
            <li>Offering scalable solutions that grow with your business, thanks to a Lead Generator</li>
            <li>Automating processes that would otherwise require a larger team with a Lead Generator</li>
            <li>Providing valuable insights and analytics typically reserved for larger corporations through a Lead Generator</li>
          </ul>
        </div>
        <div className="space-y-8">
          <h3 className="font-bold text-2xl lg:text-3xl tracking-tight text-gray-800">
            Marketing Agencies Can Benefit from a Lead Generator
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;re a marketing agency, our Lead Generator can be a game-changer for your clients. You&apos;ll be able to:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-4">
            <li>Offer more comprehensive services to your clients with a Lead Generator</li>
            <li>Demonstrate clear ROI and value-add to your service offerings with a Lead Generator</li>
            <li>Handle multiple lead generation campaigns simultaneously using a Lead Generator</li>
            <li>Customize lead generation strategies for different client needs through a Lead Generator</li>
            <li>Stay ahead of the competition with cutting-edge technology like our Lead Generator</li>
          </ul>
        </div>
        <div className="space-y-8">
          <h3 className="font-bold text-2xl lg:text-3xl tracking-tight text-gray-800">
            E-commerce Companies Need a Lead Generator
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            In the competitive world of e-commerce, finding and nurturing leads is crucial. Our Lead Generator helps by:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-4">
            <li>Identifying potential customers across various online platforms with a Lead Generator</li>
            <li>Automating follow-up emails for abandoned carts using a Lead Generator</li>
            <li>Creating personalized offers based on browsing behavior with a Lead Generator</li>
            <li>Segmenting leads based on interests and purchase history through a Lead Generator</li>
            <li>Increasing conversion rates and average order value with a Lead Generator</li>
          </ul>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          The benefits of a Lead Generator are clear – whether you&apos;re looking to save time, reduce costs, or improve lead quality, an automated Lead Generator like ours is the perfect solution.
        </p>
      </div>

    </div>
    </section>
  );
};

export default FeaturesAccordion;
