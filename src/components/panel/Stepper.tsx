import React, { useState, ReactNode } from "react";

type StepperProps = {
  children: ReactNode[];
  headers: string[];
  className?: string;
  orientation?: "horizontal" | "vertical";
};

const StepperPanel = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`p-4 transition-opacity duration-500 ease-in-out ${className}`}>
      {children}
    </div>
  );
};

const Stepper = ({
  children,
  headers,
  className = "",
  orientation = "horizontal",
}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => (prev < children.length - 1 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const toggleStep = (index: number) => {
    setCurrentStep((prev) => (prev === index ? -1 : index));
  };

  return (
    <div
      className={`flex ${
        orientation === "horizontal" ? "flex-col" : "flex-row"
      } ${className}`}
    >
      {orientation === "horizontal" ? (
        <>
          {/* Horizontal Step Indicator */}
          <div className="flex justify-between items-center w-full mb-4">
            {children.map((_, index) => (
              <div key={index} className="relative flex items-center flex-1">
                <div className="flex items-center gap-2 z-50 bg-primary px-1 dark:bg-shade">
                  {/* Step Circle */}
                  <div
                    className={`size-6 flex justify-center items-center rounded-full border-2
                                            ${
                                              index === currentStep
                                                ? "border-highlight bg-highlight text-primary font-bold dark:border-ocean dark:bg-ocean dark:text-light"
                                                : "border-border text-muted dark:border-coal dark:text-faint"
                                            }
                                            transition-all duration-500 ease-in-out`}
                  >
                    {index + 1}
                  </div>

                  {/* Step Label */}
                  <div
                    className={`text-sm
                                            ${
                                              index === currentStep
                                                ? "text-highlight font-bold dark:text-ocean"
                                                : "text-muted dark:text-faint"
                                            }
                                            transition-colors duration-500 ease-in-out`}
                  >
                    {headers[index]}
                  </div>
                </div>

                {/* Line Between Steps */}
                {index < children.length - 1 && (
                  <div
                    className={`absolute left-0 right-0 top-1/2 transform -translate-y-1/2 w-full
                                        ${
                                          index < currentStep
                                            ? "bg-highlight dark:bg-ocean"
                                            : "bg-border dark:bg-coal"
                                        }
                                        transition-all duration-500 ease-in-out`}
                    style={{ height: "2px" }}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Horizontal Step Content */}
          <div className="w-full border border-border dark:border-coal p-4 rounded-md bg-tertiary dark:bg-shadow transition-all duration-500 ease-in-out">
            {children.map((step, index) => (
              <div
                key={index}
                className={`stepper-panel transform transition-transform duration-500 ease-in-out 
                                ${
                                  index === currentStep
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-95"
                                }`}
              >
                {step}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between w-full mt-4">
            {/* Back Button */}
            {currentStep > 0 && (
              <button
                type="button"
                className="bg-secondary dark:bg-dim text-deep dark:text-light px-4 py-2 rounded disabled:bg-muted dark:disabled:bg-coal transition-colors duration-300 ease-in-out"
                onClick={prevStep}
              >
                Back
              </button>
            )}
            <div className="flex-1"></div> {/* Spacer to align the buttons */}
            {/* Next Button */}
            {currentStep < children.length - 1 && (
              <button
                type="button"
                className="bg-gold dark:bg-accent text-primary dark:text-shade px-4 py-2 rounded transition-colors duration-300 ease-in-out"
                onClick={nextStep}
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Vertical Step Indicator */}
          <div className="flex flex-col items-start justify-between gap-5 w-full">
            {children.map((_, index) => (
              <div key={index} className="flex items-start gap-2 w-full">
                {/* Step Circle */}
                <div className="relative space-y-3">
                  <div
                    className={`relative size-6 flex justify-center items-center rounded-full border-2 cursor-pointer z-50 
                                            ${
                                              index === currentStep
                                                ? "border-highlight bg-highlight text-primary font-bold dark:border-ocean dark:bg-ocean dark:text-light"
                                                : "border-border text-muted bg-secondary dark:border-coal dark:bg-dim dark:text-faint"
                                            }
                                            transition-all duration-500 ease-in-out`}
                    onClick={() => toggleStep(index)}
                  >
                    {index + 1}
                  </div>

                  {/* Line Between Steps */}
                  {index < children.length - 1 && (
                    <div
                      className={`absolute top-0 h-full left-1/2 transform -translate-x-1/2 w-0.5 z-0
                                        ${
                                          index < currentStep
                                            ? "bg-highlight dark:bg-ocean"
                                            : "bg-border dark:bg-coal"
                                        }
                                        transition-all duration-500 ease-in-out`}
                      style={{ height: "2rem" }}
                    ></div>
                  )}
                </div>

                {/* Step Label */}
                <div className="w-full flex flex-col gap-3">
                  <div
                    className={`text-sm cursor-pointer
                                            ${
                                              index === currentStep
                                                ? "text-highlight font-bold dark:text-ocean"
                                                : "text-muted dark:text-faint"
                                            }
                                            transition-colors duration-500 ease-in-out`}
                    onClick={() => toggleStep(index)}
                  >
                    {headers[index]}
                  </div>
                  {index === currentStep && (
                    <div className="flex flex-col gap-3 content-with-button">
                      {/* Vertical Step Content */}
                      <div
                        className={`w-full border border-border dark:border-coal p-4 rounded-md bg-tertiary dark:bg-shadow 
                  overflow-hidden transition-all duration-500 ease-in-out 
                  ${
                    index === currentStep
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                      >
                        {children[index]}
                      </div>
                      {/* Navigation Buttons */}
                      <div className="flex items-center gap-3">
                        {/* Back Button */}
                        {currentStep > 0 && (
                          <button
                            type="button"
                            className="bg-secondary dark:bg-dim text-deep dark:text-light px-4 py-2 rounded disabled:bg-muted dark:disabled:bg-coal transition-colors duration-300 ease-in-out"
                            onClick={prevStep}
                          >
                            Back
                          </button>
                        )}
                        {/* Next Button */}
                        {currentStep < children.length - 1 && (
                          <button
                            type="button"
                            className="bg-gold dark:bg-accent text-primary dark:text-shade px-4 py-2 rounded transition-colors duration-300 ease-in-out"
                            onClick={nextStep}
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export { Stepper, StepperPanel };
