import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export async function generateMetadata({ params }) {
  return getSEOTags({
    title: `Privacy Policy | ${config.appName}`,
    canonicalUrlRelative: `/${params.locale}/privacy-policy`,
  });
}

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: ${new Date().toDateString()}

Privacy Policy for Pokémon TCG Pocket

Welcome to Pokémon TCG Pocket, the mobile application that brings the excitement of Pokémon card collecting to your device! This Privacy Policy outlines how we protect your information while you use Pokémon TCG Pocket (the "Service").

1. Information We Collect

1.1 Personal Data
We collect:
- Device Information: To ensure optimal app performance and compatibility
- Usage Data: To improve your gaming experience and app functionality
- Location Data: To provide region-specific features and content (optional)

1.2 Game Progress
We track your in-game progress, including:
- Card collection data
- Battle history
- Achievement records
- Daily pack opening statistics

2. How We Use Your Data

We use your data to:
- Enhance your gaming experience
- Provide personalized content and recommendations
- Maintain and improve app performance
- Send important updates about the game

3. Data Security

Your privacy and security are paramount. We implement industry-standard security measures to protect your information and game data. We share data only with trusted partners necessary for operating the Service.

4. Age Restrictions

Pokémon TCG Pocket is intended for users 13 and older. We do not knowingly collect information from users under 13 years of age.

5. Policy Updates

We may update this policy as our Service evolves. Significant changes will be communicated through in-app notifications and on our website.

6. Contact Information

For privacy-related inquiries:
Email: privacy@pokemontcgpocket.my
Website: https://pokemontcgpocket.my

7. In-App Purchases

While Pokémon TCG Pocket offers free daily card packs, we also provide optional in-app purchases for premium passes and Poké Coins. All purchases are processed securely through your device's app store.

By using Pokémon TCG Pocket, you agree to this Privacy Policy and our commitment to protecting your privacy while providing an engaging card collection experience.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
