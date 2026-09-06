import { OperatorIcon } from "./icons";
import { Section } from "./Section";

interface OperatorCardProps {
  name: string;
}

/** "Ma'sul shaxs" bo'limi - #F3F3F3 karta, `user-shield` ikonasi + ism. */
export function OperatorCard({ name }: OperatorCardProps) {
  return (
    <Section label="Ma'sul shaxs">
      <div className="flex h-12 items-center gap-3 rounded-lg bg-[#F3F3F3] px-5">
        <OperatorIcon
          className="h-6 w-6 shrink-0 text-[#333333]"
          strokeWidth={2}
        />
        <span className="truncate text-[16px] font-bold leading-[21px] text-[#333333]">
          {name}
        </span>
      </div>
    </Section>
  );
}
