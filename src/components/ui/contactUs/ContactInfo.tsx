interface ContactInfoProps {} 

export default function ContactInfo({}: ContactInfoProps) {
  const items = [
    { icon: "/svg/phone.svg", title: "Call Us", desc: "+39 000 111 2222" },
    { icon: "/svg/email.svg", title: "Email Us", desc: "support@staxpilot.it" },
    {
      icon: "/svg/location.svg",
      title: "Address",
      desc: "Corso Italia 10, Roma",
    },
  ];

  return (
    <div className="mt-6 bg-[#037BFF] text-white p-6 mb-6 rounded-[26px] flex flex-col md:flex-row md:justify-between gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 md:flex-1 md:justify-center relative"
        >
          <img
            src={item.icon}
            alt={item.title}
            className="w-5 h-5 md:w-6 md:h-6"
          />
          <div className="flex flex-col items-start md:items-center">
            <p className="text-[22px] font-bricolage font-extrabold">
              {item.title}
            </p>
            <p className="text-[16px] leading-[24px]">{item.desc}</p>
          </div>
          {i < items.length - 1 && (
            <div className="hidden md:block border-r border-white h-10 absolute right-0 top-1/2 -translate-y-1/2" />
          )}
        </div>
      ))}
    </div>
  );
}
