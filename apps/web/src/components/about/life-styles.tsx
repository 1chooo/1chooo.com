import GradientCard from "@/components/ui/gradient-card";
import AboutSection from "@/components/section/about";
import { BlurFade } from "@/components/magicui/blur-fade";
import { getIcon } from "@/components//icons";

import type { LifeStyle } from "@/types/about";

interface LifeStylesProps {
  lifestyles: LifeStyle[];
}

function LifeStyles({ lifestyles }: LifeStylesProps) {
  return (
    <AboutSection id="life-styles" title="Life Styles">
      <BlurFade inView delay={0.4} direction="up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {lifestyles.map((lifestyle: LifeStyle, index) => {
            const Icon = getIcon(lifestyle.icon);

            return (
              <GradientCard key={lifestyle.title || index}>
                <div className="mb-2.5 sm:mb-0 sm:mt-2 flex justify-center items-center">
                  <Icon className="text-orange-yellow-crayola"
                    size={24} />
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
            );
          })}
        </div>
      </BlurFade>
    </AboutSection>
  );
}

export default LifeStyles;
