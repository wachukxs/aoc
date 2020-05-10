const input = require('./input');
// get total number of asteriods
// start from the beginning
// https://stackoverflow.com/questions/10021847/for-loop-in-multidimensional-javascript-array

// const lines = input.sampleInputOne.split('\n');
// console.log(lines)

const arrLine = input.sampleInputTwo.split('\n').map(ele => ele.split(''));

console.log('map of asteroids array', arrLine);

numberOfAsteroids = arrLine.flat().filter(ast => ast === '#').length;

console.log('numberOfAsteroids', numberOfAsteroids)

// -- get map of asteroids
let objectMapOfAsteroids = [];

arrLine.forEach((ele, ind) => ele.forEach((e, i) => { if (e === '#') objectMapOfAsteroids.push({ [e]: [ind, i] }) } ));

console.log('objectMapOfAsteroids', objectMapOfAsteroids)

arrLine.forEach((element, ind, arr) => {
  if (element.includes('#')) {
    let howManyAsteroidsInLine = element.filter(val => val === '#').length;

  }
  element.forEach((ele, i, a) => {
    if (ele === '#') { // use our map extensively here
      // did objectMapOfAsteroids here

      // for asteroid [ind, i]
      // console.log('for asteroid', [ind, i]);

      // find, index of the, next asteroid to the right.
      let s = element.indexOf('#', i + 1) // if s !== -1, count 1

      // find, index of the, next asteroid to the left
      let ss = element.slice(0, i).indexOf('#') // if s !== -1, count 1 // end is not included

      // count all the asteroid in the next line
      let sss = arrLine[ind + 1] === undefined ? null : arrLine[ind + 1].filter(val => val === '#').length

      // get the cordinates of the asteroids in the next line [from our map]
      // count all the values with [ind + 1][]
      let cords_ = objectMapOfAsteroids.filter((val, i) => val['#'][0] === ind + 1);

      // console.log('cords_ in next line', cords_);
      // get the number of steps it took for asteroids below
      let steps_ = cords_.map((ele) => [ind - ele['#'][0], i - ele['#'][1]] )
      // console.log('steps for asteroids below', steps_); // [ [ -1, 1 ], [ -1, 0 ] ]
      // for each direct asteroid above, start with cordinates above _steps
      // RULE = above => [source] - [number of steps] = [destination cordinates] // so [source] - [destination] % [steps] === 0
      // for each direct asteroid below, start with cordinates below steps_
      // RULE = below => [source] - [number of steps] = [destination cordinates] // so [source] - [destination] % [steps] === 0
      // --  

      // count all the asteroid in the previous line
      let ssss = arrLine[ind - 1] === undefined ? null : arrLine[ind - 1].filter(val => val === '#').length

      /* get the cordinates of the asteroids in the next previous line [from our map]
      count all the values with [ind - 1][] */ // here needs work
      let _cords = objectMapOfAsteroids.filter((val, _i) => 
      val['#'][0] === ind - 1 // the asteroid is a connected on, i.e in direct previous line
      && arrLine[ind - 1].every(as => as !== '.') // the previous asteroid line must not be empty
      )
      // console.log('_cords in previous line', _cords);
      // get the number of steps it took for asteroids above
      let _steps = _cords.map((ele) => [ind - ele['#'][0], i - ele['#'][1]] )
      console.log('steps for asteroids above', _steps); // [ [ -1, 1 ], [ -1, 0 ] ]
      // rename, asterLeft, blockedAsterLeft
      let blockedAsterFarAbove = [];

      // remove all the asteroids that they're blocking above // 1st logic, cord of line < step to move up
      // _steps.forEach((aster, _ind) => blockedAsterFarAbove = objectMapOfAsteroids.filter(astr => (/* astr['#'][0] < aster[0] && */ astr['#'][0] % aster[0] === 0 && astr['#'][1] % aster[1] === 0)  ) ) // by getting all the multiples afar off, 
      _steps.forEach((aster, _ind) => 
        blockedAsterFarAbove = objectMapOfAsteroids.filter(astr => 
          (astr['#'][0] < aster[0] && // asteroid must be less-than/above array line of connected asteroid in above line
          
          (ind - astr['#'][0]) % aster[0] === 0 // RULE = above => [source] - [number of steps] = [destination cordinates] // so [source] - [destination] % [steps] === 0
          && (i - astr['#'][1]) % aster[1] === 0)  ) ) // getting all the multiples afar off,
      console.log('Blocked asteroids far above', 'for asteroid', [ind, i], blockedAsterFarAbove);
      
      //-------------
      let blockedAsterFarBelow = [];

      // remove all the asteroids that they're blocking below
      // steps_.forEach(aster => blockedAsterFarBelow = objectMapOfAsteroids.filter(astr => ( aster[0] > astr['#'][0] && astr['#'][0] % aster[0] === 0 && astr['#'][1] % aster[1] === 0)  ) ) // by getting all the multiples afar off, 
      steps_.forEach((aster, _ind) => 
      blockedAsterFarBelow = objectMapOfAsteroids.filter(astr => 
        (astr['#'][0] > aster[0] && // asteroid must be greater-than/below array line of connected asteroid in below line
        
        (ind - astr['#'][0]) % aster[0] === 0 // RULE = below => [source] - [number of steps] = [destination cordinates] // so [source] - [destination] % [steps] === 0
        && (i - astr['#'][1]) % aster[1] === 0)  ) ) // getting all the multiples afar off,
      console.log('Blocked asteroids far below', 'for asteroid', [ind, i], blockedAsterFarBelow)
      //-------------

      let AsterLeft = objectMapOfAsteroids.filter(astr => (astr['#'][0] === ind && astr['#'][1] <= i - 1 ) );
      // AsterLeft.pop();
      let blockedAsterLeft = AsterLeft.length > 1 ? AsterLeft.slice(0, AsterLeft.length - 1) : []
      // console.log('Blocked asteroids left', 'for asteroid', [ind, i], blockedAsterLeft); // getting asteroids to the left,

      let AsterRight = objectMapOfAsteroids.filter(astr => (astr['#'][0] === ind && astr['#'][1] >= i + 1 ) );
      // AsterRight.shift(); // mutates
      let blockedAsterRight = AsterRight.length > 1 ? AsterRight.slice(1, AsterRight.length) : []
      // console.log('Blocked asteroids right', 'for asteroid', [ind, i],  blockedAsterRight); // getting asteroids to the right,
      
      let AsterUp = objectMapOfAsteroids.filter(astr => (astr['#'][0] <= ind - 1 && astr['#'][1] === i ) );
      // AsterUp.pop();
      let blockedAsterUp = AsterUp.length > 1 ? AsterUp.slice(0, AsterUp.length - 1) : []
      // console.log('Blocked asteroids up', 'for asteroid', [ind, i], blockedAsterUp); // getting asteroids to the up,

      let AsterDown = objectMapOfAsteroids.filter(astr => (astr['#'][0] >= ind + 1 && astr['#'][1] === i  ) );
      // AsterDown.shift();
      let blockedAsterDown = AsterDown.length > 1 ? AsterDown.slice(1, AsterDown.length) : []
      // console.log('Blocked asteroids down', 'for asteroid', [ind, i], blockedAsterDown ); // getting asteroids to the down,
      // then find the asteroids in the next-next line & remove, repeat. do the same for the prev-prev line
      
      // [y,x]
      // x, means you move left
      // y, means you move up

      // -- process far and wide
      // used the closest one to find the other ones that are blocked...

      // get the steps it took to get the asteroids in the next and previous lines
      // destination cords MINUS origin cords...
      // so any asteroids in the path of the results when they're are scaled in blocked and removed...
      // we count the number of these blocked asteroids, what's left is our result - 1 [the origin asteroid]

      // repeat

      // replace all blocked asteroids with dots, and do for next-next-next & prev-prev-prev, & continue
      let blocked = blockedAsterDown.concat(blockedAsterFarAbove, blockedAsterLeft, blockedAsterRight, blockedAsterUp)
      
      
      
    }

  })
});

// rules, every immediate/closest asteriods in thesame level blocks other asteriods in that level

// it's accessible to every asteriods in the next and previous level, no blocks

// keep a map of every asteriods a asteriod maps to. other subsequest asteriods in their path is blocked, we check the current map if the new asteriod is on the way/is been blocked