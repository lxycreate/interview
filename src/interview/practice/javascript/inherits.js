/**
 * 实现继承
 */
function Parent(name) {
  this.name = name;
}

Parent.prototype.say = function () {
  console.log(this.name);
};

function Children(name) {
  Parent.call(this, name);
}

Children.prototype = new Parent();
Children.prototype.constructor = Children;
