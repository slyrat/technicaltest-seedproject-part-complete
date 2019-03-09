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

  filter() {
    return this.state.deals.filter((value) => {
      if (value.productTypes) {
        let allTypesInFilter = true;
        if (this.state.productFilters &&
            this.state.productFilters.length) {
          value.productTypes.forEach((type) => {
            if (this.ignoredProducts.includes(type.toLowerCase())) {
              return;
            }
            if (!this.state.productFilters.includes(this.alternateFilterName(type.toLowerCase()))) {
              allTypesInFilter = false;
              return;
            }
          });
        }
        return allTypesInFilter;
      }
      return true;
    });
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
