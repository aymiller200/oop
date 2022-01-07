/* 
!What is object oriented programming (OOP):
    ? A programming paradigm (style of the code, how we write and organize code) based on the concept of objects.

    ? We use objects to model (describe) real-world (user or todo list) or abstract (HTML component or data structure) features

    ? Objects may contain data (properties) and code (methods). By using objects, we pack data and the corresponding  behavior into one block: 
        const user = {
          user: 'Ayanna',  <--data
          password: 'dk23s'

          login(password){ <--behavior

          }
        }
    ? In oop, objects are self contained pieces/blocks of code. 

    ? Objects are building blocks of applications, and interact with one another

    ? Interactions happen through a public interface (API): methods that the code outside of the object can access and use to communicate with the object.

    ? OOP was developed with the goal of organizing code, to make it more flexible and easier to maintian (avoid spaghetti code)

!Classes and instances (traditional OOP):
    ? Class: 
        * A blueprint from which we can create new objects.
        * JS doesn't actually support real classes. We have a class syntax in JS but it a bit differently in JS
        * The class itself is not an object
    ? Instance: 
        * A real object that we can use in our code which was created from a class.
        * New object created from the class. Like a real house created from an abstract blueprint.

! Four fundamental principles of OOP: 
    ? Abstraction
        * Ignoring or hiding details that don't matter, allowing us to get an overview perspective of the 'thing' we're implementing, instead of messing with details that don't really matter to our implementation.
    ? Encapsulation
        * Keeping properties and methods private inside the class, so they are not accessible from outside the class. Some methods can be exposed as a public interface (API)
        * Prevents external code from accidentally manipulating interal properties/state
        * Allows to change internal implementation without the risk of breaking external code.
    ? Inheritance
        * The child class extends the parent class. The child class inherits all the methods and properties of the parent class but also has it's own methods and properties.
        * Makes all properties and methods of a certain class available to a child class, forming a hierarchical relationship between classes. This allows us to reuse common logic and to model real-world relationships
    ? Polymorphism
        * A child class can overwrite a method it inherited from a parent class

!How OOP is different in JS:
    ? Prototypes: 
        * Objects are linked to a prototype object.
        * The prototype object contains methods and properties that all the objects that are linked to that prototype can access and use.
        * This behavior is called Prototypal Inheritance. 
        * Behavior is delegated to the linked prototype object
    ? Prototypal Inheritance/Delegation:
        * The prototype contains methods (behavior) that are accessible to all objects linked to that prototype
        * Each and every function in JS automatically has a property called prototype, and that includes constructor functions. 
        * Every object that is created by a certain constructor function will get access to all of the methods and properties that we define on the constructors prototype property

!Three ways of implementing prototypal inheritance in JS

    ? Constructor Functions: 
        * Technique to create objects from a function. 
        * This is how built-in objects like Arrays, Maps, or Sets are actually implemented
    ? ES6 Classes: 
        * Modern Alternativ to constructor function syntax; 
        * Syntactic sugar: Behind the scenes, ES6 classes work exactly like constructor functions; 
        * ES6 classes do not behave like classes in 'classical OOP'
    ? Object.create()
        * The easiest most straightforward way of linking an object to a prototype object (not often used)
      
*/
'use strict'
//Arrow functions will not work as function constructors because they do not have their own 'this' keyword. Only function declarations and expressions
const Person = function (firstName, birthYear) {
  this.firstName = firstName
  this.birthYear = birthYear

  //NEVER create a method inside of a constructor function
  // this.calcAge = function(){
  //   console.log(2037 - this.birthYear);
  // }
}

//!Adding static methods:
Person.hey = function () {
  //Static methods are not inherited
  console.log('Hey there')
}

Person.hey()

//New keyword is the only difference between a constructor function and a regular function.
//New keyword is a very special operator: What it does, is call the Person function

const ayanna = new Person('Ayanna', 1994)
console.log(ayanna) //Person { firstName: 'Ayanna', birthYear: 1994 }

// 1. New {} is created.
// 2. function is called, this = {} (the new empty object)
// 3. Newly created object is linked to prototype (creates the __proto__ property)
// 4. function automatically returns the empty object from the beginning

const matilda = new Person('Matilda', 2017)
const jack = new Person('Jack', 1975)
console.log(matilda, jack)
console.log(ayanna instanceof Person) //true

//!Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear)
}

ayanna.calcAge() //43
//this works because any always has access to the methods and properties from its prototype
//prototype is not a prototype of Person, but rather it is what's going to be used at the prototype of all the objects that are created with the Person constructor function.
console.log(ayanna.__proto__)
console.log(ayanna.__proto__ === Person.prototype) //true
console.log(Person.prototype.isPrototypeOf(ayanna)) //true
console.log(Person.prototype.isPrototypeOf(Person)) //false

//We can also set properties on the prototype, not just methods.
Person.prototype.species = 'human' //This property is not really inside of the ayanna and matilda object. Simply has access to it because of its prototype. It's in the prototype property of Person
console.log(ayanna, matilda)
console.log(ayanna.hasOwnProperty('firstName')) //true
console.log(ayanna.hasOwnProperty('species')) //false

