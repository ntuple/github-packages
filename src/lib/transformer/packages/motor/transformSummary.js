import { normalizeString } from '../../../string';
import { numberToMoney } from '../../../money';

export default (apiPackage) => {
  const summary = [];
  const {
    insurance_category: insuranceCategory,
    car_insurance_type: insuranceType,
    car_repair_type: repairType,
    sum_coverage: carCoverage,
    deductible_amount: deductible,
    fire_theft_coverage: fireTheftCoverage,
    flood_coverage: floodCoverage,
    personal_accident_coverage: personalCoverage,
    medical_expenses_coverage: medicalCoverage,
    liability_per_accident_coverage: thirdPartyAccidentCoverage,
    liability_property_coverage: thirdPartyPropertyCoverage,
  } = apiPackage;
  const i18nPrefix = 'motor:quote.package.summary';
  const carInspectionRequired = insuranceType === 'Type 1';

  // Third party: Compulsory
  if (insuranceCategory === 'mandatory') {
    summary.push({
      text: `${i18nPrefix}.templates.third_party_coverage`,
      text_values: {
        value: numberToMoney(
          thirdPartyAccidentCoverage >= thirdPartyPropertyCoverage
            ? thirdPartyAccidentCoverage
            : thirdPartyPropertyCoverage
        ),
      },
      tooltip: `${i18nPrefix}.tooltips.third_party_coverage`,
    });

    return summary;
  }

  // Repair Type: Type 1, Type 2, Type 2+, Type 3+
  if (['Type 1', 'Type 2', 'Type 2+', 'Type 3+'].includes(insuranceType)) {
    summary.push({
      text: `${i18nPrefix}.templates.repair_type`,
      text_values: {
        value: `${i18nPrefix}.values.${normalizeString(repairType)}`,
      },
      tooltip: `${i18nPrefix}.tooltips.repair_type`,
    });
  }

  // Car Coverage: Type 1, Type 2+, Type 3+
  if (['Type 1', 'Type 2+', 'Type 3+'].includes(insuranceType)) {
    summary.push({
      text: `${i18nPrefix}.templates.car_coverage`,
      text_values: { value: numberToMoney(carCoverage) },
      tooltip: `${i18nPrefix}.tooltips.car_coverage`,
    });
  }

  // Deductible:  Type 1, Type 2+, Type 3+
  if (['Type 1', 'Type 2+', 'Type 3+'].includes(insuranceType)) {
    summary.push({
      text:
        deductible > 0
          ? `${i18nPrefix}.templates.deductible_value`
          : `${i18nPrefix}.templates.deductible_none`,
      text_values: { value: numberToMoney(deductible) },
      tooltip: `${i18nPrefix}.tooltips.deductible`,
    });
  }

  // Fire/Theft/Flood: Type 1, Type 2, Type 2+
  if (
    ['Type 1', 'Type 2', 'Type 2+'].includes(insuranceType) &&
    (fireTheftCoverage > 0 || floodCoverage > 0)
  ) {
    let coverageType = 'flood';
    if (fireTheftCoverage > 0) {
      if (floodCoverage > 0) {
        coverageType = 'fire_theft_flood';
      } else {
        coverageType = 'fire_theft';
      }
    }

    summary.push({
      text: `${i18nPrefix}.templates.coverage_type`,
      text_values: { value: `${i18nPrefix}.values.${coverageType}` },
      tooltip: `${i18nPrefix}.tooltips.coverage_type`,
    });
  }

  // Personal Coverage: Type 2, Type 3
  if (['Type 2', 'Type 3'].includes(insuranceType)) {
    summary.push({
      text: `${i18nPrefix}.templates.personal_coverage`,
      text_values: {
        value: numberToMoney(
          personalCoverage >= medicalCoverage
            ? personalCoverage
            : medicalCoverage
        ),
      },
      tooltip: `${i18nPrefix}.tooltips.personal_coverage`,
    });
  }

  // Car Inspection: Type 1, Type 2, Type 2+, Type 3, Type 3+
  if (
    ['Type 1', 'Type 2', 'Type 2+', 'Type 3', 'Type 3+'].includes(insuranceType)
  ) {
    summary.push({
      text: `${i18nPrefix}.templates.${
        carInspectionRequired ? 'car_inspection_yes' : 'car_inspection_no'
      }`,
      tooltip: `${i18nPrefix}.tooltips.car_inspection`,
    });
  }

  return summary;
};
