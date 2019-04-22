// BEGIN-SNIPPET nypr-o-gallery-overlay.js
import imagesloaded from 'imagesloaded';

import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { debounce, throttle, bind, schedule } from '@ember/runloop';

import layout from '../templates/components/nypr-o-gallery-overlay';

import { inViewport } from '../helpers/in-viewport';


/**
  Helper function to "wake up" lazy loaded images

  @function wakeUp
  @param {HTMLElement} slide Nested slide element
  @return {void}
*/
const wakeUp = slide => {
  let img = slide.querySelector('img');
  img.src = img.getAttribute('data-src');
}

/**
  Gallery overlay

  @class nypr-o-gallery-overlay
  @yield {Hash} hash
  @yield {Component} billboard `nypr-o-gallery-overlay/billboard`
*/
export default Component.extend({
  layout,
  classNames: ['c-article__gallery'],

  init() {
    this._super(...arguments);
    this.set('slideRefs', A([]));
  },

  didInsertElement() {
    // make sure the body height matches the gallery height for scroll measure purposes
    if (this.takeover) {
      this._boundResizeListener = bind(this, '_setBodyHeight');
      window.addEventListener('resize', this._boundResizeListener);
      this._setBodyHeight();
    }

    // track which slide is on screen
    this._boundScrollListener = bind(this, '_activeSlideWatcher');
    window.addEventListener('scroll', this._boundScrollListener);

    // CSS transition
    this.element.classList.add('is-active');

    // make sure any image in the viewport as load time is loaded
    // this._loadOnScreenSlides();
    // wait for all slides to load before scrolling
    if (this.activeImage) {
      let index = this.activeImage;
      let activeSlide = this.slideRefs[index];
      imagesloaded(this.element.querySelectorAll('.c-slide'), () => {
        let { top } = activeSlide.getBoundingClientRect();
        let windowTop = top + window.scrollY;
        let targetY = windowTop - (window.innerHeight / 2);
        window.scrollTo(0, targetY);
      });
    }
  },

  willDestroy() {
    this._super(...arguments);
    if (typeof FastBoot === 'undefined') {
      window.removeEventListener('scroll', this._boundListener);
      window.removeEventListener('resize', this._boundResizeListener);
      document.body.style.height = '';
    }
  },

  /**
    References to slide elements. Set to an empty EmberArray the `init` hook.

    @field slideRefs
    @type {Array[HTMLElement]}
  */
  slideRefs: null,

  /**
    Specify whether the gallery should resize the body to to the gallery's height

    @argument takeover
    @type {Boolean}
  */
  takeover: true,

  /**
    Parent route for "return" links

    @argument parentRoute
    @type {String}
  */

  /**
    Parent route model for "return" links

    @argument parentModel
    @type {Class}
  */

  /**
    Gallery title

    @argument title
    @type {String}
  */

  /**
    Gallery images

    @argument slides
    @type {Array[Object]}
  */

  /**
    Called with current slide object, DOM element, and slide index when
    a slide enters the viewport

    @argument viewedSlide
    @type {Function}
  */

  /**
    Current slide's index. Updated directly by scroll handler.

    @field currentIndex
    @type {Number}
  */
  currentIndex: 0,

  /**
    Current slide. Derived from `currentIndex`. If there is no index yet set, it returns the first slide.

    @accessor currentSlide
    @type {HTMLElement}
  */
  currentSlide: computed('slideRefs', 'currentIndex', function() {
    if (!this.slideRefs) {
      return null;
    }

    return this.slideRefs[this.currentIndex];
  }),

  /**
    Receives a new slide and adds it to the `slideRefs` field

    @method registerSlide
    @param {HTMLElement} slideEl
    @return {void}
  */
  registerSlide(slideEl) {
    this.slideRefs.pushObject(slideEl);
  },

  /**
    Handles some DOM management for scrolling events
    - calls `viewedSlide` handler when a slide enters the viewport
    - triggers network requests for images as they come into viewport

    @method _activeSlideWatcher
    @param {EventObject} event
    @return {void}
  */
  _activeSlideWatcher(/* e */) {
    throttle(this, () => {
      let i;
      let currentEl;
      let els = this.slideRefs;

      for (i = 0; i < els.length; i++) {
        let slide = els[i];
        if (inViewport(slide, {offset: {top: window.innerHeight / 2}})) {
          currentEl = slide;
          break;
        }
      }

      if (currentEl) {
        this.viewedSlide(this.slides[i], currentEl, i);
        // TODO: implement lazy loading
        // this._lazyLoadImages(currentEl, i);
      }
    }, 100);
  },

  /**
    For a given slide, update its nested `<img/>` element's `src` attribute,
    and do the same for the previous and following slides

    @method _lazyLoadImages
    @param {HTMLElement} slide
    @param {Number} i given slide's index
    @return {void}
  */
  _lazyLoadImages(slide, i) {
    let slides = [
      slide,
      this.slideRefs[i+1],
      this.slideRefs[i-1],
    ];

    slides.filter(s => !!s).forEach(wakeUp);
  },

  /**
    Force the body's height to match the gallery's height. Enables consistent measurements.

    @method _setBodyHeight
    @param {EventObject} event
    @return {void}
  */
  _setBodyHeight(/* e */) {
    debounce(this, () => {
      let { height } = this.element.getBoundingClientRect();
      height = `${height}px`;
      if (document.body.style.height !== height) {
        document.body.style.height = height;
      }
    }, 100);
  },

  /**
    Find every slide that's in the viewport and load it

    @method _loadOnScreenSlides
    @return {void}
  */
  _loadOnScreenSlides() {
    let els = this.slideRefs;
    let found = [];

    for (let i = 0; i < els.length; i++) {
      let slide = els[i];
      if (inViewport(slide)) {
        found.push(slide);
      }
    }

    found.forEach(wakeUp);

  }
});
// END-SNIPPET
