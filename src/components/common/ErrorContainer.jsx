import React, { useEffect } from 'react';
import ConfiguredContactBanner from './ConfiguredContactBanner';
import asset from '../../utils/asset';
import { useTranslation } from 'next-translate';

const ErrorContainer = ({ children }) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.backgroundColor = '#f1f6ff';
    return () => {
      document.body.style.backgroundColor = '#fff';
    };
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1 className="h4 font-weight-bolder mt-5 mb-3">
                  {t('common:error.sorry')}
                </h1>
                {children}
              </div>

              <ConfiguredContactBanner />

              <div className="text-center">
                <img
                  src={asset('/images/banners/rabbit-oops.svg')}
                  className="img-fluid mt-3"
                  height="195"
                  alt="Oops!"
                  style={{ marginBottom: '-10px', maxWidth: '410px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorContainer;
