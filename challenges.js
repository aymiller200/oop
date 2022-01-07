//! Challenge 1

const Car = function (make, speed) {
  ;(this.make = make), (this.speed = speed)
}

Car.prototype.accelerate = function () {
  this.speed += 10
  console.log(`${this.speed}km`)
}

Car.prototype.brake = function () {
  this.speed -= 5
  console.log(`${this.speed}km`)
}

const bmw = new Car('BMW', 120)
console.log(bmw)
bmw.accelerate()
bmw.brake()

const mercedes = new Car('Mercedes', 95)
console.log(mercedes)
mercedes.accelerate()
mercedes.brake()

//!Challenge 3:
const EV = function (make, speed, charge) {
  Car.call(this, make, speed), (this.charge = charge)
}

EV.prototype = Object.create(Car.prototype)
EV.prototype.constructor = EV

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo
}

EV.prototype.accelerate = function () {
  this.speed += 20
  this.charge--
  console.log(
    `${this.make} is going at ${this.speed} with a charge of ${this.charge}`,
  )
}

const tesla = new EV('Tesla', 120, 23)
tesla.chargeBattery(90)
tesla.accelerate()
tesla.brake()

//!Challenge 2:
//Data: 'Ford' 120 km/h

class CarEs {
  constructor(make, speed) {
    ;(this.make = make), (this.speed = speed)
  }

  accelerate() {
    this.speed += 10
    console.log(`${this.make} is going at ${this.speed}`)
  }

  brake() {
    this.speed -= 5
    console.log(`${this.make} is going at ${this.speed}`)
    return this
  }

  get speedUS() {
    return this.speed / 1.6
    // console.log(`${this.make} is going at ${this.speed}mi/h`)
  }

  set speedUS(curSpeed) {
    this.speed = curSpeed * 1.6
    // console.log(`${curSpeed * 1.6}mi/h`)
  }
}

const ford = new CarEs('Ford', 120)
console.log(ford.speedUS)
ford.accelerate()
ford.brake()
console.log(ford.speedUS)
ford.speedUS = 50
console.log(ford)

class EVCL extends CarEs {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed)
    this.#charge = charge
  }

  accelerate() {
    this.speed += 20
    this.#charge--
    console.log(
      `${this.make} is going at ${this.speed} with a charge of ${this.#charge}`,
    )
    return this
  }

  chargeBattery(chargeTo) {
    this.charge = chargeTo
    return this
  }
}

const rivian =  new EVCL('Rivian', 120, 23)
rivian.accelerate().brake().chargeBattery(80).accelerate()
console.log(rivian);