//!Prototypal Inheritance on Built-in objects
console.log(ayanna.__proto__.__proto__) //prototype property of object
console.log(ayanna.__proto__.__proto__.__proto__) //null

console.dir(Person.prototype.constructor)

const arr = [1, 2, 3, 4, 5, 6, 6, 6, 5, 5]
console.log(arr.__proto__)
console.log(arr.__proto__ === Array.prototype) //true
console.log(arr.__proto__.__proto__) //object.prototype

//Generally not a good idea
Array.prototype.unique = function () {
  return [...new Set(this)]
}

console.log(arr.unique())

const h1 = document.querySelector('h1')
console.dir(h1) //h1 object

console.dir((x) => x + 1)

//!With ES6

//Class Expression:
// const PersonCl = class {

// }

//Class Declaration:
class PersonCl {
  //with this syntax we don't have to manually mess with the prototype property
  constructor(fullName, birthYear) {
    this.fullName = fullName
    this.birthYear = birthYear
  } //method of this class. Pass in arguments for the properties that we want this object to have.

  //Methods will be added to .prototype property. Instance Methods
  calcAge() {
    console.log(2037 - this.birthYear)
  } //The methods that we write in the class outside of the constructor will be on the prototype of the objests, and not on the objects themselves

  greet() {
    console.log(`Hey ${this.firstName}`)
  }

  get age() {
    return 2022 - this.birthYear
  }

  //name validation
  //Set a property that already exists
  set fullName(name) {
    console.log(name)
    if (name.includes(' ')) this._fullName = name
    //add underscore to avoid naming conflict, since the constructor and this setter are both trying to set the same property.
    else alert(`${name} is not a full name!`)
  }

  get fullName() {
    return this._fullName
  }

  //!Static method (not added to the prototype property)
  static hey() {
    console.log('hey there')
  }
}

PersonCl.hey()

const jessica = new PersonCl('Jessica Davis', 1996) //When we create the new instance here, it is the constructure of the PersonCl class that will be called, and will return a new object.
console.log(jessica)
jessica.calcAge()
console.log(jessica.age)
console.log(jessica.__proto__ === PersonCl.prototype) //true. With constructor method, we don't have to manually messs with the prototype property.

// PersonCl.prototype.greet = function(){
//     console.log(`Hey ${this.firstName}`);
// }

jessica.greet()

// const walter = new PersonCl('Waler', 1965) //triggers the alert because walter is not a full name
const walter = new PersonCl('Walter White', 1965)
console.log(walter.fullName)

/* 
!Classes are not hoisted, even if they are class declarations. 

!Classes are first-class citizens (can pass them into functions and return them from functions)

!Classes are executed in strict mode (even if strict mode is not activated)

*/

/* 
!Getters and Setters

*Every object in JS can have getter and setter properties.

    ? We can these special properties assessor properties, while the more normal properties are called data properties

*Basically functions that get and set a value.
*Very useful for data validation

*/

const account = {
  owner: 'Jonase',
  movements: [200, 300, 400, 500],

  get latest() {
    //getter
    return this.movements.slice(-1).pop()
  },

  set latest(mov) {
    //every setter method needs to have at least one parameter
    this.movements.push(mov)
  }, //not mandatory to specify a setter when we have a getter for the same property
}

console.log(account.latest) //we don't call the method, but instead write it as if it were just a property. This can be useful when we want to read things as a property, but still need to do some calculations before.

account.latest = 50 //set it like you would set any other property
console.log(account.movements) //[200, 300, 400, 500, 50]

/* 
!Static Methods (or "selfs"): 
    * We use these as helpers that should be related to a certain constructor

*/

/* 
!Object.create

    *Third way to implement prototypal inheritance (or delegations)
        ?Still the idea of prototypal inheritance, however there are no prototype properties involved and also no constructor functions and no new operator

    * Can use object.create to essentially manually set the prototype of an object to any other object that we want.

    *Creates a new object, and the prototype of the object will be the object that we passed in

*/

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear)
  },

  init(firstName, birthYear) {
    this.firstName = firstName
    this.birthYear = birthYear
  },
}

const steven = Object.create(PersonProto) //will return a brand new object that is linked to the prototype that we passed in here.
console.log(steven)
steven.name = 'Steven'
steven.birthYear = 2002
steven.calcAge()

console.log(steven.__proto__ === PersonProto) //PersonProto true

const sara = Object.create(PersonProto)
sara.init('Sara', 1979)
sara.calcAge()

//!Inheritance between Classes: Constructor function:
//*Child classes share behaviour with their parent classes

const PersonConstuctor = function (firstName, birthYear) {
  this.firstName = firstName
  this.birthYear = birthYear
}

PersonConstuctor.prototype.calcAge = function () {
  console.log(2037 - this.birthYear)
}

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear)
  this.course = course
}

