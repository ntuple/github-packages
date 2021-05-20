import transformRating from './transformRating';

let apiResponse = {
	ratingPackage: {
		id: 720440,
		insurance_company: {
			id: 17,
			name_en: 'Muang Thai Insurance Public Company Limited',
			name_th: 'บริษัท เมืองไทยประกันภัย จำกัด (มหาชน)',
			phone: 'Tel: 0-2665-4000',
			shortname_en: 'Muang Thai Insurance',
			shortname_th: 'Muang Thai Insurance',
			ticker: 'MTI',
			rating: 4.63
		}
	},
	noRatingPackage: {
		id: 720441,
		id: 4,
		name_en: 'Asia Insurance 1950 Co., Ltd',
		name_th: 'บริษัท เอเชียประกันภัย (1950) จำกัด (มหาชน)',
		phone: '0-2254-9977',
		shortname_en: 'Asia Insurance',
		shortname_th: 'Asia Insurance',
		ticker: 'AII',
	}
}

describe('transformRating: transform rating', () => {
  it('return rating of package if package has rating value', () => {
    let rating = transformRating(apiResponse.ratingPackage);
    expect(rating).toEqual(4.63);
	});
	it('return default value as 4.95 if package has no rating value', () => {
    let rating = transformRating(apiResponse.noRatingPackage);
    expect(rating).toEqual(4.95);
  });
});
