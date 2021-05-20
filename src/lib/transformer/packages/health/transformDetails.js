import { numberToMoney } from '../../../money';

const coverageDetails = {
  ipdOpd: [
    {
      title: 'inpatient_hos_surgery',
      coverages: [
        'ipdopd_sum_insured_per_year',
        'ipdopd_sum_insured_per_time',
        'ipdopd_sum_insured_per_disease',
        'ipdopd_non_intensive_care',
        'ipdopd_non_intensive_care_coverdays',
        'ipdopd_intensive_care',
        'ipdopd_intensive_care_coverdays',
        'ipdopd_hospital_expense_time',
        'ipdopd_general_expense_time',
        'ipdopd_fluid_expense',
        'ipdopd_blood_expense',
        'ipdopd_lab_expense',
        'ipdopd_physio_expense',
        'ipdopd_prescribed_expense',
        'ipdopd_er_expense',
        'ipdopd_ambulance',
        'ipdopd_surgery_expense',
        'ipdopd_small_surgery_expense',
        'ipdopd_outpatient_surgery',
        'ipdopd_surgeon_fee',
        'ipdopd_surgeon_consultation_fee',
        'ipdopd_operating_expense',
        'ipdopd_anesthetist_fee',
        'ipdopd_physician_fee',
        'ipdopd_doctorvisit_fee',
        'ipdopd_consultation_fee',
      ],
    },
    {
      title: 'opd_hospitalization',
      coverages: ['ipdopd_opd'],
    },
    {
      title: 'additional_coverage',
      coverages: [
        'ipdopd_loss_of_life_ob1',
        'ipdopd_loss_of_life_ob2',
        'ipdopd_daily_income_comp',
        'ipdopd_er_care_service',
        'ipdopd_er_assist_service',
        'ipdopd_er_medic_oversea',
        'ipdopd_oversea_coverage',
        'ipdopd_er_oversea_assistant',
        'ipdopd_er_evac_oversea',
        'ipdopd_er_evac_domestic',
        'ipdopd_patient_service',
        'ipdopd_mortal_service',
        'ipdopd_funeral_expense',
        'ipdopd_death_benf',
        'ipdopd_critical_illness',
        'ipdopd_daily_income_ci',
        'ipdopd_major_treatment_expense',
        'ipdopd_transplant_expense',
        'ipdopd_kidney_treatment',
        'ipdopd_cancer_treatment',
        'ipdopd_transplant_fee',
        'ipdopd_artery_disease',
        'ipdopd_psychiatric_fee',
        'ipdopd_rehabilitation_fee',
        'ipdopd_parents_room_fee',
        'ipdopd_special_nurse_care',
        'ipdopd_personal_nursing_fee',
        'ipdopd_annual_health_check',
        'ipdopd_dental_exam',
        'ipdopd_vaccination_fee',
        'ipdopd_dental_treatment',
        'ipdopd_eyes_treatment',
        'ipdopd_maternity_fee',
        'ipdopd_miscarriage',
        'ipdopd_accimiscarriage',
        'ipdopd_ectopic_fee',
        'ipdopd_cervicaldilation_fee',
        'ipdopd_complications_fee',
        'ipdopd_hospital_service_fee',
        'ipdopd_deductible',
      ],
    },
  ],
  disease: [
    {
      title: 'coverage',
      coverages: [
        'ci_max_coverage',
        'ci_pay_on_diagnosis',
        'ci_sum_insured',
        'ci_sum_insured_2nd',
        'ci_sum_insured_3rd',
        'ci_skin_cancer_sum_insured',
        'ci_consolation_benf',
        'ci_daily_comp_benf',
        'ci_cancer_benf',
        'ci_gender_cancer_benf',
        'ci_monthly_cancer_benf',
        'ci_accidental_death',
        'ci_motorcycle',
        'ci_murder',
        'ci_extreme_sport',
        'ci_medic_expense',
        'ci_medic_accident',
        'ci_broken_bone',
        'ci_year_2_3',
        'ci_year_4_5',
        'ci_year_6',
        'ci_cancer_every_stage',
        'ci_not_melanoma_cancer',
        'ci_coma_covid',
        'ci_medic_covid',
        'ci_daily_hospital_covid',
        'ci_diabetes',
        'ci_lump_sum_heart_attack',
        'ci_medic_heart_attack',
        'ci_health_care_service',
        'ci_cigna_card',
        'ci_er_service',
        'ci_lump_sum_stroke',
        'ci_medic_stroke',
        'ci_lump_sum_inversive_cancer',
        'ci_medic_inversive_cancer',
        'ci_lump_sum_cyst_tumor',
        'ci_medic_cyst_tumor',
        'ci_chemo_therapy',
        'ci_second_opinion',
        'ci_hospital_benf',
        'ci_cancer_surgical',
        'ci_travel_expense',
        'ci_highblood_pressure',
        'ci_5_days_hospital',
        'ci_disease_coverage',
        'ci_disease_exempted',
      ],
    },
  ],
  pa: [
    {
      title: 'loss_of_lif_bor1',
      coverages: [
        'pa_general_accident_ob1',
        'pa_motorcycle_ob1',
        'pa_murder_ob1',
        'pa_loss_of_life_holiday',
      ],
    },
    {
      title: 'loss_of_lif_bor2',
      coverages: [
        'pa_general_accident_ob2',
        'pa_motorcycle_ob2',
        'pa_extream_sport',
        'pa_medic_expense',
      ],
    },
    {
      title: 'pa_additional_coverage',
      coverages: [
        'pa_public_accident',
        'pa_general_accident_acci',
        'pa_motorcycle_acci',
        'pa_murder_acci',
        'pa_room_fee',
        'pa_extend_motorcycle',
        'pa_general_accident_ipd',
        'pa_motorcycle_ipd',
        'pa_murder_ipd',
        'pa_daily_comp',
        'pa_income_icu',
        'pa_funeral_expense',
        'pa_temp_disability',
        'pa_perm_disability',
        'pa_physical_therapy_expense',
        'pa_surgical_acci_expense',
        'pa_dental_acci_expense',
        'pa_care_card',
        'pa_er_medical_service',
        'pa_adb',
        'pa_adb_mc',
        'pa_amr_acci',
        'pa_lump_sum_invasive_cancer',
        'pa_monthly_invasive_cancer',
        'pa_hip',
        'pa_hap',
        'pa_acci_reimbursement',
        'pa_amr_broken_bone',
        'pa_debt_death_acci',
        'pa_third_liability',
        'pa_loss_hand_foot_eye_both',
        'pa_loss_hand_foot_eye_single',
        'pa_golf_equipment',
        'pa_hole_in_one',
        'pa_offcial_tournament',
        'pa_unoffcial_tournament',
        'pa_additinal_monthly_benf',
        'pa_loss_one child_murder',
        'pa_loss_one_child_acci',
        'pa_medic_one_child',
      ],
    },
  ],
};

