import {
  ChartSpline,
  PackageCheck,
  ShieldCheck,
  Smile,
  Sprout,
} from "lucide-react";

const WHYUS_LIST = [
  {
    title: "کیفیت برتر",
    icon: ChartSpline,
    description:
      "زعفران زروند با دقت و وسواس فراوان از بهترین مزارع زعفران در ایران برداشت می‌شود. ما تضمین می‌کنیم که تمامی محصولات ما دارای بالاترین استانداردهای کیفیت هستند و از هرگونه افزودنی‌های غیرمجاز و تقلبی به دور می‌باشند.",
  },
  {
    title: "عطر و طعم بی‌نظیر",
    icon: Smile,
    description:
      "زعفران زروند با داشتن عطر و طعم منحصر به فرد خود، تجربه‌ای فراموش‌نشدنی از استفاده در غذاها، دسرها و نوشیدنی‌ها برای شما به ارمغان می‌آورد. قدرت رنگ‌دهی بالای زعفران ما، به هر غذایی جلوه‌ای خاص می‌بخشد.",
  },
  {
    title: "بسته‌بندی حرفه‌ای",
    icon: PackageCheck,
    description:
      "محصولات ما در بسته‌بندی‌های متنوع و با کیفیت بالا ارائه می‌شوند تا علاوه بر حفظ تازگی و عطر زعفران، حمل و نگهداری آن نیز آسان باشد. بسته‌بندی‌های ما به گونه‌ای طراحی شده‌اند که زعفران را در برابر نور، هوا و رطوبت محافظت می‌کنند.",
  },
  {
    title: "صد درصد طبیعی و ارگانیک",
    icon: Sprout,
    description:
      "زعفران زروند به صورت کاملاً طبیعی و بدون استفاده از هرگونه مواد شیمیایی و آفت‌کش‌ها کشت و برداشت می‌شود. ما به سلامتی شما اهمیت می‌دهیم و تلاش می‌کنیم تا بهترین و خالص‌ترین زعفران را به شما ارائه دهیم.",
  },
  {
    title: "تضمین بازگشت وجه",
    icon: ShieldCheck,
    description:
      "ما به کیفیت محصولات خود اطمینان داریم و برای رضایت کامل شما، تضمین بازگشت وجه را ارائه می‌دهیم. در صورت عدم رضایت، می‌توانید محصول را بازگردانده و وجه خود را دریافت کنید.",
  },
];

const WhyUs = () => {
  return (
    <div className="container">
      {/* Title */}
      <h2 className="text-xl lg:text-2xl font-yekan-bakh-heavy mb-10">
        چرا زعفران زروند؟
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-8">
        {WHYUS_LIST.map((item, i) => {
          const Icon = item.icon;
          return (
            <li key={i} className="relative p-4 bg-white rounded-md shadow-sm">
              <div className="absolute right-[40%] -top-5 bg-red-600/40 p-2 rounded-full">
                <Icon className="w-7 h-7 text-[var(--saffron-dark)]" />
              </div>
              <div className="mt-5">
                <h3 className="text-center font-yekan-bakh-heavy">{item.title}</h3>
                <p className="mt-2 text-zinc-500">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WhyUs;
