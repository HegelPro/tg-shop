import { getProductList } from './productStore';

it('App query product list correctly', () => {
  getProductList(productList => {
    expect(productList.length).toBeGreaterThan(0);
  })
});

it('App query product list with correct item type', () => {
  getProductList(productList => {
    expect(typeof productList[0].counter === 'number');
    expect(typeof productList[0].data.name === 'string');
    expect(typeof productList[0].data.id === 'number');
    expect(typeof productList[0].data.currency === 'string');
  })
})