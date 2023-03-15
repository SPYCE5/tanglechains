import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

import { sendPageView } from "../../utils/gtags";

const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const consentScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${NEXT_PUBLIC_GA_ID}');`;

export function AnalyticsProvider({ children, lang }) {
  const { events } = useRouter();

  const [consented, setConsented] = useState(null);

  const cookieConsent = getCookieConsentValue("cookie-consent");

  useEffect(() => {
    if (cookieConsent === "true") {
      setConsented(true);
    } else {
      setConsented(false);
    }
  }, [cookieConsent]);

  useEffect(() => {
    if (!NEXT_PUBLIC_GA_ID || !consented) {
      return;
    }

    events.on("routeChangeComplete", sendPageView);

    return () => {
      events.off("routeChangeComplete", sendPageView);
    };
  }, [consented, events]);

  return (
    <>
      {!NEXT_PUBLIC_GA_ID || !consented ? (
        <>{children}</>
      ) : (
        <>
          <Script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: consentScript,
            }}
          ></Script>
          {children}
        </>
      )}
      <CookieConsent
        cookieName="cookie-consent"
        containerClasses="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-end gap-4 z-50"
        contentClasses="border-2 border-white border-solid flex items-center text-14"
        buttonClasses="px-4 sm:px-6 py-2 bg-[#DEDEDE] border-[1px] border-[#21C3E8] border-solid rounded-lg font-bold"
        buttonWrapperClasses="flex gap-4"
        declineButtonClasses="px-4 sm:px-6 py-2 bg-[#DEDEDE] border-2 border-[#DEDEDE] border-solid rounded-lg font-bold"
        buttonText="Accept"
        declineButtonText="Reject"
        disableStyles
        enableDeclineButton
        onAccept={() => setConsented(true)}
        onDecline={() => setConsented(false)}
      >
        <div className="text-[10px] sm:text-[16px] font-light sm:flex sm:gap-2">
          <span>{"This website uses cookies for site analytics."}</span>
          <span className="mx-1">
            <a className="underline underline-offset-2" href="https://spyce5.com/privacy-policy/">
              {"Read more"}
            </a>
          </span>
        </div>
      </CookieConsent>
    </>
  );
}
