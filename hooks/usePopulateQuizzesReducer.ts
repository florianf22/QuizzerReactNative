import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useActions } from './useActions';

export default () => {
  const { populateOptions } = useActions();
  const { t } = useTranslation('options');

  const options = {
    categories: [],
    types: [
      { name: t('fourAnswer'), id: 'multiple' },
      { name: t('trueFalse'), id: 'boolean' },
    ],
    difficulties: [
      { name: t('easy'), id: 'Easy' },
      { name: t('medium'), id: 'Medium' },
      { name: t('hard'), id: 'Hard' },
    ],
    quantities: [
      { name: t('five'), id: '5' },
      { name: t('ten'), id: '10' },
      { name: t('twenty'), id: '20' },
    ],
  };

  useLayoutEffect(() => {
    populateOptions(options);
  }, []);
};
