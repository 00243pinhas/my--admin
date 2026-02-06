import { fetchCategoryTree as fetchRealEstateTree } from "./categoriesApi";

/**
 * Fetch category tree by listing type.
 * V1: only real_estate is supported by backend.
 * V2+: extend switch when APIs exist.
 */
export async function fetchCategoryTreeByType(token, type) {
  switch (type) {
    case "real_estate":
      return fetchRealEstateTree(token);

    // future-ready
    // case "jobs":
    //   return fetchJobsCategoryTree(token);

    // case "events":
    //   return fetchEventsCategoryTree(token);

    default:
      return [];
  }
}
