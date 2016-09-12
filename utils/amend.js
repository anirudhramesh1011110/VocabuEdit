require('wndb-with-exceptions');
var WordNet = require('node-wordnet');
var wn = new WordNet();

var str = "You could call it tit-for-tat with a dash of Mexican drama. Mexico is to consider a proposal to revoke its treaties with the US, including the 1848 agreement that transferred half its territory to Washington if Donald Trump is elected and tries to make the US’s southern neighbour pay for a border wall. A Mexican senator is due on Tuesday to propose legislation that would empower the government to retaliate of Mr Trump inflicts expropriations or economic losses on his country to make it pay for a wall alongthe 2,000 mile border."


// var str = "The hat is blue";
// str.split(' ').forEach(function(word){
//   wn.lookup('hat', function(results) {
//       console.log('=========================================')
//       results.forEach(function(result) {
//         if(result.pos === 'n'){
//           console.log('------------------------------------');
//           console.log("Offset: ", result.synsetOffset);
//           console.log("Part of Speech: ", result.pos);
//           console.log("Lemma: ", result.lemma);
//           console.log("Synonyms: ", result.synonyms);
//           console.log("Gloss: ", result.gloss);
//         }
//       });
//       console.log('=========================================')
//   });
// })
//
// wn.get(5663671, 'n', function(result) {
//     console.log('------------------------------------');
//     console.log(result.lemma);
//     console.log(result.pos);
//     console.log(result.gloss);
//     console.log(result.synonyms);
// });
//
// wn.findSense('rain#n#3', function(err, results){
//   results.forEach(function(result) {
//           console.log('------------------------------------');
//           console.log("Offset: ", result.synsetOffset);
//           console.log("Part of Speech: ", result.pos);
//           console.log("Lemma: ", result.lemma);
//           console.log("Synonyms: ", result.synonyms);
//           console.log("Gloss: ", result.gloss);
//   });
//   console.log(results);
// });
//

var Tagger = require("natural").BrillPOSTagger;

var base_folder = "./node_modules/natural/lib/natural/brill_pos_tagger/data/English";
var rules_file = base_folder + "/tr_from_posjs.txt";
var lexicon_file = base_folder + "/lexicon_from_posjs.json";
var default_category = 'N';

var tagger = new Tagger(lexicon_file, rules_file, default_category, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    //var sentence = "Please take off the politician's hat.".split(' ');
    var tagged_array = tagger.tag(str.split(' '));

    console.log(tagged_array);

    tagged_array.forEach(function(wordArr){

      if(wordArr[1] === 'N' || wordArr[1] === 'NN'){
        wn.lookup(wordArr[0], function(results) {
          	results.forEach(function(result) {
              //TODO: NEED TO FIGURE WHICH SYNSET IS BEST TO USE.
                	if(result.pos === 'n'){
    		   		        console.log(result.synonyms);
                 		  console.log("Synonyms for " + wordArr[0] + ": ", result.synonyms);
              				console.log("Lemma: ", result.lemma);
              				console.log("Offset: ", result.synsetOffset);
          				}
            });
        });

      }
    });
  }
});

//|| wordArr[1] === 'VB' || wordArr[1] === 'JJ'
