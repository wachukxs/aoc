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
/**an object of the cordinates of asteroids in the arrLine array */
let objectMapOfAsteroids = [];

arrLine.forEach((ele, ind) => ele.forEach((e, i) => { if (e === '#') objectMapOfAsteroids.push({ [e]: [ind, i] }) }));

// const getCordOfAsteroids = (line) => 
// const getObjMapOfAsteroids = (line) => 

console.log('objectMapOfAsteroids', objectMapOfAsteroids)

arrLine.forEach((element, ind, arr) => {
  if (element.includes('#')) {
    let howManyAsteroidsInLine = element.filter(val => val === '#').length;

  }
  element.forEach((ele, i, a) => {
    if (ele === '#') { // use our map extensively here
      // did objectMapOfAsteroids here

      // for asteroid [ind, i]
      console.log('for asteroid', [ind, i]);

      // find, index of the, next asteroid to the right.
      let s = element.indexOf('#', i + 1) // if s !== -1, count 1

      // find, index of the, next asteroid to the left
      let ss = element.slice(0, i).indexOf('#') // if s !== -1, count 1 // end is not included

      // count all the asteroid in the next line
      let sss = arrLine[ind + 1] === undefined ? null : arrLine[ind + 1].filter(val => val === '#').length

      /**cordinates of the asteroids in the next line with asteroids, [from our map]
      => count all the values with [>= ind + 1][] */
      let nextArrLineIndex;
      let nextArrLine = arrLine.find((ele, _i) => // we never use array line & with our logic, that's good
      {
        if (ind === 9) {
          nextArrLineIndex = undefined;
          return;
        };
        nextArrLineIndex = _i;
        return ele.some(e => e === '#') && _i > ind
      });
      // twice
      nextArrLineIndex = ind === 9 ? undefined : nextArrLineIndex;
      console.log('nextArrLineIndex for', [ind, i], nextArrLineIndex);
      /**cordinates of the asteroids in the next array line. bug fix here too. */
      let cords_ = ind === 9 ? [] : objectMapOfAsteroids.filter((val, _i) => val['#'][0] === nextArrLineIndex); // get the cordinates of all the asteroids in the next line
      // console.log('cords_ in next line', cords_);
      /**the number of steps it took for asteroids below */
      let steps_ = cords_.map((ele) => [ind - ele['#'][0], i - ele['#'][1]])
      // console.log('steps for asteroids below', steps_); // [ [ -1, 1 ], [ -1, 0 ] ]
      // for each direct asteroid above, start with cordinates above _steps
      // RULE = above => [source] - [number of steps] = [destination cordinates] // so [source] - [destination] % [steps] === 0
      // for each direct asteroid below, start with cordinates below steps_
      // RULE = below => [source] - [number of steps] = [destination cordinates] // so [source] - [destination] % [steps] === 0
      // --  

      // count all the asteroid in the previous line
      let ssss = arrLine[ind - 1] === undefined ? null : arrLine[ind - 1].filter(val => val === '#').length

      let prevArrLineIndex;
      /**this is just @var nextArrLine line reversed */
      let prevArrLine = arrLine.reverse().find((ele, _i) => {
        prevArrLineIndex = _i;
        if (ind === 0) {
          prevArrLineIndex = undefined;
          return;
        };

        return ele.some(e => e === '#') && _i > (arrLine.length - 1 - ind) // since we reversed the arrLine, we reverse the index too
      });
      // twice
      prevArrLineIndex = ind === 0 ? undefined : arrLine.length - 1 - prevArrLineIndex; // https://stackoverflow.com/a/60744862 // because we're reversing, we need to get the prev index of the element we got before reversing
      console.log('prevArrLineIndex for', [ind, i], prevArrLineIndex);

      /**cordinates of the asteroids in the previous array line .bug fix here*/
      let _cords = ind === 0 ? [] : objectMapOfAsteroids.filter((val, _i) => val['#'][0] === prevArrLineIndex);
      // console.log('_cord in previous arr line', _cords); //  [ { '#': [ 4, 1 ] }, { '#': [ 4, 4 ] } ]
      /* get the cordinates of the asteroids in the next previous line [from our map]
      count all the values with [ind - 1][] */ // here needs work
      /* let _cords = objectMapOfAsteroids.filter((val, _i) => 
      val['#'][0] === ind - 1 // the asteroid is a connected on, i.e in direct previous line
      && arrLine[ind - 1].every(as => as !== '.') // the previous asteroid line must not be empty
      ) */

      /**the number of steps it took for asteroids above/in previous array line */
      let _steps = _cords.map((ele) => [ind - ele['#'][0], i - ele['#'][1]])
      console.log('steps for asteroids above', _steps); // [ [ -1, 1 ], [ -1, 0 ] ]

      // rename, asterLeft, blockedAsterLeft
      let blockedAsterFarAbove = [];

      // remove all the asteroids that they're blocking above // 1st logic, cord of line < step to move up
      // _steps.forEach((aster, _ind) => blockedAsterFarAbove = objectMapOfAsteroids.filter(astr => (/* astr['#'][0] < aster[0] && */ astr['#'][0] % aster[0] === 0 && astr['#'][1] % aster[1] === 0)  ) ) // by getting all the multiples afar off, 
      _steps.forEach((aster, _ind) => {
        let b = objectMapOfAsteroids.filter((astr, _i) => // replaced astr with objectMapOfAsteroids, or rather used objectMapOfAsteroids, not astr, because each object key is '#' and astr['#'] would not get pass the first one
        {
          return objectMapOfAsteroids[_i]['#'][0] < prevArrLineIndex && // asteroid must be less-than/above array line of connected asteroid in above line
            (i - objectMapOfAsteroids[_i]['#'][1]) % aster[1] === 0 && // RULE = above => [source] - [number of steps] = [destination cordinates] // so [source] - [destination] % [steps] === 0
            (ind - objectMapOfAsteroids[_i]['#'][0]) % aster[0] === 0

            && (_cords[_ind]['#'][0] - aster[0]) === objectMapOfAsteroids[_i]['#'][0]
            && (_cords[_ind]['#'][1] - aster[1]) === objectMapOfAsteroids[_i]['#'][1]
        }
        );
        console.log('_b', b);
        if (b.length > 0) blockedAsterFarAbove.push(b[0]); // since it's only ever one
      }
      ) // getting all the multiples afar off,
      console.log('Blocked asteroids far above', 'for asteroid', [ind, i], blockedAsterFarAbove);

      //-------------
      let blockedAsterFarBelow = [];
      // remove all the asteroids that they're blocking below
      // steps_.forEach(aster => blockedAsterFarBelow = objectMapOfAsteroids.filter(astr => ( aster[0] > astr['#'][0] && astr['#'][0] % aster[0] === 0 && astr['#'][1] % aster[1] === 0)  ) ) // by getting all the multiples afar off, 
      steps_.forEach((aster, _ind) => {
        let b = objectMapOfAsteroids.filter((astr, _i) => {
          return (objectMapOfAsteroids[_i]['#'][0] > nextArrLineIndex && // asteroid must be greater-than/below array line of connected asteroid in below line
            (i - objectMapOfAsteroids[_i]['#'][1]) % aster[1] === 0 && // RULE = above => [source] - [number of steps] = [destination cordinates] // so [source] - [destination] % [steps] === 0
            (ind - objectMapOfAsteroids[_i]['#'][0]) % aster[0] === 0

            && (cords_[_ind]['#'][0] - aster[0]) === objectMapOfAsteroids[_i]['#'][0]
            && (cords_[_ind]['#'][1] - aster[1]) === objectMapOfAsteroids[_i]['#'][1]
          )
        });
        if (b.length > 0) blockedAsterFarBelow.push(b[0]); // using b[0] since it's only ever one element

        console.log('b_', b);
      }); // getting all the multiples afar off,
      console.log('Blocked asteroids far below', 'for asteroid', [ind, i], blockedAsterFarBelow)
      //-------------

      let AsterLeft = objectMapOfAsteroids.filter(astr => (astr['#'][0] === ind && astr['#'][1] <= i - 1));
      // AsterLeft.pop();
      let blockedAsterLeft = AsterLeft.length > 1 ? AsterLeft.slice(0, AsterLeft.length - 1) : []
      // console.log('Blocked asteroids left', 'for asteroid', [ind, i], blockedAsterLeft); // getting asteroids to the left,

      let AsterRight = objectMapOfAsteroids.filter(astr => (astr['#'][0] === ind && astr['#'][1] >= i + 1));
      // AsterRight.shift(); // mutates
      let blockedAsterRight = AsterRight.length > 1 ? AsterRight.slice(1, AsterRight.length) : []
      // console.log('Blocked asteroids right', 'for asteroid', [ind, i],  blockedAsterRight); // getting asteroids to the right,

      let AsterUp = objectMapOfAsteroids.filter(astr => (astr['#'][0] <= ind - 1 && astr['#'][1] === i));
      // AsterUp.pop();
      let blockedAsterUp = AsterUp.length > 1 ? AsterUp.slice(0, AsterUp.length - 1) : []
      // console.log('Blocked asteroids up', 'for asteroid', [ind, i], blockedAsterUp); // getting asteroids to the up,

      let AsterDown = objectMapOfAsteroids.filter(astr => (astr['#'][0] >= ind + 1 && astr['#'][1] === i));
      // AsterDown.shift();
      let blockedAsterDown = AsterDown.length > 1 ? AsterDown.slice(1, AsterDown.length) : []
      // console.log('Blocked asteroids down', 'for asteroid', [ind, i], blockedAsterDown ); // getting asteroids to the down,
      // then find the asteroids in the next-next line & remove, repeat. do the same for the prev-prev line

      // [x,y]
      // x, means you move up
      // y, means you move left

      // -- process far and wide
      // used the closest one to find the other ones that are blocked...

      // get the steps it took to get the asteroids in the next and previous lines
      // destination cords MINUS origin cords...
      // so any asteroids in the path of the results when they're are scaled in blocked and removed...
      // we count the number of these blocked asteroids, what's left is our result - 1 [the origin asteroid]

      // repeat

      // replace all blocked asteroids with dots, and do for next-next-next & prev-prev-prev, & continue
      // let blocked = blockedAsterDown.concat(blockedAsterFarAbove, blockedAsterLeft, blockedAsterRight, blockedAsterUp)



    }

  })
});

// rules, every immediate/closest asteriods in thesame level blocks other asteriods in that level

// it's accessible to every asteriods in the next and previous level, no blocks

// keep a map of every asteriods a asteriod maps to. other subsequest asteriods in their path is blocked, we check the current map if the new asteriod is on the way/is been blocked