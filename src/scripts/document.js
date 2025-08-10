let doc;

const extensionName = "LinkedIn Article Tools";
const baseClassname = "linkedin-article-tools-ext";

export function initializeDocument(injectedDocument) {
  doc = injectedDocument;
}

export function getLinkedInContainer() {
  const linkedInBodyElementClassname = ".authentication-outlet";
  return doc.querySelector(linkedInBodyElementClassname);
}

export function createExtensionContainer() {
  const div = doc.createElement("div");
  div.className = `${baseClassname}-container`;
  const h2 = doc.createElement("h2");
  h2.innerText = extensionName;
  div.append(h2);
  return div;
}

export function addButtonsToExtensionContainer(extensionContainer, buttons) {
  buttons.forEach((button) => {
    if (!button) return;
    extensionContainer.append(button);
  });
}

export function addExtensionContainerToLinkedInContainer(
  linkedInContainer,
  extensionContainer
) {
  linkedInContainer.after(extensionContainer);
}

export function createButton(buttonText, redirectLink, isPrimary = false) {
  if (!redirectLink) return;

  const buttonVariantClassname = isPrimary
    ? `${baseClassname}-button-primary`
    : `${baseClassname}-button-secondary`;
  const buttonClassname = `${baseClassname}-button`;

  const button = doc.createElement("button");

  button.innerText = buttonText;
  button.className = `${buttonClassname} ${buttonVariantClassname}`;
  button.onclick = function () {
    window.open(redirectLink, "_blank");
  };

  return button;
}
