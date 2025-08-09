import * as processModule from "../scripts/process";
import * as documentModule from "../scripts/document";

var getElementsSpy = jest
  .spyOn(documentModule, "getElements")
  .mockImplementation(jest.fn());
var createButtonSpy = jest
  .spyOn(documentModule, "createButton")
  .mockImplementation(jest.fn());
var prependSpy = jest
  .spyOn(documentModule, "prepend")
  .mockImplementation(jest.fn());

describe("process.test.js", () => {
  describe("getGoodreadsTitle", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    test("should return title", () => {
      var mockElements = [
        {
          innerText: "test title",
        },
      ];
      getElementsSpy.mockReturnValueOnce(mockElements);

      const title = processModule.getGoodreadsTitle();

      expect(getElementsSpy).toHaveBeenCalledWith(".Text__title1");
      expect(title).toBe("test title");
    });

    test("should return undefined when no title found", () => {
      var mockElements = [];
      getElementsSpy.mockReturnValueOnce(mockElements);

      const title = processModule.getGoodreadsTitle();

      expect(getElementsSpy).toHaveBeenCalledWith(".Text__title1");
      expect(title).toBeUndefined();
    });

    test("should return undefined when no innerText property found", () => {
      var mockElements = [
        {
          someOtherProperty: "test title",
        },
      ];
      getElementsSpy.mockReturnValueOnce(mockElements);

      const title = processModule.getGoodreadsTitle();

      expect(getElementsSpy).toHaveBeenCalledWith(".Text__title1");
      expect(title).toBeUndefined();
    });
  });

  describe("getGoodreadsAuthors", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    test("should return author name", () => {
      var mockElements = [
        {
          innerText: "my author",
        },
      ];
      getElementsSpy.mockReturnValueOnce(mockElements);

      const authors = processModule.getGoodreadsAuthors();

      expect(getElementsSpy).toHaveBeenCalledWith(".ContributorLink__name");
      expect(authors).toBe("my author");
    });

    test("should return undefined when no author name found", () => {
      var mockElements = [];
      getElementsSpy.mockReturnValueOnce(mockElements);

      const authors = processModule.getGoodreadsAuthors();

      expect(getElementsSpy).toHaveBeenCalledWith(".ContributorLink__name");
      expect(authors).toBeUndefined();
    });

    test("should return undefined author when no innerText property found", () => {
      var mockElements = [
        {
          someOtherProperty: "my author",
        },
      ];
      getElementsSpy.mockReturnValueOnce(mockElements);

      const authors = processModule.getGoodreadsAuthors();

      expect(getElementsSpy).toHaveBeenCalledWith(".ContributorLink__name");
      expect(authors).toBeUndefined();
    });
  });

  describe("addRedirectButtonToDom", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    test("should addRedirectButtonToDom", () => {
      var link = "https://www.link.com";
      var elementSelector = ".element";
      var mockElements = [
        {
          innerText: "my element",
        },
      ];
      var mockButtonElement = [
        {
          innerText: "my button",
        },
      ];

      createButtonSpy.mockReturnValueOnce(mockButtonElement);
      getElementsSpy.mockReturnValueOnce(mockElements);

      processModule.addRedirectButtonToDom(elementSelector, link);

      expect(createButtonSpy).toHaveBeenCalledWith(link);
      expect(getElementsSpy).toHaveBeenCalledWith(elementSelector);
      expect(prependSpy).toHaveBeenCalledWith(
        mockElements[0],
        mockButtonElement
      );
    });
  });
});
