import Template from "../Template";

describe("template", () => {
    let template;

    beforeEach(() => {
        // Set up our document body
        document.body.innerHTML = 
        '<script id="template-no-deal" type="text/template"></script>' +
        '<script id="template-deal" type="text/template"></script>' +
        '<script id="template-list-item" type="text/template"></script>' +
        '<script id="template-icon" type="text/template"></script>';
        
        template = new Template();

    });

    it("should return the nodeal template if the list is empty", () => {
        // Assemble
        // Act
        const result = template.buildDealList([]);

        // Assert
        expect(result).toBe(template.nodeals);
    });
});