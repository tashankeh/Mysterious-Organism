// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// factory function to create multiple p.aequor speciments
const pAequorFactory = (specimenNum,dna) => {
  return{
  specimenNum: specimenNum,
  dna:dna,
  //specimen's method to mutate a randomly selected base of its DNA strand
  mutate() {
    let index = Math.floor(Math.random()*16);
    this.dna.splice(index,0,returnRandBase()); 
    return dna;
  },

  //specimen's method to compare its own dna sequences with that of a different P. aequor specimen
  compareDNA(pAequor) {
    let identicalBaseCount = 0;
    for (i=0; i<dna.length;i++){
      if (this.dna[i] === pAequor.dna[i]) {
        identicalBaseCount ++;
      }
    }
    let msg = `Specimen:${this.specimenNum} and Specimen:${pAequor.specimenNum} have ${((identicalBaseCount /dna.length)*100).toFixed(1)} % DNA in commom`;
    return msg;
  },

  //willLikelySurvive() determines if specimen is likely to survive
  willLikelySurvive() {
    let baseCount = 0;
    this.dna.forEach(DNAbase => {
      if ((DNAbase === 'C') || (DNAbase === 'G')) {
        baseCount++;
      }
    })
   let survival = ((baseCount/this.dna.length)*100).toFixed(1);
    if (survival >= 60) {
       return true;
    } else {
        return false;
    }
    },

  //specimen's method to auto create its own complementary DNA Strand
   complementStrand() {
    let complementaryDNA = [];
    for (const base of this.dna) {
      switch (base) {
        case 'A':
        complementaryDNA.push('T');
        break;
        case 'T':
        complementaryDNA.push('A');
        break;
        case 'C':
        complementaryDNA.push('G');
        break;
        case 'G':
        complementaryDNA.push('C');
        break;
      }
    }
    return complementaryDNA;
  }
  };
}// end of factory function

// function to generate a desired number of specimens that are more likely to survive 
let pAequorSpecimens = [];//holds the specimens
const createSpecimens = number =>{
let count = 1;
while (count<=number) {
  let specimen= pAequorFactory(count,mockUpStrand());
  if (specimen.willLikelySurvive() === true){
      pAequorSpecimens.push(specimen);
      count++;
  }
}
return pAequorSpecimens;
}

//function to build complementary specimens from existing ones
let compAequorSpecimens = []; //holds the complementary specimens
const createComSpecimens = baseSpecimens => {
  for(const specimen of baseSpecimens){
    compAequorSpecimens.push(pAequorFactory(specimen.specimenNum,specimen.complementStrand()));
    }
  return compAequorSpecimens;
}

//compare DNA of speciments
const compareSpecimensDNA = (specimensx) =>{
for (const strandx of specimensx) {
    for (const strandy of specimensx){
        if (strandx !== strandy){
         console.log(strandx.compareDNA(strandy));
        }
    }
}
};

//log speciments from pAequorSpecimens array of speciments to console
const logToConsole = (specimensArray, num) =>{ 
  if (specimensArray === pAequorSpecimens) {
    createSpecimens(num);
    specimensArray.forEach(specimen => {
    console.log(`pAequorSpecimens: Specimen ${specimen.specimenNum}: DNA: ${specimen['dna']}`);
  });}
  if (specimensArray === compAequorSpecimens) {
    createSpecimens(num);
    createComSpecimens(pAequorSpecimens);
    specimensArray.forEach(specimen => {
    console.log(`compAequorSpecimens: Specimen ${specimen.specimenNum}: DNA: ${specimen['dna']}`);
  });}
  }


// tests

logToConsole(pAequorSpecimens,5); // Donot comment out this while testing the other functionalities below
//logToConsole(compAequorSpecimens,05);
//console.log(pAequorSpecimens[0].mutate()); //works
//console.log(pAequorSpecimens[0].compareDNA(pAequorSpecimens[1])); // works
//compareSpecimensDNA(pAequorSpecimens); works
