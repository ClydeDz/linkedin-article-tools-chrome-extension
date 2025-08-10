/**
 * @jest-environment jsdom
 */

import * as documentModule from "../scripts/document";
import { document, querySelector, createElement } from "./mocks/documentMock";

describe("document.test.js", () => {
  describe("getLinkedInContainer", () => {
    beforeEach(() => {
      documentModule.initializeDocument(document);
      jest.resetAllMocks();
    });

    test("should query the expected selector", () => {
      documentModule.getLinkedInContainer();
      expect(querySelector).toHaveBeenCalledWith(".authentication-outlet");
    });
  });

  describe("createExtensionContainer", () => {
    beforeEach(() => {
      documentModule.initializeDocument(document);
      jest.resetAllMocks();
    });

    test("should create extension container with heading element", () => {
      const appendSpy = jest.fn();
      const mockDivElement = {
        className: "",
        append: appendSpy,
      };
      const mockH2Element = {
        innerText: "",
      };
      createElement.mockReturnValueOnce(mockDivElement);
      createElement.mockReturnValueOnce(mockH2Element);

      const result = documentModule.createExtensionContainer();

      expect(createElement).toHaveBeenCalledTimes(2);
      expect(createElement).toHaveBeenCalledWith("div");
      expect(createElement).toHaveBeenCalledWith("h2");

      expect(appendSpy).toHaveBeenCalledTimes(1);
      expect(appendSpy).toHaveBeenCalledWith({
        innerText: "LinkedIn Article Tools",
      });

      expect(result).toMatchObject({
        className: "linkedin-article-tools-ext-container",
      });
    });
  });

  describe("addButtonsToExtensionContainer", () => {
    beforeEach(() => {
      documentModule.initializeDocument(document);
      jest.resetAllMocks();
    });

    test("should add buttons to provided extension container", () => {
      const appendSpy = jest.fn();
      const mockExtensionContainer = {
        append: appendSpy,
      };
      const mockButtons = ["a", "b"];

      documentModule.addButtonsToExtensionContainer(
        mockExtensionContainer,
        mockButtons
      );

      expect(appendSpy).toHaveBeenCalledTimes(2);
      expect(appendSpy).toHaveBeenCalledWith("a");
      expect(appendSpy).toHaveBeenCalledWith("b");
    });

    test("should not add undefined button", () => {
      const appendSpy = jest.fn();
      const mockExtensionContainer = {
        append: appendSpy,
      };
      const mockButtons = ["a", undefined, "z"];

      documentModule.addButtonsToExtensionContainer(
        mockExtensionContainer,
        mockButtons
      );

      expect(appendSpy).toHaveBeenCalledTimes(2);
      expect(appendSpy).toHaveBeenCalledWith("a");
      expect(appendSpy).toHaveBeenCalledWith("z");
    });
  });

  describe("addExtensionContainerToLinkedInContainer", () => {
    beforeEach(() => {
      documentModule.initializeDocument(document);
      jest.resetAllMocks();
    });

    test("should add extension container after linkedin container", () => {
      const afterSpy = jest.fn();
      const mockLinkedInContainer = {
        after: afterSpy,
      };
      const mockExtensionContainer = "ext";

      documentModule.addExtensionContainerToLinkedInContainer(
        mockLinkedInContainer,
        mockExtensionContainer
      );

      expect(afterSpy).toHaveBeenCalledTimes(1);
      expect(afterSpy).toHaveBeenCalledWith("ext");
    });
  });

  describe("createButton", () => {
    beforeEach(() => {
      documentModule.initializeDocument(document);
      jest.resetAllMocks();
    });

    test.each([
      {
        isPrimary: true,
        expectedCssClassname:
          "linkedin-article-tools-ext-button linkedin-article-tools-ext-button-primary",
      },
      {
        isPrimary: false,
        expectedCssClassname:
          "linkedin-article-tools-ext-button linkedin-article-tools-ext-button-secondary",
      },
      {
        isPrimary: undefined,
        expectedCssClassname:
          "linkedin-article-tools-ext-button linkedin-article-tools-ext-button-secondary",
      },
    ])(
      `should create button with class $expectedCssClassname when isPrimary is $isPrimary`,
      ({ isPrimary, expectedCssClassname }) => {
        createElement.mockReturnValueOnce({
          innerText: "",
          className: "",
          onclick: undefined,
        });

        const result = documentModule.createButton(
          "test",
          "http://test.com",
          isPrimary
        );

        expect(createElement).toHaveBeenCalledTimes(1);
        expect(createElement).toHaveBeenCalledWith("button");

        expect(result).toEqual(
          expect.objectContaining({
            className: expectedCssClassname,
            innerText: "test",
          })
        );
      }
    );

    test("should open redirect link in a new tab", () => {
      createElement.mockReturnValueOnce({
        innerText: "",
        className: "",
        onclick: undefined,
        dispatchEvent: function (event) {
          if (event.type === "click" && typeof this.onclick === "function") {
            this.onclick(event);
          }
        },
      });
      jest.spyOn(window, "open").mockImplementation(() => {});
      const redirectLink = "https://example.com";

      const result = documentModule.createButton("test", redirectLink, true);
      result.dispatchEvent({ type: "click" });

      expect(window.open).toHaveBeenCalledWith(redirectLink, "_blank");
    });

    test("should return undefined button when no redirect link is supplied", () => {
      createElement.mockReturnValueOnce({
        innerText: "",
        className: "",
        onclick: undefined,
      });

      const result = documentModule.createButton("test", null, true);

      expect(createElement).toHaveBeenCalledTimes(0);
      expect(result).toBeUndefined();
    });
  });
});
