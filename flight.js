class TakeOffError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TakeOffError';
  }
}

class FlightError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FlightError';
  }
}

class EngineError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EngineError';
  }
}

function takeOff() {
  if (Math.random() > 0.5) {
    throw new TakeOffError('Cannot take off the flight');
  }
  console.log('Plane is taking off');
}

function flight(latitude) {
  if (Math.random() > 0.75) {
    throw new EngineError('Engine is not working');
  }

  if (latitude > 10000 || latitude < 3000) {
    console.log('Plane is flying at latitude: ', latitude);
    throw new FlightError('Cannot fly at this latitude');
  }
  console.log('Flying at latitude: ', latitude);
}

function land() {
  console.log('Plane is landing');
}

function planeSimulation(fly, latitude) {
  try {
    if (fly === 0) {
      takeOff();
    }

    while (fly < 3) {
      flight(latitude);
      latitude += Math.floor(Math.random() * 1000);
      fly++;
    }
    land();
  } catch (error) {
    if (error instanceof TakeOffError) {
      console.log(error.message);
    } else if (error instanceof FlightError) {
      latitude = 9000;
      if (fly < 3) {
        fly++;
        console.log('Trying to fly again');
        planeSimulation(fly, latitude);
      }
    } else if (error instanceof EngineError) {
      console.log('Plane is crashing');
    } else {
      console.log('Flight simulation failed');
    }
  }
}

let latitude = Math.floor(Math.random() * 10000);
let fly = 0;
planeSimulation(0, 9000);
