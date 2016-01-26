//
function getMessage(a, b) {
  var i, sum;

  if(typeof( a ) === "boolean") {
    if( a ) {
      return "Я попал в " + b;
    } else {
      return "Я никуда не попал";
    }
  }

  if(typeof( a ) === "number") {
    return "Я прыгнул на " + a * 100 + " сантиметров";
  }

  if(Array.isArray( a )) {
    if(Array.isArray( b )) {
      sum = 0;
      for(i = 0; i < a.length && i < b.length; ++i) {
        sum += a[i] * b[i];
      }
      return "Я прошёл " + sum + " метров";
    } else {
      sum = 0;
      for(i = 0; i < a.length; ++i) {
        sum += a[i];
      }
      return "Я прошёл " + sum + " шагов";
    }
  } 
};