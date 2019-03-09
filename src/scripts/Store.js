import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null
    };
  }

  get deals() {
    return this.filter();
  }

  get ignoredProducts() {
    return ["phone"];
  };

  alternateFilterName(filter) {
    if (filter.toLowerCase() === "fibre broadband") {
      return "broadband";
    }
    return filter;
  }

  alternateTypeName(type) {
    if (type.toLowerCase() === "broadband") {
      return "fibre broadband";
    }
    return type;
  }

  filter() {
    return this.state.deals.filter((value) => {
      let productTypeFilter = true;
      let providerFilter = true;

      if (value.productTypes) {
        productTypeFilter = this.filterByProductTypes(value);
      }
      if (value.provider) {
        providerFilter = this.filterByProvider(value);
      }

      return productTypeFilter && providerFilter;
    });
  }

  filterByProvider(value) {
    if (this.state.providerFilter) {
      return value.provider.name.toLowerCase() === this.state.providerFilter;
    }

    return true;
  }

  filterByProductTypes(value) {
    let allTypesInFilter = true;
    let allFiltersInTypes = true;
    if (this.state.productFilters &&
        this.state.productFilters.length) {
      // check that each type has a filter match
      value.productTypes.forEach((type) => {
        if (this.ignoredProducts.includes(type.toLowerCase())) {
          return;
        }
        if (!this.state.productFilters.includes(this.alternateFilterName(type.toLowerCase()))) {
          allTypesInFilter = false;
          return;
        }
      });
      // check that each filter has a type match
      this.state.productFilters.forEach((filter) => {
        if (!value.productTypes.filter((type) => {
          return type.toLowerCase() === filter ||
                type.toLowerCase() === this.alternateTypeName(filter);
        }).length) {
          allFiltersInTypes = false;
          return;
        }
      });
    }
    return allTypesInFilter && allFiltersInTypes;
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
