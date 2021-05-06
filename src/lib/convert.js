import { ones, teens, tens, large, fraction } from './constants';

export default class Converter {
  static numToText(input) {
    if (input === '0') return ones[0];

    const value = input.replace(/\B(?=(\d{3})+(?!\d))/g, " ").split(" ").reverse();

    let result = [];
    let tensCache = 0;
    let putFraction = false;

    for (let chunk = value.length - 1; chunk >= 0; chunk--) {
      const chunkData = value[chunk].split("").reverse();
      
      for (let i = fraction.length; i > 0; i--) {
        const current = parseInt(chunkData[i - 1]);

        if (current) {
          putFraction = true;

          if (i === 3) {
            result.push(ones[current], fraction[0]);
          }
          if (i === 2) {
            tensCache = current;
          }
        }
        if (i === 1) {
          if (tensCache === 1) {
            result.push(teens[current]);
          } else {
            tensCache > 1 && result.push(tens[tensCache]);
            current && result.push(ones[current]);
          }
        }
      }

      tensCache = 0;
      chunk > 0 && putFraction && result.push(fraction[chunk]);
      putFraction = false;
    }

    return result.join(" ");
  };

  static textToNum(input) {
    const value = input.split(" ");
    let result = 0;
    let buffer = 0;

    value.forEach((val) => {
      const one = ones.indexOf(val);
      const teen = teens.indexOf(val);
      const ten = tens.indexOf(val);
      const lrg = large[val];

      if (one !== -1) {
        buffer += one;
      } else if (teen !== -1) {
        buffer += 10 + teen;
      } else if (ten !== -1) {
        buffer += ten * 10;
      } else if (lrg) {
        if (lrg === 100) {
          buffer *= lrg;
        } else {
          result += buffer * lrg;
          buffer = 0;
        };
      } else { 
        result = '-';
        return result;
      }
    });

    result = (result + buffer).toString();

    // validate result by comparing input to numToText
    return input === this.numToText(result) ? result : '-';
  };
}