import React from 'react';
import {
  ProgressBar as ReactStepProgressBar,
  Step,
} from 'react-step-progress-bar';
import asset from '../../utils/asset';

const ProgressBar = ({ sections, percentage }) => (
  <div className="sticky-top bg-white rf-progress-bar-container">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col" style={{ maxWidth: '1000px' }}>
          <div className="pt-1 pt-lg-3 px-5 px-lg-0 mt-3 rf-progress-bar">
            <ReactStepProgressBar
              percent={percentage}
              filledBackground="linear-gradient(to right, #1067cc, #019dd6)"
            >
              {sections.map((section) => {
                return (
                  <Step transition="scale" key={section.title}>
                    {({ accomplished }) => (
                      <>
                        <div
                          className={`rf-progress-bar-label position-absolute  ${
                            accomplished ? 'text-primary' : ''
                          }`}
                        >
                          {section.title}
                        </div>
                        <div>
                          <img
                            className="rf-progress-bar__icon"
                            src={
                              accomplished
                                ? asset('icons/progress/active.svg')
                                : asset('icons/progress/inactive.svg')
                            }
                            alt={accomplished ? 'x' : 'o'}
                            width="20"
                            height="20"
                          />
                        </div>
                      </>
                    )}
                  </Step>
                );
              })}
            </ReactStepProgressBar>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProgressBar;
