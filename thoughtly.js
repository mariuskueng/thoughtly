Posts = new Meteor.Collection('posts');

if (Meteor.isClient) {
  Template.posts.helpers({
    posts: function() {
      return Posts.find({}, {sort: [["created_at", "desc"]]});
    }
  });
  Template.posts.events = {
    'click .submit': function (e){
      e.preventDefault(); //don't submit the form

      var post = $(".post");
      var date = new Date();

      if (post.val() === '') return false;

      Posts.insert({
        text: post.val().replace(/\r?\n/g, '<br />'),
        created_at: parseInt(date.getTime() / 1000, 10)
      });
      post.val('');
    },
    'click .delete': function(e){
      Posts.remove(this._id);
    }
  };
  Handlebars.registerHelper('date', function(context){
    return moment(this.created_at*1000).format('LLL');
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
