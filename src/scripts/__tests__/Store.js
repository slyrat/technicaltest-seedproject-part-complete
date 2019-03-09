import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  let store;

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
});
