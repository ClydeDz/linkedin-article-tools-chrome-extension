import * as documentModule from "./document";

export function start() {
  const linkedInContainer = documentModule.getLinkedInContainer();
  const extContainer = documentModule.createExtensionContainer();

  const newArticleButton = documentModule.createButton(
    "Write a new article",
    "https://www.linkedin.com/article/new/",
    true
  );
  const viewDraftsButton = documentModule.createButton(
    "Drafts",
    "https://www.linkedin.com/article/manage/drafts/"
  );
  const viewScheduledButton = documentModule.createButton(
    "Scheduled",
    "https://www.linkedin.com/article/manage/scheduled/"
  );
  const viewPublishedButton = documentModule.createButton(
    "Published",
    "https://www.linkedin.com/article/manage/published/"
  );

  documentModule.addButtonsToExtensionContainer(extContainer, [
    newArticleButton,
    viewDraftsButton,
    viewScheduledButton,
    viewPublishedButton,
  ]);

  documentModule.addExtensionContainerToLinkedInContainer(
    linkedInContainer,
    extContainer
  );
}
