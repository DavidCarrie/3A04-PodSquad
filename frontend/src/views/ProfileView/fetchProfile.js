const fakeProfiles = [
  {
    username: '_AreebaAziz',
    firstName: 'Areeba', 
    lastName: 'Aziz',
    email: 'aziza11@mcmaster.ca',
    bio: "I like listening to podcasts about software engineering, such as Into the Rabbit Hole - The Definitive Developer's Podcast. I also occasionally listen to other podcasts that interest me. But my favourite podcasts are the ones about coding. I'm also interested in discovering new podcasts and I hope that PodSquad will help me find these new podcasts!"
  },
  {
    username: 'DavidIsAwesome',
    firstName: 'David',
    lastName: 'Carrie',
    email: 'david@mcmaster.ca',
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tristique eleifend metus, gravida malesuada magna aliquam pulvinar."
  },
  {
    username: 'B_r_a_n_d_o_n',
    firstName: 'Brandon',
    lastName: 'Duong',
    email: 'brandon@mcmaster.ca',
    bio: "Aenean vehicula libero quis arcu sodales, et blandit orci pellentesque. Etiam maximus ex id ex iaculis, nec vehicula dolor cursus. Sed pellentesque sed metus id tempor. Curabitur ullamcorper quis lectus quis laoreet. Pellentesque vehicula felis tellus, quis tempus lectus consectetur vitae. Fusce dignissim commodo consequat. Vestibulum blandit sagittis dolor. Duis eu neque eros. Nulla vitae elit arcu. Maecenas eget nunc imperdiet, lacinia justo sit amet, consequat dolor. Fusce bibendum ac enim a pharetra. Cras tincidunt odio maximus turpis ullamcorper feugiat. Proin eu tellus ex. Quisque quis massa mi. Sed imperdiet, ipsum eu cursus placerat, sapien nulla auctor ex, egestas viverra diam turpis tristique ipsum.Proin pulvinar eros eget dictum hendrerit.Donec nibh nisl, viverra et dolor ac, finibus imperdiet mauris.Phasellus hendrerit orci vel vestibulum posuere.Vivamus pharetra finibus metus, in iaculis velit auctor et.Suspendisse ac mollis mauris.Fusce semper lectus non diam cursus tempus.Mauris dolor justo, dictum quis lectus vel, viverra porttitor eros.Maecenas cursus convallis tellus, sed eleifend elit finibus ac.Cras id hendrerit massa.Duis mattis laoreet feugiat.Vivamus eu erat in leo ornare auctor nec a nibh.Donec euismod tristique lectus vitae facilisis."
  },
  {
    username: 'Cameron_Orr123',
    firstName: 'Cameron',
    lastName: 'Orr',
    email: 'cameron123@mcmaster.ca',
    bio: 'Donec eleifend dui vel mi ultricies maximus. Aliquam est nulla, finibus eu dolor vitae, pharetra dignissim arcu. Mauris finibus id sem a placerat. Phasellus eget venenatis tellus, et rutrum sapien. Ut sodales orci eu sem ultricies, eu faucibus mauris condimentum. Morbi eu risus eu risus vehicula vehicula tincidunt eu purus. In vel libero elementum, consectetur orci non, vestibulum nisi. '
  },
  {
    username: 'ericthai',
    firstName: 'Eric',
    lastName: 'Thai',
    email: 'eric@mcmaster.ca',
    bio: 'Sed accumsan fermentum tempor. Curabitur aliquet libero id semper fringilla. Integer placerat faucibus felis, sed aliquam neque tincidunt quis. Nulla tristique nec ipsum in tincidunt. Aenean blandit enim ut sapien ornare congue. Nulla sed leo facilisis, placerat turpis tincidunt, eleifend purus. Aenean vel facilisis diam. '
  }
]

function getProfile(username) {
    let match = fakeProfiles.filter(profile => {
      return profile.username === username;
    });
    if (match.length >= 1) return match[0];
    else return null;
}

function updateProfile(username, payload) {
  return new Promise((resolve, reject) => {
    resolve({
      response: 200
    });
  });
}

export {
  getProfile,
  updateProfile
}