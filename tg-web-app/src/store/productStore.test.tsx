import { getProductList } from './productStore';

it('App query product list correctly', async () => {
  const productList = await getProductList()
  expect(productList.length).toBeGreaterThan(0);
});

it('App query product list with correct item type', async () => {
  const productList = await getProductList()
  expect(typeof productList[0].counter === 'number');
  expect(typeof productList[0].data.name === 'string');
  expect(typeof productList[0].data.id === 'number');
  expect(typeof productList[0].data.currency === 'string');
})