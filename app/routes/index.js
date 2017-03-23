import Ember from 'ember';

export default Ember.Route.extend({
  model() {

  },
  actions: {
    saveNewPost(params) {
      var newArticle = this.store.createRecord('article', params);
      newArticle.save();
      this.transitionTo('article', newArticle);
    }
  }
});
