import qflowService from './qflowService';
// eslint-disable-next-line no-unused-vars
import qflowApi from './qflowApi';
import { beforeEach, expect, test } from '@jest/globals';

const mockGetQuestionFlow = jest.fn();
const mockGetQuestionChoices = jest.fn();
// eslint-disable-next-line no-undef
jest.mock('./qflowApi', () => {
  // eslint-disable-next-line no-undef
  return jest.fn().mockImplementation(() => {
    return {
      getQuestionFlow: mockGetQuestionFlow,
      getQuestionChoices: mockGetQuestionChoices,
    };
  });
});

beforeEach(() => {
  mockGetQuestionFlow.mockClear();
  mockGetQuestionChoices.mockClear();
});

const flow = {
  questions: {
    car_brand: {
      order: 1,
      dynamic_fetch: 'car',
    },
    car_fuel: {
      order: 9,
      dynamic_fetch: 'car',
    },
    person_name: {
      order: 4,
      dynamic_fetch: 'person',
    },
    car_model: {
      order: 2,
      dynamic_fetch: 'car',
    },
    car_year: {
      order: 7,
      dynamic_fetch: 'car',
    },
  },
};

test('Get Initial Flow', () => {
  const flowId = 123;

  mockGetQuestionFlow.mockReturnValue(flow);

  const service = new qflowService();
  expect(service.getInitialFlow(flowId)).toStrictEqual(flow);
  expect(mockGetQuestionFlow).toHaveBeenCalledTimes(1);
  expect(mockGetQuestionFlow).toHaveBeenCalledWith(flowId);
});

test('Get Relevant Questions returns correct array', () => {
  const expected = ['car_brand', 'car_model'];
  const question = 'car_year';
  const service = new qflowService();

  expect(service.getRelevantQuestions(question, flow)).toStrictEqual(expected);
});

test('Get Relevant Questions returns empty array for first question', () => {
  const expected = [];
  const question = 'car_brand';
  const service = new qflowService();

  expect(service.getRelevantQuestions(question, flow)).toStrictEqual(expected);
});

test('Get Relevant Questions returns empty array for unknown question', () => {
  const expected = [];
  const question = 'unknown';
  const service = new qflowService();

  expect(service.getRelevantQuestions(question, flow)).toStrictEqual(expected);
});

test('Get Question Patch', () => {
  const answers = {
    car_brand: 'honda',
    car_model: 'civic',
    other_thing: 'whatever',
  };
  const expectedAnswers = { car_brand: 'honda', car_model: 'civic' };
  const question = 'car_year';
  const patch = { car_year: 'patched' };
  const flowId = 123;

  mockGetQuestionChoices.mockReturnValue(patch);

  const service = new qflowService();

  expect(
    service.getQuestionPatch(flowId, question, flow, answers)
  ).toStrictEqual(patch);
  expect(mockGetQuestionChoices).toHaveBeenCalledTimes(1);
  expect(mockGetQuestionChoices).toHaveBeenCalledWith(
    flowId,
    question,
    expectedAnswers
  );
});
