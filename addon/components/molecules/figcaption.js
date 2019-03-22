import Component from '@ember/component';
import layout from '../../templates/components/molecules/figcaption';

/**
  Caption molecule for a `<figure/>` element.

  Usage:
  ```hbs
  {{m-figcaption
    caption='this is the caption'
    credit='this is the credit'
  }}
  ```
  @class m-figcaption
*/
export default Component.extend({
  layout,

  tagName: 'figcaption',
  classNames: ['o-figure__caption', 'o-caption'],

  caption: null,
  credit: null,
}).reopenClass({
  positionalParams: ['caption', 'credit']
});
