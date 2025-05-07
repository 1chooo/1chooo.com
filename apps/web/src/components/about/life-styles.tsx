import CodeHeader from "@/components/section/about/code-header";
import GradientCard from "@/components/ui/gradient-card";

import type { LifeStyle } from "@/types/about";

interface LifeStylesProps {
  lifestyles: LifeStyle[];
}

function LifeStyles({ lifestyles }: LifeStylesProps) {
  return (
    <section id="life-styles">
      <CodeHeader text="$ ls -al Life Style" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {lifestyles.map((lifestyle: LifeStyle, index) => (
          <GradientCard key={lifestyle.title || index}>
            <div className="mb-2.5 sm:mb-0 sm:mt-2 flex justify-center items-center">
              <lifestyle.icon
                className="text-orange-yellow-crayola"
                size={24}
              />
            </div>

            <div className="text-center sm:text-left">
              <h4 className="text-white-2 text-lg font-bold mb-[7px]">
                {lifestyle.title}
              </h4>
              <p className="text-light-gray text-sm font-light leading-6">
                {lifestyle.text}
              </p>
            </div>
          </GradientCard>
        ))}
      </div>
    </section>
  );
}

export default LifeStyles;
