import footerLogo from "@/assets/footer-logo.svg";
import applePayLogo from "@/assets/icons/apple-pay.svg";
import googlePayLogo from "@/assets/icons/google-pay.svg";
import mastercardLogo from "@/assets/icons/mastercard.svg";
import visaLogo from "@/assets/icons/visa.svg";

const paymentMethods = [
  {
    id: "mastercard",
    src: mastercardLogo,
    alt: "Mastercard",
    className: "h-5 w-16.5",
  },
  { id: "visa", src: visaLogo, alt: "Visa", className: "h-6 w-14" },
  {
    id: "apple-pay",
    src: applePayLogo,
    alt: "Apple Pay",
    className: "h-5 w-11.75",
  },
  {
    id: "google-pay",
    src: googlePayLogo,
    alt: "Google Pay",
    className: "h-5 w-12.25",
  },
];

export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-[#F0F0F0] bg-white md:h-20">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 px-4 py-4 md:h-20 md:flex-row md:items-center md:justify-between md:py-0">
        <div className="flex items-center gap-3">
          <img
            src={footerLogo}
            alt="AQVEX footer logo"
            className="h-10 w-25.75 shrink-0"
            loading="lazy"
          />
          <span className="text-sm leading-[140%] tracking-[-0.02em] text-[#8090A4]">
            AQVEX © 2026 | Все права защищены
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-5.5">
          {paymentMethods.map((method) => (
            <img
              key={method.id}
              src={method.src}
              alt={method.alt}
              className={`${method.className} shrink-0 object-contain`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </footer>
  );
};
