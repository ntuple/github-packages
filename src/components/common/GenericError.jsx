import React from 'react';
import Link from 'next-translate/Link';
import ErrorContainer from './ErrorContainer';
import { useTranslation } from 'next-translate';
import { getUrl } from '../../lib/route';

const GenericError = ({ site }) => {
  const { t } = useTranslation();
  return (
    <ErrorContainer>
      <p>{t('common:error.gone_wrong')}</p>
      <Link href={getUrl(site, 'questions')}>
        <button className="btn btn-success btn-lg mb-4">
          {t('common:error.go_to_start')}
        </button>
      </Link>
      <p>{t('common:error.contact_support')}</p>
    </ErrorContainer>
  );
};

export default GenericError;
