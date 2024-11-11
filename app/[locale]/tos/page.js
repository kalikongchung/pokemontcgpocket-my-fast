import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

Welcome to Pokémon TCG Pocket!

These Terms of Service ("Terms") govern your use of the Pokémon TCG Pocket mobile application (the "App") developed by Creatures Inc. By downloading, installing, or using our App, you agree to these Terms.

What is Pokémon TCG Pocket?

Pokémon TCG Pocket is your digital gateway to collecting Pokémon trading cards. This free-to-play mobile application offers daily booster packs, AR card features, and an auto-battle system that brings the excitement of Pokémon TCG to your mobile device.

Key Features:

1. Daily Rewards: Receive two free booster packs each day
2. Digital Collection: Build and organize your digital card collection
3. AR Features: Experience cards in augmented reality
4. Auto-Battle System: Enjoy strategic gameplay even with limited time
5. Global Community: Share and showcase your collection with players worldwide

Data Collection and Privacy

We collect and process certain data to provide and improve our services, including:
- Basic account information
- Game progress and statistics
- Device information and usage data
For complete details, please refer to our Privacy Policy at [Privacy Policy URL].

In-App Purchases

While Pokémon TCG Pocket is free to download and play, it offers optional in-app purchases such as:
- Premium Passes
- Poké Coins
- Special card packs and items

All purchases are final, subject to applicable refund policies in your jurisdiction.

Intellectual Property

All Pokémon-related content, including card designs, artwork, and the Pokémon TCG Pocket name and logo are protected intellectual property of The Pokémon Company, Creatures Inc., and their licensors.

Usage Guidelines

- Players must be 13 years or older to create an account
- Respect other players and follow community guidelines
- Do not use unauthorized third-party software or modifications
- Do not buy, sell, or trade accounts

Service Availability

We strive to maintain continuous service but cannot guarantee uninterrupted access to the App. We may perform maintenance or updates that temporarily affect availability.

Governing Law

These Terms are governed by the laws of Japan, where Creatures Inc. is headquartered.

Updates to Terms

We may update these Terms periodically. Significant changes will be communicated through the App or via email.

Contact Us

For support or inquiries, please contact us at support@pokemontcgpocket.my

Thank you for choosing Pokémon TCG Pocket - your digital destination for Pokémon card collecting!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
