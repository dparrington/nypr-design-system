import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitUntil } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nypr-m-progress-bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<NyprMProgressBar/>`);
    assert.dom('.o-progress').exists();
  });

  test('it updates as you scroll', async function(assert) {

    const testingContainer = document.querySelector('#ember-testing-container');
    const HEIGHT = window.innerHeight * 2;
    const OLD_POSITION = testingContainer.style.position;
    testingContainer.style.height = `${HEIGHT}px`;
    testingContainer.style.position = 'relative';

    await render(hbs`<NyprMProgressBar/>`);

    window.scrollTo(0, HEIGHT);
    await waitUntil(() => this.element.querySelector('.o-progress').value > 0);

    assert.ok(`.o-progress has value ${this.element.querySelector('.o-progress')}`);

    testingContainer.style.height = '';
    testingContainer.style.position = OLD_POSITION;
    testingContainer.scrollTo(0, 0);
  });
});
