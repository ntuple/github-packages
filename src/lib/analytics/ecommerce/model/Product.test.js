import { test, expect } from '@jest/globals';
import Product from './Product';

test('It should only expose valid GA product fields', () => {
  const data = {
    id: '123',
    name: 'Product Name',
    random: 'Random thing we do not want',
    brand: 'Product Brand',
    price: 1234.56,
    category: 'Product Category',
    moreRandom: 'Another thing we do not want',
    variant: 'Product Variant',
  };
  const expected = {
    id: '123',
    name: 'Product Name',
    brand: 'Product Brand',
    price: 1234.56,
    category: 'Product Category',
    variant: 'Product Variant',
  };

  const product = new Product(data);

  expect({ ...product }).toEqual(expected);
});

test('It should set missing Brand, Category and Variant as null', () => {
  const data = {
    id: '123',
    name: 'Product Name',
    random: 'Random thing we do not want',
    price: 1234.56,
    moreRandom: 'Another thing we do not want',
  };
  const expected = {
    id: '123',
    name: 'Product Name',
    brand: null,
    price: 1234.56,
    category: null,
    variant: null,
  };

  const product = new Product(data);

  expect({ ...product }).toEqual(expected);
});
