/**
 * Validates if a product ID follows the correct format
 * Product ID can only contain alphanumeric characters, underscores, and periods
 * @param productId - The product ID to validate
 * @returns true if the product ID is valid, false otherwise
 */
export const isValidProductId = (productId: string): boolean => {
  // Product ID can only contain alphanumeric characters, underscores, and periods
  const productIdRegex = /^[a-zA-Z0-9._]+$/;
  return productIdRegex.test(productId);
};
