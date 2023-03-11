import * as React from "react";
import Link from "next/link";

import { notTranslation as useTranslations } from "../../utils";
import Logo from "./Logo";

export default function Layout({ children, lang }) {
  const t = useTranslations("Common", lang);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[40vw,_auto] bg-[#030227]">
      <div className="h-full">
        <div className="px-5 py-20 sticky top-0 bottom-0 m-auto flex flex-col gap-8 h-screen max-w-[480px] mx-auto">
          <div className="relative flex flex-col justify-center gap-8 h-screen">
            <div className="relative flex flex-col justify-center gap-8 h-full">
              <figure className="lg:mr-auto flex flex-col items-center gap-4">
                <Logo />
                <figcaption className="font-medium text-2xl text-white">{t("help-info")}</figcaption>
              </figure>

              <h1 className="font-medium text-[#A9B8C5]">{t("description")}</h1>

              <div className="flex flex-col gap-4 w-full">
                <a
                  className="flex items-center justify-center mx-auto lg:ml-0 gap-2 rounded-[50px] max-w-[16.25rem] font-medium py-[18px] px-6 shadow-lg w-full bg-[#21C3E8]  "
                  href="https://github.com/spyce5/tanglechains-rpc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-base font-medium">{t("add-your-network")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[22px] h-[22px]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </a>

                <a
                  className="flex items-center justify-center mx-auto lg:ml-0 gap-2 rounded-[50px] max-w-[16.25rem] font-medium py-[17px] px-6 w-full text-[#21C3E8] border border-[#21C3E8]"
                  href="https://github.com/spyce5/tanglechains-rpc/blob/main/constants/extraRpcs.js"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-base font-medium">{t("add-your-rpc")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[22px] h-[22px]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <Link href="/" prefetch={false}>
                  <span className="font-medium text-[#21C3E8]">{t("how-to-add-network")}</span>
                </Link>
                <Link href="/" prefetch={false}>
                  <span className="font-medium text-[#21C3E8]">{t("how-to-add-rpc")}</span>
                </Link>
              </div>
              <div className="w-full flex">
                <Link href="https://spyce5.com/" prefetch={false} className="flex-1">
                  <img src="/operated-by.png" alt="operated by logo" />
                </Link>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex justify-end gap-1.5">
                    <Link href="/" prefetch={false}>
                      <span className="font-medium text-[#21C3E8]">{t("link-faq")}</span>
                    </Link>
                    <span className="font-medium text-[#21C3E8]">|</span>
                    <Link href="/" prefetch={false}>
                      <span className="font-medium text-[#21C3E8]">{t("link-imprint")}</span>
                    </Link>
                  </div>
                  <div className="flex justify-end">
                    <Link href="https://twitter.com/tanglechains" prefetch={false}>
                      <img src="/twitter.png" alt="twitter logo" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f3f3f3] p-5 relative flex flex-col gap-5">{children}</div>
    </div>
  );
}
