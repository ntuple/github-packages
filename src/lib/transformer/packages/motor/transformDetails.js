import { normalizeString } from 'lib/string';
import { numberToMoney } from 'lib/money';

export default (apiPackage, lang) => {
  const {
    car_insurance_type: insuranceType,
    car_repair_type: repairType,
    sum_coverage: ownCarCoverage,
    deductible_amount: deductible,
    fire_theft_coverage: fireTheftCoverage,
    flood_coverage: floodCoverage,
    liability_per_accident_coverage: maxDeath,
    liability_per_person_coverage: deathPerPerson,
    liability_property_coverage: propertyDamage,
    has_cctv_discount: requireDashCam,
    personal_accident_coverage: personalInjury,
    medical_expenses_coverage: medicalExpense,
    bail_bond_coverage: bailBond,
    terms_en: termsEn,
    terms_th: termsTh,
  } = apiPackage;

  const isMandatory = insuranceType === 'mandatory';

  // @todo add to api
  const roadside = false;
  const i18nPrefix = 'motor:quote.package.details';

  // - Package Details
  const packageDetails = {
    hasData: !!(insuranceType || repairType || deductible || requireDashCam),
    title: `${i18nPrefix}.titles.package`,
    items: [],
  };

  // Insurance Type
  packageDetails.items.push({
    label: `${i18nPrefix}.labels.insurance_type`,
    text: `motor:quote.package.details.templates.insurance_${normalizeString(
      insuranceType
    )}`,
  });

  // Repair Type
  if (!isMandatory) {
    packageDetails.items.push({
      label: `${i18nPrefix}.labels.repair_type`,
      text: `${i18nPrefix}.templates.repair_type`,
      text_values: {
        value: `motor:values.${normalizeString(repairType)}`,
      },
    });
  }

  // Roadside Assistance
  packageDetails.items.push({
    label: `${i18nPrefix}.labels.roadside`,
    text: roadside ? 'common:values.included' : 'common:values.not_included',
  });
  // Deductible
  packageDetails.items.push({
    label: `${i18nPrefix}.labels.deductible`,
    text:
      deductible > 0
        ? `${i18nPrefix}.templates.deductible_value`
        : `${i18nPrefix}.templates.deductible_none`,
    text_values: { value: numberToMoney(deductible) },
  });
  // Dash Cam
  packageDetails.items.push({
    label: `${i18nPrefix}.labels.dash_cam`,
    text: requireDashCam
      ? 'common:values.required'
      : 'common:values.not_required',
  });

  //  Own Car Damage
  const ownCarDamage = {
    hasData: !!(ownCarCoverage || fireTheftCoverage || floodCoverage),
    title: `${i18nPrefix}.titles.own_car_damage`,
    items: [
      {
        label: `${i18nPrefix}.labels.own_car_damage`,
        text: ownCarCoverage > 0 ? 'common:details.money_highlight' : '-',
        text_values: { value: numberToMoney(ownCarCoverage) },
      },
      {
        label: `${i18nPrefix}.labels.fire_and_theft`,
        text:
          fireTheftCoverage > 0
            ? 'common:values.included'
            : 'common:values.not_included',
      },
      {
        label: `${i18nPrefix}.labels.flood`,
        text:
          floodCoverage > 0
            ? 'common:values.included'
            : 'common:values.not_included',
      },
    ],
  };

  // Personal Coverage
  const personalCoverage = {
    hasData: !!(personalInjury || medicalExpense || bailBond),
    title: `${i18nPrefix}.titles.personal`,
    items: [
      {
        label: `${i18nPrefix}.labels.personal_injury`,
        text: 'common:details.money_normal',
        text_values: { value: numberToMoney(personalInjury) },
      },
      {
        label: `${i18nPrefix}.labels.medical_expense`,
        text: 'common:details.money_normal',
        text_values: { value: numberToMoney(medicalExpense) },
      },
      {
        label: `${i18nPrefix}.labels.bail_bond`,
        text: 'common:details.money_normal',
        text_values: { value: numberToMoney(bailBond) },
      },
    ],
  };

  // Third Party Coverage
  const thirdPartyCoverage = {
    hasData: !!(propertyDamage || deathPerPerson || maxDeath),
    title: `${i18nPrefix}.titles.third_party`,
    items: [
      {
        label: `${i18nPrefix}.labels.property_damage`,
        text: 'common:details.money_normal',
        text_values: { value: numberToMoney(propertyDamage) },
      },
      {
        label: `${i18nPrefix}.labels.death_per_person`,
        text: 'common:details.money_normal',
        text_values: { value: numberToMoney(deathPerPerson) },
      },
      {
        label: `${i18nPrefix}.labels.max_death`,
        text: 'common:details.money_normal',
        text_values: { value: numberToMoney(maxDeath) },
      },
    ],
  };

  // Terms and Conditions
  const termsAndConditions = {
    hasData: !!(termsTh || termsEn),
    title: `${i18nPrefix}.titles.terms_conditions`,
    items: [{ text: lang === 'th' ? termsTh : termsEn }],
  };

  return [
    packageDetails,
    ownCarDamage,
    personalCoverage,
    thirdPartyCoverage,
    termsAndConditions,
  ];
};
