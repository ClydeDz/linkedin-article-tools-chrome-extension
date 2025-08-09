let doc;

export function initializeDocument(injectedDocument) {
  doc = injectedDocument;
}

export function getElements(selector) {
  var domElements = doc.querySelectorAll(selector);
  return !domElements || domElements.length == 0 ? undefined : domElements;
}

export function createContainer() {
  var div = doc.createElement("div");
  div.className = "goodreads-akllibrary-ext-container";
  var h2 = doc.createElement("h2");
  h2.innerText = "LinkedIn Article Tools";
  div.append(h2);
  return div;
}

 

export function createButton(buttonText, redirectLink, isSecondary = false) {
  if (!redirectLink) return;

  var button = doc.createElement("button");
  button.onclick = function () {
    window.open(redirectLink, "_blank");
  };
  button.innerText = buttonText;
  button.className =
    "goodreads-akllibrary-ext-button goodreads-akllibrary-ext-mobile" +
    (isSecondary && " secondary-ext-button");

  return button;
}

export function prepend(parent, child) {
  parent.prepend(child);
}
