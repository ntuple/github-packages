import Trans from 'next-translate/Trans';
import { getLanguage } from 'lib/translation';
import { getConfig } from 'lib/services/sortAndFilter/factory';
import transformSummary from './transformSummary';
import transformTitle from './transformTitle';
import transformSubtitle from './transformSubtitle';
import transformLogo from './transformLogo';
import transformDetails from './transformDetails';
import { getRangeFilter, getInsurerFilter } from './transformSortAndFilter';
import transformPremium from './transformPremium';
import transformDiscount from './transformDiscount';
import transformInstalment from './transformInstalment';
import transformRating from './transformRating';
import transformEcommerce from './transformEcommerce';

class Transformer {
  transformApiResponse(response, filterValues = {}) {
    return response.map((apiPackage) =>
      this.transformApiPackage(apiPackage, filterValues)
    );
  }

  transformApiPackage(apiPackage, filterValues = {}) {
    const lang = getLanguage();
    const packageSource = apiPackage?.package_source;
    return {
      id: apiPackage.id,
      is_recommended: apiPackage.car_insurance_type === 'Type 1',
      logo: transformLogo(apiPackage),
      title: transformTitle(apiPackage, lang),
      subtitle: transformSubtitle(apiPackage),
      premium: transformPremium(apiPackage, filterValues),
      headerType:
        packageSource &&
        (packageSource === 'manual' || packageSource === 'renewal')
          ? 'source'
          : 'discount',
      discount: transformDiscount(apiPackage),
      // @todo add to api
      installments: transformInstalment(apiPackage),
      // @todo add to api
      rating: transformRating(apiPackage),
      online_sale: apiPackage.can_buy,
      summary: transformSummary(apiPackage),
      details: transformDetails(apiPackage, lang),
      ecommerce: transformEcommerce(apiPackage, filterValues),
      packageSource,
    };
  }

  transformFilterHeader(lead, packageNumber) {
    return (
      <Trans
        i18nKey="motor:quote.filter.header"
        /* eslint-disable-next-line react/jsx-key */
        components={[<div className="text-black font-size-lg" />, <strong />]}
        values={{
          number: packageNumber,
          carBrand: lead.car.brand,
          carModel: lead.car.model,
        }}
      />
    );
  }

  transformFilterSortConfig(lead, apiPackages) {
    const { insurance_kind, insurance_voluntary } = lead;
    const config = { ...getConfig('motor') };

    const insurerIds = new Set();
    const prices = new Set();

    apiPackages.map((apiPackage) => {
      insurerIds.add(apiPackage.insurance_company_id);
      prices.add(apiPackage.sum_coverage_max);
    });

    if (prices.size > 0) {
      config.filters = [...config.filters, getRangeFilter(prices)];
    }

    const defaultInsurers = {};
    if (insurerIds.size > 0) {
      const insurerFilter = getInsurerFilter(insurerIds);

      insurerFilter.values.forEach((value) => {
        defaultInsurers[value.key] = true;
      });

      config.filters = [...config.filters, insurerFilter];
    }

    config.defaultValues = {
      sortBy: 'price',
      insuranceType: {
        'Type 1': insurance_voluntary.includes('Type 1'),
        'Type 2+/3+': insurance_voluntary.includes('Type 2+'),
        'Type 2/3': false,
      },
      insuranceCategory: insurance_kind,
      repairType: 'both',
      deductible: 'all_packages',
      driver: 'all_packages',
      insurer: defaultInsurers,
    };

    return config;
  }
}

export default Transformer;
