import * as documentModule from "../scripts/document";
import * as startModule from "../scripts/start";

const getLinkedInContainerSpy = jest
  .spyOn(documentModule, "getLinkedInContainer")
  .mockImplementation(jest.fn());
const createExtensionContainerSpy = jest
  .spyOn(documentModule, "createExtensionContainer")
  .mockImplementation(jest.fn());
const createButtonSpy = jest
  .spyOn(documentModule, "createButton")
  .mockImplementation(jest.fn());
const addButtonsToExtensionContainerSpy = jest
  .spyOn(documentModule, "addButtonsToExtensionContainer")
  .mockImplementation(jest.fn());
const addExtensionContainerToLinkedInContainerSpy = jest
  .spyOn(documentModule, "addExtensionContainerToLinkedInContainer")
  .mockImplementation(jest.fn());

describe("start.test.js", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should add buttons to the DOM", () => {
    getLinkedInContainerSpy.mockReturnValue({});
    createExtensionContainerSpy.mockReturnValue({});
    createButtonSpy.mockReturnValueOnce("a");
    createButtonSpy.mockReturnValueOnce("b");
    createButtonSpy.mockReturnValueOnce("c");
    createButtonSpy.mockReturnValueOnce("d");

    startModule.start();

    expect(getLinkedInContainerSpy).toHaveBeenCalledTimes(1);
    expect(createExtensionContainerSpy).toHaveBeenCalledTimes(1);

    expect(createButtonSpy).toHaveBeenCalledTimes(4);
    expect(createButtonSpy).toHaveBeenCalledWith(
      "Write a new article",
      "https://www.linkedin.com/article/new/",
      true
    );
    expect(createButtonSpy).toHaveBeenCalledWith(
      "Drafts",
      "https://www.linkedin.com/article/manage/drafts/"
    );
    expect(createButtonSpy).toHaveBeenCalledWith(
      "Scheduled",
      "https://www.linkedin.com/article/manage/scheduled/"
    );
    expect(createButtonSpy).toHaveBeenCalledWith(
      "Published",
      "https://www.linkedin.com/article/manage/published/"
    );

    expect(addButtonsToExtensionContainerSpy).toHaveBeenCalledTimes(1);
    expect(addButtonsToExtensionContainerSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Array)
    );
    expect(addButtonsToExtensionContainerSpy).toHaveBeenCalledWith({}, [
      "a",
      "b",
      "c",
      "d",
    ]);

    expect(addExtensionContainerToLinkedInContainerSpy).toHaveBeenCalledTimes(
      1
    );
    expect(addExtensionContainerToLinkedInContainerSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object)
    );
  });
});
