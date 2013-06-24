Posts = new Meteor.Collection('posts');

if (Meteor.isClient) {
  Template.posts.helpers({
    posts: function() {
        return Posts.find({user: Meteor.user()}, {sort: [["created_at", "desc"]]});
      }
  });
  Template.posts.user = function(){
    if (Meteor.user()) {
      return true;
    }
    else{
      return false;
    }
  };
  Template.posts.events = {
    'click .submit': function (e){
      e.preventDefault(); //don't submit the form

      var post = $(".post");
      var date = new Date();

      if (post.val() === '') return false;

      Posts.insert({
        text: post.val().replace(/\r?\n/g, '<br />'),
        created_at: parseInt(date.getTime() / 1000, 10),
        user: Meteor.user()
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

  Posts.allow({
      'insert': function(userId, doc) {
        return true;
      },
      'remove': function(userId, doc) {
        return false;
      }
    });
}
