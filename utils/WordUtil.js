require('wndb-with-exceptions');
const WordNet = require('node-wordnet');
const wn = new WordNet();

const WordUtil = {};

/*
 * Returns one synonym of word.
 *
 * @param: word word to find synonym.
 * @param: pos Part of speech of word.
 */
WordUtil.getSyn = function(word, pos) {
  wn.lookup(word, (result) => {
   for(var r in result){
     if(result[r].pos === pos) {
       console.log(result[r].synonyms);
     }
   }

  });

};




module.exports = WordUtil;
