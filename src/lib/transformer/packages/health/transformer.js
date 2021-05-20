import Trans from 'next-translate/Trans';
import { getLanguage } from 'lib/translation';
import { getConfig } from 'lib/services/sortAndFilter/factory';
import transformSummary from './transformSummary';
import transformDetails from './transformDetails';
import transformTag from './transformTag';
import transformLogo from './transformLogo';
import transformHeaderLogo from './transformHeaderLogo';
import {
  getFeatureFilter,
  getInsurerFilter,
  getPremiumRangeFilter,
  getCoverageRangeFilter,
} from './transformSortAndFilter';
import transformEcommerce from './transformEcommerce';

class Transformer {
  // eslint-disable-next-line no-unused-vars
  transformApiResponse(response, filterValues = {}, lead) {
    return response.map((apiPackage) =>
      this.transformApiPackage(apiPackage, lead)
    );
  }

  static getSubCategory(lead) {
    const { product_category: category } = lead;
    switch (category) {
      case 'ipdOpd':
        return lead.product_ipdopd_subcategory;
      case 'disease':
        return lead.product_disease_subcategory;
      case 'pa':
        return lead.product_accident_subcategory;
      default:
        return null;
    }
  }

  transformApiPackage(apiPackage, lead) {
    const lang = getLanguage();
    const subCategory = Transformer.getSubCategory(lead);
    return {
      id: apiPackage.id,
      logo: transformLogo(apiPackage.insurer.code),
      title: apiPackage.insurer.name[lang],
      subtitle: apiPackage.product.name[lang],
      premium: apiPackage.premium,
      headerLogo: transformHeaderLogo(apiPackage.category, subCategory),
      installments: 10,
      rating: apiPackage.rating,
      hotDeal: apiPackage.hotDeal,
      category: `health:categories.${apiPackage.category}`,
      subCategory: `health:subCategories.${subCategory}`,
      tags: transformTag(apiPackage.features),
      online_sale: true,
      summary: transformSummary(apiPackage, lang),
      details: transformDetails(apiPackage, subCategory, lang),
      ecommerce: transformEcommerce(apiPackage),
      ...(Boolean(
        apiPackage?.product?.additionalInfo &&
          Object.prototype.hasOwnProperty.call(
            apiPackage.product.additionalInfo,
            lang
          ) &&
          apiPackage.product.additionalInfo[lang] !== ''
      ) && {
        additionalInfo: apiPackage.product.additionalInfo[lang],
        headerType: 'additionalInfo',
      }),
    };
  }

  transformFilterHeader(lead, packageNumber, t) {
    return (
      <Trans
        i18nKey="health:quote.filter.header"
        /* eslint-disable-next-line react/jsx-key */
        components={[<div className="text-black font-size-lg" />, <strong />]}
        values={{
          number: packageNumber,
          productCategory: t(`health:categories.${lead.product_category}`),
        }}
      />
    );
  }

  transformFilterSortConfig(lead, apiPackages) {
    const { product_category: category } = lead;
    const subCategory = Transformer.getSubCategory(lead);
    const lang = getLanguage();
    const config = { ...getConfig('health')[category] };
    const insurers = [];
    const features = new Set();
    const premiums = new Set();
    // let sum_insured = new Set();
    apiPackages &&
      apiPackages.forEach((apiPackage) => {
        insurers.push(apiPackage.insurer);
        premiums.add(apiPackage.premium);
        apiPackage.features.forEach((feature) => {
          features.add(feature);
        });
      });

    config.filters = [
      ...config.filters.map((filter) => {
        switch (filter.code) {
          case 'premium':
            return getPremiumRangeFilter(premiums, category);
          case 'sum_insured':
            return getCoverageRangeFilter(apiPackages, category);
          default:
            return filter;
        }
      }),
    ];

    const uniqueInsurers = Array.from(
      new Set(insurers.map((insurer) => insurer.code))
    ).map((code) => {
      return {
        code,
        name: insurers.find((insurer) => insurer.code === code).name,
      };
    });

    const defaultInsurers = {};
    if (insurers.length) {
      const insurerFilter = getInsurerFilter(uniqueInsurers, lang);

      insurerFilter.values.forEach((value) => {
        defaultInsurers[value.key] = true;
      });

      config.filters = [...config.filters, insurerFilter];
    }

    const defaultFeatures = {};
    if (features.size > 0) {
      const featureFilter = getFeatureFilter(features);

      featureFilter.values.forEach((value) => {
        defaultFeatures[value.key] = true;
      });

      config.filters = [...config.filters, featureFilter];
    }

    config.defaultValues = {
      sortBy: 'premium_min-max',
      insuranceType: {
        hotDeal: false,
      },
      category,
      subCategory,
      features: defaultFeatures,
      insurer: defaultInsurers,
    };

    return config;
  }
}

export default Transformer;
