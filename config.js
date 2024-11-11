import themes from "daisyui/src/theming/themes.js";

const config = {
  // REQUIRED
  appName: "Pokemon TCG Pocket - Your Digital Card Collection Adventure",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Collect, battle, and trade Pokémon cards in your pocket! Experience the thrill of opening packs and building your digital collection.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "pokemontcgpocket.my",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // isFeatured: true,
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? process.env.START_PRICE_ID
            : process.env.START_PRICE_ID,
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Starter Monthly",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Your Secret Weapon for Mastering Rocket Recovery",
        // The price you want to display, the one user will be charged on Stripe.
        price: 0,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: 43,
        features: [
          { name: "Enjoy playing" },
          // { name: "Generate eye-catching patterns in seconds" },
          // { name: "Access to custom-tuned SD model for unique designs" },
          // { name: "Overcome creative blocks instantly" },
          // { name: "Impress clients with professional-grade patterns" },
          // { name: "Boost productivity and meet tight deadlines" },
          // { name: "60-day money-back guarantee" },
          // { name: "24/7 email support" },
        ],
      },
      // {
      //   // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
      //   isFeatured: true,
      //   priceId:
      //     process.env.NODE_ENV === "development"
      //       ? process.env.ADV_PRICE_ID
      //       : process.env.ADV_PRICE_ID,
      //   name: "Advanced Yearly",
      //   description: "Save 2 Months of Subscription",
      //   price: 210,
      //   priceAnchor: 490,
      //   features: [
      //     { name: "15000 AI Pattern credits" },
      //     { name: "Generate eye-catching patterns in seconds" },
      //     { name: "Access to custom-tuned SD model for unique designs" },
      //     { name: "Overcome creative blocks instantly" },
      //     { name: "Impress clients with professional-grade patterns" },
      //     { name: "Boost productivity and meet tight deadlines" },
      //     { name: "120-day money-back guarantee" },
      //     { name: "24/7 email support" },
      //   ],
      // },
      // {
      //   // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
      //   // isFeatured: true,
      //   priceId:
      //     process.env.NODE_ENV === "development"
      //       ? process.env.PRO_PRICE_ID
      //       : process.env.PRO_PRICE_ID,
      //   name: "Professional Monthly",
      //   description: "You need powerful AI",
      //   price: 49.99,
      //   priceAnchor: 60,
      //   features: [
      //     { name: "3000 AI Pattern credits" },
      //     { name: "Generate eye-catching patterns in seconds" },
      //     { name: "Access to custom-tuned SD model for unique designs" },
      //     { name: "Overcome creative blocks instantly" },
      //     { name: "Impress clients with professional-grade patterns" },
      //     { name: "Boost productivity and meet tight deadlines" },
      //     { name: "60-day money-back guarantee" },
      //     { name: "24/7 email support with advanced assistance" },
      //   ],
      // },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Starship: The Game <support@starshipthegame.site>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `admin at Starship: The Game <support@starshipthegame.site>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "support@starshipthegame.site",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "support@starshipthegame.site",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "dim",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes[`[data-theme=autumn]`]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
};

export default config;
