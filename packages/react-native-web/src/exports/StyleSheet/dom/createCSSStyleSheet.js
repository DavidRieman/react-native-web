/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

// $FlowFixMe: HTMLStyleElement is incorrectly typed - https://github.com/facebook/flow/issues/2696
export default function createCSSStyleSheet(id: string): ?CSSStyleSheet {
  if (canUseDOM) {
    const element = document.getElementById(id);
    if (element != null) {
      // $FlowFixMe: HTMLElement is incorrectly typed
      return element.sheet;
    } else {
      const element = document.createElement('style');
      element.setAttribute('id', id);
      element.appendChild(
        document.createTextNode(
          '[stylesheet-group="0"]{}' +
            // minimal top-level reset
            'html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}' +
            'body{margin:0;}' +
            'body:not(.focusvisible) :focus {outline:none;}' +
            // minimal form pseudo-element reset
            'button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}' +
            'input::-webkit-search-cancel-button,input::-webkit-search-decoration' +
            'input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}'
        )
      );

      const head = document.head;
      if (head) {
        head.insertBefore(element, head.firstChild);
      }
      return element.sheet;
    }
  } else {
    return null;
  }
}
