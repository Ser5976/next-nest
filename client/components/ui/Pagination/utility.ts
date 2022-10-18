export const brandIdHandler = (brandId: string | string[] | undefined) => {
  let arrayBrandId: string[] = [];
  if (typeof brandId === 'object') {
    arrayBrandId = [...brandId];
  }
  const brandIdQuery = arrayBrandId.map((id) => {
    return new URLSearchParams({ brandId: id });
  });
  return `&${brandIdQuery.toString().replaceAll(',', '&')}`;
};
