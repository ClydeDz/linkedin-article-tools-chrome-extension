import * as processModule from "./process";
import * as documentModule from "./document";

export function start() {
  const appContainer = document.querySelector(".authentication-outlet"); // div.body //header#global-nav // main>section.artdeco-card

  const extContainer = documentModule.createContainer();
  const newArticleButton = documentModule.createButton(
    "Write a new article",
    "https://www.linkedin.com/article/new/"
  );
  const viewDraftsButton = documentModule.createButton(
    "Drafts",
    "https://www.linkedin.com/article/manage/drafts/",
    true
  );
  const viewScheduledButton = documentModule.createButton(
    "Scheduled",
    "https://www.linkedin.com/article/manage/scheduled/",
    true
  );
  const viewPublishedButton = documentModule.createButton(
    "Published",
    "https://www.linkedin.com/article/manage/published/",
    true
  );

  extContainer.append(newArticleButton);
  extContainer.append(viewDraftsButton);
  extContainer.append(viewScheduledButton);
  extContainer.append(viewPublishedButton);

  appContainer.after(extContainer);

  // const bookTitle = processModule.getGoodreadsTitle();
  // const bookAuthors = processModule.getGoodreadsAuthors();

  // if (!bookTitle && !bookAuthors) return;

  // const bookSearchText = encodeURIComponent(`${bookTitle} by ${bookAuthors}`);
  // const libraryUrl = `https://discover.aucklandlibraries.govt.nz/search?query=${bookSearchText}&searchType=everything&pageSize=10`;

  // const goodreadsDesktopButtonSelector = ".BookPage__leftColumn .BookActions";
  // const goodreadsMobileButtonSelector =
  //   ".BookPageMetadataSection__mobileBookActions .BookActions";

  // processModule.addRedirectButtonToDom(
  //   goodreadsDesktopButtonSelector,
  //   libraryUrl
  // );

  // processModule.addRedirectButtonToDom(
  //   goodreadsMobileButtonSelector,
  //   libraryUrl
  // );
}
