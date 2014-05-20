Template.postItem.helpers({
  domain: function() {
    console.log(this);
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});
