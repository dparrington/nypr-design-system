// BEGIN-SNIPPET nypr-a-picture.js
import Component from '@ember/component';
// import { throttle, schedule, bind } from '@ember/runloop';

import layout from '../templates/components/nypr-a-picture';

// import { inViewport } from '../helpers/in-viewport';

/**
  Picture element. Renders `<source>` elements for provided s, m, l, or xl breakpoints and images.

  Usage:
  ```hbs
  <NyprAPicture @break-xl=1000 @src-xl='https://example.com/xlarge-img.jpg' @break-l=800 @src-l='https://example.com/large-img.jpg' @alt='Descriptive alt text'/>
  ```
  @class nypr-a-picture
*/
export default Component.extend({
  tagName: 'picture',
  classNames: ['o-picture'],
  layout,

  didInsertElement() {
    this._super(...arguments);
    if (this.lazy) {
      // TODO implement lazy loaded images
      // add a class when the load event fires
      // this._boundLoadHandler = bind(this, '_loadHandler');
      // let image = this.element.querySelector('img');
      // image.addEventListener('load', this._boundLoadHandler);
      //
      // if (inViewport(this.element)) {
      //   schedule('afterRender', () => {
      //     let img = this.element.querySelector('img');
      //     img.src = img.getAttribute('data-src');
      //   });
      // }
      //
    }
  },

  willDestroy() {
    this._super(...arguments);
    if (typeof FastBoot === 'undefined' && this.lazy && this.element) {
      // window.removeEventListener('scroll', this._boundLazyLoader);
      let image = this.element.querySelector('img');
      image.removeEventListener('load', this._boundLoadHandler);
    }
  },

  /**
    Extra Large Breakpoint
    @argument break-xl
    @type {Number?}
  */
  'break-xl': null,

  /**
    Image url for corresponding extra large breakpoint
    @argument src-xl
    @type {String?}
  */
  'src-xl': null,

  /**
    Large Breakpoint
    @argument break-l
    @type {Number?}
  */
  'break-l': null,

  /**
    Image url for corresponding large breakpoint
    @argument src-l
    @type {String?}
  */
  'src-l': null,

  /**
    Medium Breakpoint
    @argument break-m
    @type {Number?}
  */
  'break-m': null,

  /**
    Image url for corresponding medium breakpoint
    @argument src-m
    @type {String?}
  */
  'src-m': null,

  /**
    Small Breakpoint
    @argument break-s
    @type {String?}
  */
  'break-s': null,

  /**
    Image url for corresponding small breakpoint
    @argument src-s
    @type {String?}
  */
  'src-s': null,

  /**
    Should this image lazy load or not?
    @argument lazy
    @type {Boolean?}
  */
  lazy: false,

  /**
    Text for `alt` attribute.
    @argument alt
    @type {String?}
  */
  alt: null,

  _loadHandler(e) {
    // don't add loaded class for encoded images
    if (!e.target.src.startsWith('data:')) {
      e.target.classList.add('is-loaded');
    }
  }
});
// END-SNIPPET
