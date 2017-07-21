var content = [
  { 
    title: 'Various Methods for calculating the Nth Fibonacci Number',
    link: 'fibonacci',
    tags: ['CS']
  },
  { 
    title: 'Polynomial Sequence Matching',
    link: 'polynomial_sequence_matching',
    tags: ['CS']
  },
  { 
    title: 'A Brief History of Travel Agents',
    link: 'a_brief_history_of_travel_agents',
    tags: ['Short']
  },
  { 
    title: 'The Emerald',
    link: 'the_emerald',
    tags: ['Short']
  },
  { 
    title: 'Stab',
    link: 'stab',
    tags: ['Short']
  },
  {
    title: 'I Will Let You Down',
    link: 'i_will_let_you_down',
    tags: ['Poetry']
  },
  {
    title: 'Compass',
    link: 'compass',
    tags: ['Poetry']
  },
  {
    title: 'Let Me be the Abode of the Gods',
    link: 'let_me_be_the_abode_of_the_gods',
    tags: ['Poetry']
  },
  {
    title: 'Pigeon Post',
    link: 'pigeon_post',
    tags: ['Poetry']
  },
  {
    title: 'Collector',
    link: 'collector',
    tags: ['Poetry']
  },
  {
    title: 'Tangela',
    link: 'tangela',
    tags: ['Poetry']
  },
  {
    title: '⠙⠁⠞⠀⠁⠎⠎',
    link: '⠙⠁⠞⠀⠁⠎⠎',
    tags: ['Poetry']
  },
  {
    title: 'You',
    link: 'you',
    tags: ['Poetry']
  },
  {
    title: 'Proof You Are Crazy',
    link: 'proof_you_are_crazy',
    tags: ['Poetry']
  },
  {
    title: 'The Birds II',
    link: 'the_birds_ii',
    tags: ['Poetry']
  },
  {
    title: 'Untitled',
    link: 'untitled',
    tags: ['Poetry']
  },
  {
    title: 'Good Toes',
    link: 'good_toes',
    tags: ['Poetry']
  },
  {
    title: 'Maritime Miscreants',
    link: 'maritime_miscreants',
    tags: ['Poetry']
  },
  {
    title: 'Matching Tracksuit',
    link: 'matching_tracksuit',
    tags: ['Poetry']
  },
  {
    title: 'Thirst',
    link: 'thirst',
    tags: ['Poetry']
  },
  {
    title: 'St. Darina',
    link: 'st._darina',
    tags: ['Poetry']
  },
  {
    title: 'The Strangest Invasion',
    link: 'the_strangest_invasion',
    tags: ['Poetry', "Children's Stories"]
  }
];

var tags = [];
for (var i = 0; i < content.length; i += 1) {
  for (var j = 0; j < content[i].tags.length; j+=1){
    if (tags.indexOf(content[i].tags[j]) === -1){
      tags.push(content[i].tags[j]);
    }
  }
}