export default (apiPackage, subCategory, lang) => {
  const details = [];
  const { category, coverage, product, plan } = apiPackage;
  const i18nPrefix = 'health:quote.package';

  details.push({
    title: `${i18nPrefix}.details.titles.package`,
    hasData: !!(category || subCategory || product || plan),
    items: [
      {
        label: `${i18nPrefix}.details.labels.insurance_type`,
        text: `health:categories.${category}`,
      },
      {
        label: `${i18nPrefix}.details.labels.package_name`,
        text: `${product.name[lang]} (${plan.name[lang]})`,
      },
    ],
  });

  coverageDetails[category].forEach(({ title, coverages }) => {
    const items = [];

    coverages.forEach((key) => {
      const item = {
        key,
        label: `${i18nPrefix}.details.labels.${key}`,
        tipText: `${i18nPrefix}.details.tooltips.${key}`,
        isEmpty: true,
      };
      const coverageValue = coverage[key];

      if (
        coverageValue &&
        (coverageValue.summary !== null || coverageValue.limitValue !== null)
      ) {
        item.isEmpty = false;

        // Sometimes the value in summary is null so added extra condition to check if it null.
        if (coverageValue.summary && coverageValue.summary[lang]) {
          item.text = coverageValue.summary[lang];
        } else {
          item.text = 'common:details.money_normal';
          item.text_values = { value: numberToMoney(coverageValue.limitValue) };
        }
      }

      items.push(item);
    });

    details.push({
      key: title,
      title: `${i18nPrefix}.details.titles.${title}`,
      // tipText: `${i18nPrefix}.details.tooltips.${key}`,
      hasData: items.some((item) => !item.isEmpty),
      items,
    });
  });

  return details;
};
