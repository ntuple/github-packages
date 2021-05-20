const requiredIf = (flowData) => {
  const newFlowData = { ...flowData };
  Object.entries(newFlowData.questions).map(([code, question]) => {
    const expr = question.annotations['rf/display-condition'];
    if (expr) {
      newFlowData.questions[code].validation = {
        ...newFlowData.questions[code].validation,
        requiredIf: {
          field: expr.substring(0, expr.indexOf('==')).trimEnd(),
          value: expr.substring(expr.indexOf('"') + 1, expr.length - 1),
        },
      };
    }
  });
  return newFlowData;
};

const qflowOverrides = (flowId, flowData) => {
  let newFlowData = { ...flowData };

  switch (flowId) {
    default:
      break;
    case '00000000-0000-0000-0000-000000000000':
      newFlowData.questions.customer_dob.validation.min_age = 18;
      newFlowData.questions.customer_dob.validation.max_age = 100;

      newFlowData.questions.policy_start.validation.rule = 'date';
      newFlowData.questions.policy_start.validation.from_days = 0;
      newFlowData.questions.policy_start.validation.to_days = 183;

      newFlowData.questions.tc.annotations['rf/html-bottom'] =
        'common:terms_conditions.html_bottom';
      newFlowData.questions.tc.annotations['rf/html-top'] =
        'common:terms_conditions.html_top';

      newFlowData.questions.insurance_voluntary.validation = {
        rule: 'multiple_choice',
        min: 1,
        max: 10,
      };
      break;
    case '5bf57198-f4df-4e45-a1aa-7cb1a528bb8a':
      newFlowData.questions.policy_start.validation.rule = 'date';
      newFlowData.questions.policy_start.validation.required = true;
      newFlowData.questions.policy_start.validation.from_days = 0;
      newFlowData.questions.policy_start.validation.to_days = 183;

      newFlowData.questions.customer_address.validation = {
        rule: 'text',
        min: 1,
        max: 100,
      };
      newFlowData.questions.customer_billing_address.validation = {
        rule: 'text',
        min: 1,
        max: 100,
      };
      newFlowData.questions.customer_billing_province.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_billing_district.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_billing_subdistrict.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_billing_postcode.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_shipping_address.validation = {
        rule: 'text',
        min: 1,
        max: 100,
      };
      newFlowData.questions.customer_shipping_province.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_shipping_district.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_shipping_subdistrict.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_shipping_postcode.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_company_name.validation = {
        rule: 'text',
        min: 1,
        max: 100,
      };
      newFlowData.questions.customer_tax_id.validation = {
        rule: 'text',
        min: 1,
        max: 100,
      };

      // Checkout Steps
      newFlowData.questions.purchase_purpose.annotations[
        'rf/checkout-step'
      ] = 1;
      newFlowData.questions.customer_address.annotations[
        'rf/checkout-step'
      ] = 2;
      newFlowData.questions.customer_billing_same.annotations[
        'rf/checkout-step'
      ] = 3;
      newFlowData.questions.customer_shipping_same.annotations[
        'rf/checkout-step'
      ] = 4;
      break;
    case '214615ea-0c40-11eb-adc1-0242ac120002': // health insurance lead
      newFlowData.questions.customer_dob.validation.min_age = 0;
      newFlowData.questions.customer_dob.validation.max_age = 100;

      newFlowData.questions.tc.annotations['rf/html-bottom'] =
        'common:terms_conditions.html_bottom';
      newFlowData.questions.tc.annotations['rf/html-top'] =
        'common:terms_conditions.html_top';
      newFlowData.questions.product_ipdopd_subcategory.validation = {
        rule: 'default',
      };
      newFlowData.questions.product_disease_subcategory.validation = {
        rule: 'default',
      };
      newFlowData.questions.product_accident_subcategory.validation = {
        rule: 'default',
      };
      break;
    case 'd592a91a-0e97-11eb-adc1-0242ac120002': // health insurance checkout
      newFlowData.questions.customer_health.annotations[
        'rf/checklist-pre-selected'
      ] = true;
      newFlowData.questions.customer_health.multichoice.choices[1].annotations = {
        ...newFlowData.questions.customer_health.multichoice.choices[1]
          .annotations,
        'rf/display-condition': 'product_category in ["ipdOpd", "disease"]',
      };
      newFlowData.questions.customer_health.multichoice.choices[2].annotations = {
        ...newFlowData.questions.customer_health.multichoice.choices[2]
          .annotations,
        'rf/display-condition': 'product_category in ["ipdOpd", "disease"]',
      };
      newFlowData.questions.customer_health.multichoice.choices[4].annotations = {
        ...newFlowData.questions.customer_health.multichoice.choices[4]
          .annotations,
        'rf/display-condition': 'product_category in ["ipdOpd", "disease"]',
      };
      newFlowData.questions.customer_health.multichoice.choices[5].annotations = {
        ...newFlowData.questions.customer_health.multichoice.choices[5]
          .annotations,
        'rf/display-condition': 'product_category in ["pa"]',
      };
      newFlowData.questions.customer_health.multichoice.choices[6].annotations = {
        ...newFlowData.questions.customer_health.multichoice.choices[6]
          .annotations,
        'rf/display-condition': 'product_category in ["pa"]',
      };
      newFlowData.questions.customer_address.validation = {
        rule: 'text',
        min: 1,
        max: 100,
      };
      newFlowData.questions.customer_billing_address.validation = {
        rule: 'text',
        min: 1,
        max: 100,
      };
      newFlowData.questions.customer_billing_province.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_billing_district.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_billing_subdistrict.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_billing_postcode.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_shipping_address.validation = {
        rule: 'text',
        min: 1,
        max: 100,
      };
      newFlowData.questions.customer_shipping_province.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_shipping_district.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_shipping_subdistrict.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_shipping_postcode.validation = {
        rule: 'default',
      };
      newFlowData.questions.customer_id_card.validation = {
        rule: 'thai_id',
      };
      break;
  }

  newFlowData = requiredIf(newFlowData);

  return newFlowData;
};

export default qflowOverrides;
