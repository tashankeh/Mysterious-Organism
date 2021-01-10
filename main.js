// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}
// factory function to create multiple p.aequor
const pAequorFactory = (specimentNum,dna) => {
  return{
  specimentNum: specimentNum,
  dna:dna,
  mutate() {
    let randomBaseIndex = Math.floor(Math.random() * 16);
    //console.log(`random dan index is ${randomBaseIndex}`);
    let randomBase = returnRandBase();
    //change the base of the current strand at the random index
    //with the new random base 
    this.dna.splice(randomBaseIndex,0,randomBase);
    return dna;
  },// end mutate
  //compare dna sequences of different P. aequor
  compareDNA(pAequor) {
    let sameBaseCount = 0;
    let strandLength = dna.length;
    for (i=0; i<strandLength;i++){
      if (this.dna[i] === pAequor.dna[i]) {
        sameBaseCount++;
      }
    }
    let msg = `${this.specimentNum} and ${pAequor.specimentNum} have ${((sameBaseCount/strandLength)*100).toFixed(1)} % DNA in commom`;
    return msg;
  },
  //Is this pAequor likely to survive?
  willLikelySurvive() {
    let baseCount = 0;
    let dnaLength= this.dna.length;
    this.dna.forEach(base => {
      if ((base === 'C') || (base === 'G')) {
        baseCount++;
      }
    })
   let survival = ((baseCount/dnaLength)*100).toFixed(1)
   if (survival >= 60) {
       return true;
      } else {
        return false;
      }
  }
  };
}
let pAequorSpecimens = [];
let count = 1;
while (count<=30) {
  let tempDNAStrand = mockUpStrand();
  let org= pAequorFactory(count,tempDNAStrand);

  if (org.willLikelySurvive() === true){
      pAequorSpecimens.push(org);
      count++;
  }
}
//log 30 speciments from pAequorSpecimens array of speciments to console
logToConsole = (specimentArray) =>{ 
specimentArray.forEach(specimen => {
  console.log(`Specimen ${specimen['specimentNum']}: DNA: ${specimen['dna']}`)
})};

logToConsole(pAequorSpecimens);
 










