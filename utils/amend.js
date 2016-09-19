require('wndb-with-exceptions');
const _ = require('underscore');
const WordNet = require('node-wordnet');
const AYLIENTextAPI = require('aylien_textapi');
const Wutil = require('./WordUtil');
const Map = require('async/map');

//Create Alyien Text Api object
var textapi = new AYLIENTextAPI({
  application_id: process.env.AYLIEN_ID,
  application_key: process.env.AYLIEN_KEY
});

const wn = new WordNet();

var str = "You could call it tit-for-tat with a dash of Mexican drama. Mexico is to consider a proposal to revoke its treaties with the US, including the 1848 agreement that transferred half its territory to Washington if Donald Trump is elected and tries to make the US’s southern neighbour pay for a border wall. A Mexican senator is due on Tuesday to propose legislation that would empower the government to retaliate of Mr Trump inflicts expropriations or economic losses on his country to make it pay for a wall along the 2,000 mile border."

var Tagger = require("natural").BrillPOSTagger;
var base_folder = "./node_modules/natural/lib/natural/brill_pos_tagger/data/English";
var rules_file = base_folder + "/tr_from_posjs.txt";
var lexicon_file = base_folder + "/lexicon_from_posjs.json";
var default_category = 'N';

/* Returns an array of each word tagged with POS.
 *
 * @param: text: the text to tag.
 */
function tagText(text) {
  return new Promise((resolve, reject) => {
    var tagger = new Tagger(lexicon_file, rules_file, default_category, (err) => {
      if(err) {
        console.log(err);
        reject((err));
      }else{
        resolve(tagger.tag(str.split(' ')));
      }
    });
  });
};

/* Returns a new array of synonyms of original words (nouns for now).
 *
 * @param result: tagged array.
 */
function mapArr(result) {
  return new Promise((resolve, reject) => {
    var arr = _.map(result, (i) => {
      //Only does nouns.
      if(i[1] === 'N' || i[1] === 'NN') {
        Wutil.getSyn(i[0], 'n').then((res) =>{
          //console.log(i[0] + ' --> ' + res);
          if(res === 'undefined'){
            //console.log(i[0]);
            return i[0];
          }else{
            //console.log(res);
            return res;
          }
        });
      }else{
        return i[0];
      }
    });
    resolve(arr);
  });
};

tagText(str).then((result) => {
  mapArr(result).then((res) => {
    console.log(res);
  });
});
