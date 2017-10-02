/*
function MyClass() {
  let propert = "prope";
};

MyClass.prototype.name = function(essai) {
  return "name";
};

MyClass.prototype.propert = "propre";
*/

class MyClass {
  constructor(a, b=3) {
    this.a = a;
    this.b = b;
    console.log(this.a);
    console.log(this.b);
  }


  getThis() {
    return 2
  }
}

module.exports = MyClass;
