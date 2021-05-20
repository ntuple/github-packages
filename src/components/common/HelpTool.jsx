import React from 'react';
import { Tooltip } from 'react-tippy';
import useTranslation from 'next-translate/useTranslation';
import QuestionIcon from '../../public/icons/common/question-circle.svg';

import style from './HelpTool.module.scss';

const HelpTool = ({
  tip,
  alwaysShowIcon = false,
  zIndex = 3,
  position = 'bottom-end',
}) => {
  /* added z-index props to show in react-modal that has more zIndex */
  const { t } = useTranslation();
  return (
    <div className="small ml-2 ml-lg-0" role="button">
      {/*We need to 2 tooltip blocks because tooltip position is not render correctly for both positioning*/}
      <div
        className={`d-none ${alwaysShowIcon ? '' : 'd-lg-block'} text-primary`}
      >
        <Tooltip
          title={tip.replace(/\n/g, '<br>')}
          position="bottom-start"
          trigger="click"
          arrow={true}
          theme="blue" // override default styles
          zIndex={zIndex} // override default z-index for overlapping issues with sticky bar everywhere
        >
          <span>{t('common:tooltip_label')}</span>
        </Tooltip>
      </div>

      <div
        className={`${style['help-tool__icon']} d-inline-block ${
          alwaysShowIcon ? '' : 'd-lg-none'
        }`}
      >
        <Tooltip
          title={tip.replace(/\n/g, '<br>')}
          position={position}
          trigger="click"
          arrow={true}
          theme="blue" // override default styles
          zIndex={zIndex} // override default z-index for overlapping issues with sticky bar everywhere
        >
          <QuestionIcon width="16" height="16" />
        </Tooltip>
      </div>
    </div>
  );
};

export default HelpTool;
