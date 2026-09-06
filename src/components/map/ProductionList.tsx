import { TpIcon } from "./icons";
import { Section } from "./Section";
import type { TopConsumer } from "./data";

interface ProductionListProps {
  items: readonly TopConsumer[];
}

/**
 * "Sarfi yuqori transformatorlar" - har biri #F3F3F3 qator: chapda
 * `circuit-board` + TP nomi, o'ngda qizil (#CF4646) qiymat.
 */
export function ProductionList({ items }: ProductionListProps) {
  return (
    <Section label="Sarfi yuqori transformatorlar">
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex h-[45px] items-center justify-between rounded-lg bg-[#F3F3F3] px-5"
          >
            <span className="flex items-center gap-3 text-[16px] font-bold leading-[21px] text-[#333333]">
              <TpIcon className="h-5 w-5 shrink-0" strokeWidth={2} />
              {item.label}
            </span>
            <span className="text-[16px] font-bold leading-[21px] text-[#CF4646]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
