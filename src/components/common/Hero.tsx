import React from 'react';
import ButtonLink from './ButtonLink';

const Hero: React.FC = () => {
  return (
    <section className="relative text-soft dark:text-pale">
      <div className="container mx-auto px-4 py-48">
        <div className="flex flex-wrap -mx-4">
          <div className="mx-auto px-4 text-center w-full lg:w-8/12">
            <p className="font-medium mb-2 text-highlight dark:text-ocean uppercase">
              The Latest
            </p>
            <h1 className="font-extrabold mb-4 text-4xl lg:text-6xl text-deep dark:text-light">
              The Natural Experience
            </h1>
            <p className="font-light mb-6 text-lg">
              Our ability to feel, act and communicate is indistinguishable from magic.
            </p>
            <ButtonLink href="#">
              Get It Now
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
