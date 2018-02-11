function wisePerson(wiseType, whatToSay) {
   const concatstr = 'A wise '+ wiseType+' once said: '+'\"' + whatToSay + '\".';
   console.log(concatstr);
   return concatstr;
}

/* From here down, you are not expected to
   understand.... for now :)


   Nothing to see here!

*/

// tests

function testWisePerson() {
  const wiseType = 'goat';
  const whatToSay = 'hello world';
  const expected = 'A wise ' + wiseType + ' once said: "' + whatToSay + '".';
  const actual = wisePerson(wiseType, whatToSay);
  if (expected === actual) {
    console.log('SUCCESS: `wisePerson` is working');
  } else {
    console.log('FAILURE: `wisePerson` is not working');
  }
}

function shouter(whatToShout) {
  str = whatToShout;
  return str.toUpperCase()+'!!!';
}

/* From here down, you are not expected to
   understand.... for now :)


   Nothing to see here!

*/

// tests

function testShouter() {
  const whatToShout = 'fee figh foe fum';
  const expected = 'FEE FIGH FOE FUM!!!';
  if (shouter(whatToShout) === expected) {
    console.log('SUCCESS: `shouter` is working');
  } else {
    console.log('FAILURE: `shouter` is not working');
  }
}
function textNormalizer(text) {
  str = text.trim();
  return (str.toLowerCase());
}

/* From here down, you are not expected to
   understand.... for now :)


   Nothing to see here!

*/

// tests

function testTextNormalizer() {
  const text = "   let's GO SURFING NOW everyone is learning how   ";
  const expected = "let's go surfing now everyone is learning how";
  if (textNormalizer(text) === expected) {
    console.log('SUCCESS: `textNormalizer` is working');
  } else {
    console.log('FAILURE: `textNormalizer` is not working');
  }
}

testTextNormalizer();
testShouter();
testWisePerson();
