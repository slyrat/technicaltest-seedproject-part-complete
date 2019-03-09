import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  let store;

  // Note: I know the length checks aren't the best checks
  beforeEach(() => {
    store = new Store();
    store.setDeals(mockData.deals);
  });

  it("should return all deals when no filters applied", () => {
    // Arrange (see before each)
    // Act
    const result = store.deals;

    // Assert
    expect(result).toEqual(mockData.deals);
  });

  it("should have phone as an ignored product", () => {
    // Arrange
    // act
    // Assert
    expect(store.ignoredProducts).toEqual(["phone"]);
  });

  describe("broadband filters", () => {
    it("should show the 4 broadband only deals when broadband is only filter applied", () => {
      // Arrange
      store.setProductFilter("broadband");

      // Act
      const result = store.deals;
  
      // Assert
      expect(result).toHaveLength(4);
    });

    it("should show the 4 broadband and tv only deals when broadband and tv are the only filters applied", () => {
      // Arrange
      store.setProductFilter("broadband");
      store.setProductFilter("tv");

      // Act
      const result = store.deals;
  
      // Assert
      expect(result).toHaveLength(4);
    });

    it("should show the 1 broadband and mobile only deals when broadband and mobile are the only filters applied", () => {
      // Arrange
      store.setProductFilter("broadband");
      store.setProductFilter("mobile");

      // Act
      const result = store.deals;
  
      // Assert
      expect(result).toHaveLength(1);
    });
  });

  describe("tv filters", () => {
    it("should show no deals when only filtering by tv", () => {
      // Arrange
      store.setProductFilter("tv");

      // Act
      const result = store.deals;
  
      // Assert
      expect(result).toHaveLength(0);
    });
  });
  describe("provider filters", () => {
    it("should show only one deal when filtering by sky", () => {
      // Arrange
      store.setProviderFilter(1);

      // Act
      const result = store.deals;

      // Assert
      expect(result).toHaveLength(1);
    });

    it("should show 2 deals when filtering by bt (id 3), broadband, and tv", () => {
      // Arrange
      store.setProductFilter("tv");
      store.setProductFilter("broadband");
      store.setProviderFilter(3);

      // Act
      const result = store.deals;

      // Assert
      expect(result).toHaveLength(2);
    });
  });
  
  describe("alternate filter names", () => {
    it("should return broadband for fibre broadband filter", () => {
      // Arrange
      // Act
      const name = store.alternateFilterName("fibre broadband");

      // Assert
      expect(name).toEqual("broadband");
    });

    it("should return the filter as is for non fibre broadband", () => {
      // Arrange
      // Act
      const name = store.alternateFilterName("test");
      
      // Assert
      expect(name).toEqual("test");
    });
  });

  describe("alternate type names", () => {
    it("should return fibre broadband for broadband", () => {
      // Arrange
      // Act
      const type = store.alternateTypeName("broadband");
      
      // Assert
      expect(type).toEqual("fibre broadband");
    });

    it("should return the type as is for non broadband", () => {
      // Arrange
      // Act
      const name = store.alternateTypeName("test");
      
      // Assert
      expect(name).toEqual("test");
    });
  });
});
