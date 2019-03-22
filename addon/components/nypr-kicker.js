import Component from '@ember/component';
import layout from '../templates/components/nypr-kicker';

/**
  Kicker component
  @class NyprKicker
*/
export default Component.extend({
  layout,
  classNames: ['o-kicker'],

  /**
    Filler text. Accepted as a positonal param as well.
    @argument text
    @type {String?}
  */
  text: null,

}).reopenClass({
  positionalParams: ['text']
});
