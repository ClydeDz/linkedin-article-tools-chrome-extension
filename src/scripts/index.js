import * as documentModule from "./document";
import * as startModule from "./start";

setTimeout(function () {
  documentModule.initializeDocument(document);
  startModule.start();
}, 500);
