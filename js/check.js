

getMessage(a:*, b:*=):string;

function getMessage(a, b) {     
          
if(typeof(a) == "boolean"){ // number, string, object

  if(a) { return "Я попал в " + b; }

  else { return "Я никуда не попал" }
}


Если первый аргумент имеет числовой тип, то вернуть строку:
    "Я прыгнул на [a] * 100 сантиметров"
    
if(typeof(a) == "number"){ // number, string, object
    return "Я прыгнул на " + a + " * 100 сантиметров";
    }