import * as processModule from "../scripts/process";
import * as startModule from "../scripts/start";

var bookTitle = "Mama, Tell Me a Story";
var bookAuthors = "Clyde D'Souza";
var goodreadsDesktopButtonSelector = ".BookPage__leftColumn .BookActions";
var goodreadsMobileButtonSelector =
  ".BookPageMetadataSection__mobileBookActions .BookActions";

var getGoodreadsTitleSpy = jest
  .spyOn(processModule, "getGoodreadsTitle")
  .mockImplementation(jest.fn());
var getGoodreadsAuthorsSpy = jest
  .spyOn(processModule, "getGoodreadsAuthors")
  .mockImplementation(jest.fn());
var addRedirectButtonToDomSpy = jest
  .spyOn(processModule, "addRedirectButtonToDom")
  .mockImplementation(jest.fn());

describe("start.test.js", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("adds redirect button with book title and author information", () => {
    getGoodreadsTitleSpy.mockReturnValueOnce(bookTitle);
    getGoodreadsAuthorsSpy.mockReturnValue(bookAuthors);
    var bookSearchText = encodeURIComponent(`${bookTitle} by ${bookAuthors}`);

    startModule.start();

    expect(getGoodreadsTitleSpy).toHaveBeenCalledTimes(1);
    expect(getGoodreadsAuthorsSpy).toHaveBeenCalledTimes(1);

    expect(addRedirectButtonToDomSpy).toHaveBeenCalledTimes(2);
    expect(addRedirectButtonToDomSpy).toHaveBeenCalledWith(
      goodreadsDesktopButtonSelector,
      `https://discover.aucklandlibraries.govt.nz/search?query=${bookSearchText}&searchType=everything&pageSize=10`
    );
    expect(addRedirectButtonToDomSpy).toHaveBeenCalledWith(
      goodreadsMobileButtonSelector,
      `https://discover.aucklandlibraries.govt.nz/search?query=${bookSearchText}&searchType=everything&pageSize=10`
    );
  });

  test("adds redirect button when book title is defined but author is undefined", () => {
    getGoodreadsTitleSpy.mockReturnValueOnce(bookTitle);
    getGoodreadsAuthorsSpy.mockReturnValue(undefined);
    var bookSearchText = encodeURIComponent(`${bookTitle} by ${undefined}`);

    startModule.start();

    expect(getGoodreadsTitleSpy).toHaveBeenCalledTimes(1);
    expect(getGoodreadsAuthorsSpy).toHaveBeenCalledTimes(1);

    expect(addRedirectButtonToDomSpy).toHaveBeenCalledTimes(2);
    expect(addRedirectButtonToDomSpy).toHaveBeenCalledWith(
      goodreadsDesktopButtonSelector,
      `https://discover.aucklandlibraries.govt.nz/search?query=${bookSearchText}&searchType=everything&pageSize=10`
    );
    expect(addRedirectButtonToDomSpy).toHaveBeenCalledWith(
      goodreadsMobileButtonSelector,
      `https://discover.aucklandlibraries.govt.nz/search?query=${bookSearchText}&searchType=everything&pageSize=10`
    );
  });

  test("does not add redirect button when both title and author is undefined", () => {
    getGoodreadsTitleSpy.mockReturnValueOnce(undefined);
    getGoodreadsAuthorsSpy.mockReturnValue(undefined);

    startModule.start();

    expect(getGoodreadsTitleSpy).toHaveBeenCalledTimes(1);
    expect(getGoodreadsAuthorsSpy).toHaveBeenCalledTimes(1);

    expect(addRedirectButtonToDomSpy).toHaveBeenCalledTimes(0);
  });
});
