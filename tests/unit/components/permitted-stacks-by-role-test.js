import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForComponent('permitted-stacks-by-role', {
  unit: true
});

let permits = function() {
  return new Ember.RSVP.Promise((resolve) => { resolve(true); });
};

let rejects = function() {
  return new Ember.RSVP.Promise((resolve) => { resolve(false); });
};

test('it renders', function(assert) {
  assert.expect(2);

  var component = this.subject({
    scope: 'manage',
    role: Ember.Object.create({ privileged: true }),
    stacks: [Ember.Object.create({ permitsRole: permits })]
  });

  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('returns all stacks that permit role', function(assert) {
  let stack1 = Ember.Object.create({
    handle: 'my-stack-1',
    permitsRole: permits
  });

  let stack2 = Ember.Object.create({
    handle: 'my-stack-2',
    permitsRole: permits
  });

  let stack3 = Ember.Object.create({
    handle: 'my-stack-3',
    permitsRole: rejects
  });

  let component = this.subject({
    scope: 'manage',
    stacks: [stack1, stack2, stack3]
  });

  component.updatePermittedStacks().then(function() {
    assert.equal(component.get('stacksString'), 'my-stack-1, my-stack-2',
        'returns permitted stacks handle');
  });
});
