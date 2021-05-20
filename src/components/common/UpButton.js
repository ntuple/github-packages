import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-translate';
import styles from './UpButton.module.scss';
import screenSize from '../../lib/constants/screenSize';

const UpButton = ({ questionOrder }) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const updateDisplay = () => {
    if (window.scrollY > 200 && window.innerWidth <= screenSize.SMALL) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const offset = (el) => {
    const rect = el?.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect?.top + scrollTop, left: rect?.left + scrollLeft };
  };

  const scrollUp = (e) => {
    e.preventDefault();

    //nearest upper Question
    const userCurrentPosition = window.scrollY;
    const progressBarSize = 65;
    let upperQuestion = '';

    for (let qn of questionOrder) {
      let elem = document.getElementById(qn);
      if (offset(elem).top < userCurrentPosition) {
        upperQuestion = qn;
      }
    }

    let upperQnBlock = document.getElementById(upperQuestion);
    // Navigate user to previous question
    setTimeout(() => {
      window.scrollTo({
        top: offset(upperQnBlock).top - progressBarSize,
        behavior: 'smooth',
      });
    }, 100);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDisplay);
    window.addEventListener('scroll', updateDisplay);
    return () => {
      window.removeEventListener('resize', updateDisplay);
      window.removeEventListener('scroll', updateDisplay);
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${show ? 'visible' : 'invisible'}`}
      onClick={scrollUp}
    >
      <button className={`${styles.upbtn} btn d-flex flex-column`}>
        <div className="icon-up text-primary" />
        <div className={`${styles.text}`}>{t('common:up_button_label')}</div>
      </button>
    </div>
  );
};

export default UpButton;
