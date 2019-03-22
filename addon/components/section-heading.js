import Component from '@ember/component';
import layout from '../templates/components/section-heading';

/**
  Section heading
  @class SectionHeading
*/
export default Component.extend({
  layout,
  classNames: ['o-section-heading'],

  /**
    Defaults to an `<h2/>` tag.
    @argument tagName
    @type {String?}
  */
  tagName: 'h2',

  /**
    Filler text. Accepted as a positonal param as well.
    @argument text
    @type {String?}
  */
  text: null,
}).reopenClass({
  positionalParams: ['text']
});
