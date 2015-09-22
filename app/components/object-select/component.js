import Ember from 'ember';

export default Ember.Component.extend({
 actions: {
    update: function() {
      let selected;
      const selectedEl = this.$('select')[0];
      const selectedIndex = selectedEl.selectedIndex;
      const items = Ember.A(this.get('items'));

      if (this.get('prompt')){
        selected = items.objectAt(selectedIndex - 1);
      } else {
        selected = items.objectAt(selectedIndex);
      }

      if(selected) {
        this.attrs.update(selected);
      }
    }
  }
});
