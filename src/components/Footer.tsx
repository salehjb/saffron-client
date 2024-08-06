import Image from "next/image";
import { InstagramIcon, TelegramIcon, WhatsappIcon } from "./ui/MyIcons";

const Footer = () => {
  return (
    <div className="mt-16 bg-[var(--saffron-dark)] py-4">
      <div className="container">
        <div className="flex justify-center gap-3 border-b border-zinc-300 pb-4">
          <div className="relative w-10 h-8">
            <Image
              src="/just-logo.png"
              alt="logo"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-yekan-bakh-heavy text-lg text-white">
            زروند، انتخابی هوشمندانه
          </h3>
        </div>
        <div className="mt-6 text-center items-center md:text-right flex gap-x-20 gap-y-10 flex-wrap justify-between text-white">
          {/* Contact US */}
          <div>
            <h4 className="font-yekan-bakh-heavy mb-2">تماس با زروند</h4>
            <p className="text-zinc-300">مرکز تماس: 051336955684</p>
            <p className="text-zinc-300">
              نشانی: مشهد، شهرک صنعتی توس، فاز ۴، شقایق ۳۵
            </p>
          </div>
          {/* Social Medias */}
          <div dir="ltr" className="text-zinc-300 space-y-2 mx-auto md:mx-0">
            <div className="flex items-center gap-2">
              <InstagramIcon className="w-6 h-6" />
              <span>@zarvand_saffron</span>
            </div>
            <div className="flex items-center gap-2">
              <WhatsappIcon className="w-6 h-6" />
              <span>+98-9153397899</span>
            </div>
            <div className="flex items-center gap-2">
              <TelegramIcon className="w-6 h-6" />
              <span>@zarvand_saffron</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