Student.prototype = Object.create(PersonConstuctor.prototype) //with this, student.prototype is now and object that inherits from PersonConstructor.prototype. we have to create this connection here before any other methods are added, because Object.create returns an empty object.

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`)
}

const mike = new Student('Mike', 2020, 'Computer Science')
console.log(mike)
mike.introduce()
mike.calcAge()

Student.prototype.constructor = Student

//!Inheritance between Classes: ES6 classes

class PersonES6 {
  constructor(fullName, birthYear) {
    this.fullName = fullName
    this.birthYear = birthYear
  }
  calcAge() {
    console.log(2037 - this.birthYear)
  }

  greet() {
    console.log(`Hey ${this.firstName}`)
  }

  get age() {
    return 2022 - this.birthYear
  }

  set fullName(name) {
    console.log(name)
    if (name.includes(' ')) this._fullName = name
    else alert(`${name} is not a full name!`)
  }

  get fullName() {
    return this._fullName
  }

  static hey() {
    console.log('hey there')
  }
}

//Extends keyword links the prototype behind the scenes

class StudentES6 extends PersonES6 {
  constructor(fullName, birthYear, course) {
    //must always comes first, because this super function is responsible for creating the 'this' keyword in the subclass. Without super coming first, we would not be able to access the this keyword
    super(fullName, birthYear) //this replaces .call in constructor functions. Super is basically the constructor function of the parent class
    this.course = course //If there are no new properties, we wouldn't need the constructor in the child class at all.
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`)
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 12
      }`,
    )
  }
}

const martha = new StudentES6('Martha Jones', 2012, 'Computer Science')
martha.introduce()
martha.calcAge()

//!Inheritance between Classes: Object.create
const PersonObjCreate = {
  calcAge() {
    console.log(2037 - this.birthYear)
  },

  init(firstName, birthYear) {
    this.firstName = firstName
    this.birthYear = birthYear
  },
}

const dad = Object.create(PersonObjCreate)

const StudentProto = Object.create(PersonObjCreate)

StudentProto.init = function (firstName, birthYear, course) {
  PersonObjCreate.init.call(this, firstName, birthYear)
  this.course = course
}

StudentProto.introduce = function () {
  console.log(`My name is ${this.fullName} and I study ${this.course}`)
}

const jay = Object.create(StudentProto)
jay.init('Jay', 2010, 'Computer Science')
jay.introduce()

/////////////////////////////////////////////////////////////
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner
    this.currency = currency
    this._pin = pin

    //faking encapsulation (protected property)
    this._movements = []
    this.locale = navigator.language

    console.log(`Thank for opening an account ${owner}`)
  }

  //Public interface
  getMovements() {
    return this._movements
  }

  deposit(val) {
    this._movements.push(val)
  }

  withdraw(val) {
    this.deposit(-val)
  }

  _approveLoan(val) {
    return true
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val)
      console.log(`Loan approved`)
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111)

acc1.deposit(250)
acc1.withdraw(140)
acc1.deposit(350)
acc1.deposit(100)
acc1.requestLoan(1000)

console.log(acc1.getMovements()) //<-corrected way of getting access to the movements array outside of the class since it is now marked as a protected property

console.log(acc1)

//!Encapsulations
//? We need encapsulation to prevent code from outside of the class to accidentally manipulate our data from inside the class.
//? When we expose only a small interface (small API consisting of only a few public methods) then we can change all of the other internal methods with more confidence.
//? JS does not support true data privacy and encapsulation

//!Truly private class fields and methods (NEW only works in chrome)
//*We can think of a field as a property that will be on all instances.
//? Public Fields
//? Private Fields <-- only available on instances, not prototype
//? Public Methods
//? Private Methods
//? There is also the static version: private static field and public

class AccountEncap {
  //Public Fields (instances)
  locale = navigator.language;
  

  //Private Fields #
  #movements = []
  #pin //just like creating an empty variable

  constructor(owner, currency, pin) {
    this.owner = owner
    this.currency = currency

    this.#pin = pin
    //faking encapsulation (protected property)
    //this._movements = []
    //this.locale = navigator.language

    console.log(`Thank for opening an account ${owner}`)
  }

  //Public Methods:
  //Public Interface:
  getMovements() {
    return this.#movements
  }

  deposit(val) {
    this.#movements.push(val)
    return this
  }

  withdraw(val) {
    this.deposit(-val)
    return this
  }
  
  _approveLoan(val) {
      return true
   }

  
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val)
      console.log(`Loan approved`)
      return this
    }
  }

  //Private Methods: useful to hide implentation details from the outside. (no browser actually supports this yet. Chrome sees it as a private class field and not as a method)
  //? #approveLoan(val) {
  //?  return true
  //? }

}
const acc2 = new AccountEncap('Bob', 'EUR', 2222)
acc2.deposit(250)
acc2.withdraw(140)
acc2.deposit(350)
acc2.deposit(100)
acc2.requestLoan(1000)

console.log(acc2.getMovements())
console.log(acc2);

//console.log(acc2.#movements); <--Err: Private field '#movements' must be decalred in an enclosing class
//console.log(acc2.#pin); <--Err

//!Chaining Methods (return the object itself ('this') at the end of the method we want to chainable)
acc2.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000)
console.log(acc2.getMovements());