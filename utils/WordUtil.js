require('wndb-with-exceptions');
const WordNet = require('node-wordnet');
const wn = new WordNet();
const _ = require('underscore');

const WordUtil = {};

/*
 * Returns one synonym of word.
 *
 * @param: word word to find synonym.
 * @param: pos Part of speech of word.
 */
WordUtil.getSyn = function(word, pos) {
  return new Promise((resolve, reject) => {
    var punc = '';
    //This regex checks to see if last letter is puncuation mark.
    if(!/[a-z 0-9]/g.test(word[word.length-1])){
      var punc = word[word.length-1];
      word = word.slice(0, word.length-1);
    }
    //Lookup word in wordnet DB
    wn.lookup(word, (result) => {
     var synArr = [];
     //Make sure each synset has same lemma.
     for(var r in result){
       if(result[r].pos === pos && result[r].lemma === word) {
         var syns = result[r].synonyms;
         //No duplicate synonyms.
         syns.forEach((s) => {
           if(synArr.indexOf(s) === -1) synArr.push(s);
         });
       }
     }
     //Return random synonym.
     var i = _.random(synArr.length-1);
     resolve(synArr[i] + punc);
    });
  });

};




module.exports = WordUtil;
