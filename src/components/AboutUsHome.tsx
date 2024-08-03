const AboutUsHome = () => {
  return (
    <div className="container">
      <div className="relative bg-[url(/photos/about-us-home.jpg)] bg-cover bg-no-repeat bg-center p-6 rounded-md overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black/45 z-10" />
        <div className="relative z-50 space-y-3">
          <h3 className="text-xl md:text-2xl text-white font-yekan-bakh-heavy">
            درباره زروند
          </h3>
          <p className="text-zinc-200 md:text-lg">
            زروند، برندی است که با هدف ارائه بهترین و باکیفیت‌ترین زعفران ایران
            به بازارهای داخلی و خارجی تأسیس شده است. ما به عنوان یکی از پیشگامان
            صنعت زعفران، به تولید و توزیع زعفران با بالاترین استانداردهای کیفیتی
            پرداخته و تلاش می‌کنیم تا اصالت و خلوص این طلای سرخ را حفظ کنیم.
            زروند با بهره‌گیری از تجربه و تخصص چندین ساله در کشت و برداشت
            زعفران، در سال‌های اخیر به یکی از معتبرترین برندهای زعفران در ایران
            تبدیل شده است. ما از ابتدا با هدف ارتقاء کیفیت زعفران ایرانی و
            رساندن این محصول ارزشمند به دست مشتریان در سراسر جهان فعالیت خود را
            آغاز کردیم. با تکیه بر اصول علمی و استفاده از تکنولوژی‌های مدرن،
            توانسته‌ایم فرآیند تولید را بهبود بخشیم و محصولی با کیفیت بی‌نظیر
            ارائه دهیم.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHome;
