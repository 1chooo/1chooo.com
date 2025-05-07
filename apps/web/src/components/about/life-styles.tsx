import CodeHeader from "@/components/section/about/code-header";
import ServiceItem from "@/components/about/service-item";

import type { LifeStyle } from "@/types/about";

interface LifeStylesProps {
  lifestyles: LifeStyle[];
}

function LifeStyles({ lifestyles }: LifeStylesProps) {
  return (
    <section id="life-styles">
      <CodeHeader text="$ ls -al Life Style" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {lifestyles.map((lifestyle: LifeStyle) => (
          <ServiceItem lifestyle={lifestyle} key={lifestyle.title} />
        ))}
      </div>
    </section>
  );
}

export default LifeStyles;
