require('wndb-with-exceptions');
var WordNet = require('node-wordnet');
var wn = new WordNet();

var str = "You could call it tit-for-tat with a dash of Mexican drama. Mexico is to consider a proposal to revoke its treaties with the US, including the 1848 agreement that transferred half its territory to Washington if Donald Trump is elected and tries to make the US’s southern neighbour pay for a border wall. A Mexican senator is due on Tuesday to propose legislation that would empower the government to retaliate of Mr Trump inflicts expropriations or economic losses on his country to make it pay for a wall along the 2,000 mile border."

var wutil = require('./WordUtil');
wutil.getSyn('play', 'n');


// var n = [];
//
// var Tagger = require("natural").BrillPOSTagger;
// var base_folder = "./node_modules/natural/lib/natural/brill_pos_tagger/data/English";
// var rules_file = base_folder + "/tr_from_posjs.txt";
// var lexicon_file = base_folder + "/lexicon_from_posjs.json";
// var default_category = 'N';
//
// var tagger = new Tagger(lexicon_file, rules_file, default_category, function(error) {
//   if (error) {
//     console.log(error);
//   }
//   else {
//     var tagged_array = tagger.tag(str.split(' '));
//
//     tagged_array.forEach(function(wordArr){
//       if(wordArr[1] === 'N' || wordArr[1] === 'NN'){
//         wn.lookup(wordArr[0], function(results) {
//             var synArr = [];
//           	results.forEach(function(result) {
//               //TODO: NEED TO FIGURE WHICH SYNSET IS BEST TO USE.
//               	if(result.pos === 'n'){
//                   result.synonyms.forEach(function(s){
//                     synArr.push(s);
//                   });
//
//         				}
//             });
//             if(synArr[1] != undefined){
//               n.push(synArr[1]);
//             }else{
//               n.push(wordArr[0]);
//             }
//
//         });
//         console.log(n);
//       }
//
//     });
//   }
// });
