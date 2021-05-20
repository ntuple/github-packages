import { describe, expect, it } from '@jest/globals';
import transformCheckList from './transformCheckList';

const question = {
  order: 1,
  title: 'I here by confirm that',
  type: 'multichoice',
  multichoice: {
    choices: [
      {
        label:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus sodales consequat. Integer vel dui orci. Ut ac malesuada felis. Mauris eu turpis viverra, malesuada tellus vitae, rutrum augue. Donec ultricies sit amet eros eu finibus. Vestibulum vel hendrerit lectus. Etiam laoreet lorem eu metus facilisis malesuada. Praesent tempus magna id ex pulvinar, ut aliquet nisi volutpat. Nunc id porta augue, a tincidunt sapien. Etiam cursus velit ipsum, rhoncus egestas ligula venenatis ac. Nullam lobortis elit eu neque lacinia, et convallis mauris fringilla. Mauris eleifend turpis euismod suscipit placerat. Suspendisse imperdiet elementum ante, id sagittis nulla interdum ut. Nunc venenatis consequat massa, vitae sodales purus efficitur non. Integer at condimentum arcu, eget rutrum orci. Sed convallis nisi leo, a fermentum libero accumsan at.',
        value: 'type 1',
        annotations: {
          'rf/description':
            'motor:questions.checkboxes.insurance_voluntary.type_1.description',
          'rf/icon': 'thumbsup',
          'rf/label':
            'motor:questions.checkboxes.insurance_voluntary.type_1.label',
          'rf/subtitle':
            'motor:questions.checkboxes.insurance_voluntary.type_1.subtitle',
        },
      },
      {
        label:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus sodales consequat. Integer vel dui orci. Ut ac malesuada felis. Mauris eu turpis viverra, malesuada tellus vitae, rutrum augue. Donec ultricies sit amet eros eu finibus. Vestibulum vel hendrerit lectus. Etiam laoreet lorem eu metus facilisis malesuada. Praesent tempus magna id ex pulvinar, ut aliquet nisi volutpat. Nunc id porta augue, a tincidunt sapien. Etiam cursus velit ipsum, rhoncus egestas ligula venenatis ac. Nullam lobortis elit eu neque lacinia, et convallis mauris fringilla. Mauris eleifend turpis euismod suscipit placerat. Suspendisse imperdiet elementum ante, id sagittis nulla interdum ut. Nunc venenatis consequat massa, vitae sodales purus efficitur non. Integer at condimentum arcu, eget rutrum orci. Sed convallis nisi leo, a fermentum libero accumsan at.',
        value: 'type 2',
        annotations: {
          'rf/description':
            'motor:questions.checkboxes.insurance_voluntary.type_2+_3+.description',
          'rf/label':
            'motor:questions.checkboxes.insurance_voluntary.type_2+_3+.label',
          'rf/subtitle':
            'motor:questions.checkboxes.insurance_voluntary.type_2+_3+.subtitle',
        },
      },
    ],
    popularcount: 0,
  },
  annotations: {
    'rf/checklist': true,
    'rf/tip-text':
      'We have several voluntary insurance types for you to compare and purchase, depending on your coverage needs and budget. Please select each insurance type you would like to compare on the quote page.',
    'rf/translation-label': 'motor:questions.labels.insurance_voluntary',
    'rf/translation-tooltip': 'motor:questions.tooltips.insurance_voluntary',
  },
}

describe('transform checklist', () => {
  it('return type as checklist based on annotation', () => {
    let multiQuestion = transformCheckList(question);
    expect(multiQuestion).toEqual(
      expect.objectContaining({
        type: 'checklist',
      })
    );
  });
});
