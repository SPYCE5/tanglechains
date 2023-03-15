export const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const sendPageView = (url) => {
  window.gtag("config", NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};
