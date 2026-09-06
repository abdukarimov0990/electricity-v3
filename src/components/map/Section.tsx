// Bo'lim sarlavhasi (#999999, Geist 14/700) + tarkib. Figma'dagi har bir
// bo'lim shu ko'rinishda: kulrang label + ostida #F3F3F3 karta(lar).
export function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[14px] font-bold leading-[18px] text-[#999999]">
        {label}
      </span>
      {children}
    </div>
  );
}
