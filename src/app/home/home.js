/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngAusterity.home', [
  'ui.router',
  'ngSanitize',
  'ngStorage',
  'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      'main': {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController(
  $scope, $localStorage
) {
  $scope.events = {
    bb: {
      cubes: ['b', 'b'],
      title: 'Economic Downturn',
      text: 'reduce Wealth by one and increase cuts on every institution by one.',
      action: function() {
        $scope.model.wealth -= 1;
        $scope.model.private_enterprise_cuts += 1;
        $scope.model.national_security_cuts += 1;
        $scope.model.social_welfare_cuts += 1;
      }
    },
    bu: {
      cubes: ['b', 'u'],
      title: 'Underfunded Police Force',
      text: '(TODO spend <span class="cube cube-y"></span> or) add ' +
            '<span class="cube cube-r"></span>.',
      action: function() {
        $scope.model.used.push('r');
      }
    },
    br: {
      cubes: ['b', 'r'],
      title: 'Political corruption',
      text: 'decrease Popularity by one.',
      action: function() {
        $scope.model.popularity -= 1;
      }
    },
    ry: {
      cubes: ['r', 'y'],
      title: 'Anti-austerity Protests',
      text: '(TODO either Remove <span class="cube cube-y"></span> and ' +
            '<span class="cube cube-r"></span> or) increase Popularity by one ' +
            ' and add <span class="cube cube-b"></span>.',
      action: function() {
        $scope.model.popularity += 1;
        $scope.model.used.push('b');
      }
    },
    rr: {
      cubes: ['r', 'r'],
      title: 'Industrial Violations',
      text: 'decrease Public Safety by two.',
      action: function() {
        $scope.model.public_safety -= 2;
      }
    },
    rw: {
      cubes: ['r', 'w'],
      title: 'Welfare Cheats',
      text: 'decrease Employment by one.',
      action: function() {
        $scope.model.employment -= 1;
      }
    },
    ww: {
      cubes: ['w', 'w'],
      title: 'Back-to-Work Programme',
      text: 'increase Employment by two.',
      action: function() {
        $scope.model.employment += 2;
      }
    },
    yy: {
      cubes: ['y', 'y'],
      title: 'Budget Surplus',
      text: 'increate Wealth by one; (TODO may spend both cubes to fund a single already-funded institution).',
      action: function() {
        $scope.model.wealth += 1;
      }
    },
    by: {
      cubes: ['b', 'y'],
      title: 'Early Repayments',
      text: '(TODO Optionnaly Spend <span class="cube cube-y"></span> to ' +
            'Remove <span class="cube cube-b"></span>).',
      action: function() {
      }
    },
    uy: {
      cubes: ['u', 'y'],
      title: 'Security Spending',
      text: 'increate Popularity (TODO or Public Safety by one).',
      action: function() {
        $scope.model.popularity += 1;
      }
    },
    uu: {
      cubes: ['u', 'u'],
      title: 'Falling Crime Rates',
      text: 'increase Public Safety by two.',
      action: function() {
        $scope.model.public_safety += 2;
      }
    },
    ru: {
      cubes: ['r', 'u'],
      title: 'Special Operations',
      text: '(TODO either Remove <span class="cube cube-u"></span> and ' +
            '<span class="cube cube-r"></span> or) reduce Public Safety by one.',
      action: function() {
        $scope.model.public_safety -= 1;
      }
    },
    uw: {
      cubes: ['u', 'w'],
      title: 'Welfare Cheat Crackdown',
      text: '(either Remove <span class="cube cube-w"></span> or) increase ' +
            'Employment by one and decrease Popularity by one.',
      action: function() {
        $scope.model.employment += 1;
        $scope.model.popularity -= 1;
      }
    },
    wy: {
      cubes: ['w', 'y'],
      title: 'Nationalised Healthcare Spending',
      text: 'increase Health by two.',
      action: function() {
        $scope.model.health += 2;
      }
    },
    bw: {
      cubes: ['b', 'w'],
      title: 'Welfare Budget Problems',
      text: '(TODO Spend <span class="cube cube-y"></span> or) reduce Health by one.',
      action: function() {
        $scope.model.health -= 1;
      }
    }
  };
  $scope.scale_lines = [
    [10, '10'], [9, ''], [8, ''], [7, '7'], [6, ''],
    [5, '5'], [4, ''], [3, '3'], [2, ''], [1, '1'],
    [0, '']
  ];
  $scope.drawOne = function(collection) {
    return _.pullAt(collection, _.random(collection.length-1))[0];
  };
  $scope.draw = function() {
    if ($scope.model.bag.length === 1) {
      $scope.model.used.push($scope.model.bag.pop());
      $scope.model.log.unshift('Only one cube left in the bag, the cube goes to "Used" without being resolved.');
    } else {
      // Draw two
      var cube = $scope.drawOne($scope.model.bag);
      $scope.model.log.unshift('Cube [' + cube + '] drawn from bag.');
      $scope.model.current.push(cube);
      cube = $scope.drawOne($scope.model.bag);
      $scope.model.log.unshift('Cube [' + cube + '] drawn from bag.');
      $scope.model.current.push(cube);
    }
    $scope.model.candraw = false;
  };
  $scope.aTakeFromb = function(collectionA, collectionB) {
    while (collectionB.length > 0) {
      collectionA.push($scope.drawOne(collectionB));
    }
  };
  $scope.resolve = function(event) {
    $scope.model.log.unshift(event.title + ': ' + event.text);
    event.action();
    $scope.aTakeFromb($scope.model.used, $scope.model.current);
    if ($scope.model.private_enterprise_cuts === 3) {
      $scope.model.log.unshift('Private Enterprise Cuts: -2 employment.');
      $scope.model.private_enterprise_cuts = 0;
      $scope.model.employment -= 2;
    }
    if ($scope.model.national_security_cuts === 3) {
      $scope.model.log.unshift('National Security Cuts: add R.');
      $scope.model.national_security_cuts = 0;
      $scope.model.used.push('r');
    }
    if ($scope.model.social_welfare_cuts === 3) {
      $scope.model.log.unshift('Social Welfare Cuts: -2 health.');
      $scope.model.social_welfare_cuts = 0;
      $scope.model.health -= 2;
    }
    var lost = false;
    var message = null;
    if ($scope.model.employment === 0) {
      lost = true;
      message = 'Employment = 0, you Lose';
    } else if ($scope.model.public_safety === 0) {
      lost = true;
      message = 'Public Safety = 0, you Lose';
    } else if ($scope.model.wealth === 0) {
      lost = true;
      message = 'Wealth = 0, you Lose';
    } else if ($scope.model.health === 0) {
      lost = true;
      message = 'Health = 0, you Lose';
    } else if ($scope.model.popularity === 0) {
      lost = true;
      message = 'Popularity = 0, you Lose';
    }
    if (!lost) {
      $scope.model.candraw = true;
    } else {
      $scope.model.gameover = message;
      $scope.model.log.unshift('GAME OVER: ' + message);
    }
  };
  $scope.borrow = function() {
    $scope.model.log.unshift('Borrow money : add YY to bag B.');
    $scope.model.used.push('y');
    $scope.model.used.push('y');
    $scope.model.bag.push('b');
  };
  $scope.taxes = function() {
    $scope.model.log.unshift('Raise taxes : add to bag R, Y.');
    $scope.model.bag.push('r');
    $scope.model.bag.push('y');
  };
  $scope.payloan = function() {
    $scope.model.log.unshift('Pay loan : (TODO remove YYB).');
    // TODO
  };
  $scope.eoy = function() {
    $scope.model.log.unshift('End of Year ' + $scope.model.year);
    // Check endgame conditions
    var won = false;
    if (!_($scope.model.used).contains('b')) {
      $scope.model.log.unshift('GAME OVER: you Won !!');
      won = true;
    }
    if ($scope.model.employment >= 9) {
      $scope.model.log.unshift('Revenues: 2 Y');
      $scope.model.used.push('y');
      $scope.model.used.push('y');
    } else if ($scope.model.employment >= 5) {
      $scope.model.log.unshift('Revenues: 1 Y');
      $scope.model.used.push('y');
    }
    if ($scope.model.wealth < $scope.model.employment) {
      $scope.model.log.unshift('Adjust wealth towards employment: +1');
      $scope.model.wealth += 1;
    } else if ($scope.model.wealth > $scope.model.employment) {
      $scope.model.log.unshift('Adjust wealth towards employment: -1');
      $scope.model.wealth -= 1;
    }
    if ($scope.model.health < $scope.model.public_safety) {
      $scope.model.log.unshift('Adjust health towards public safety: +1');
      $scope.model.health += 1;
    } else if ($scope.model.health > $scope.model.public_safety) {
      $scope.model.log.unshift('Adjust health towards public safety: -1');
      $scope.model.health -= 1;
    }
    if ($scope.model.popularity < $scope.model.wealth) {
      $scope.model.log.unshift('Adjust popularity towards wealth: +1');
      $scope.model.popularity += 1;
    } else if ($scope.model.popularity > $scope.model.wealth) {
      $scope.model.log.unshift('Adjust popularity towards wealth: -1');
      $scope.model.popularity -= 1;
    }
    if ($scope.model.popularity < $scope.model.health) {
      $scope.model.log.unshift('Adjust popularity towards health: +1');
      $scope.model.popularity += 1;
    } else if ($scope.model.popularity > $scope.model.health) {
      $scope.model.log.unshift('Adjust popularity towards health: -1');
      $scope.model.popularity -= 1;
    }
    $scope.aTakeFromb($scope.model.bag, $scope.model.used);
    $scope.aTakeFromb($scope.model.bag, $scope.model.private_enterprise_fin);
    $scope.aTakeFromb($scope.model.bag, $scope.model.national_security_fin);
    $scope.aTakeFromb($scope.model.bag, $scope.model.social_welfare_fin);
    if (!won) {
      $scope.model.candraw = true;
      $scope.model.year += 1;
    }
  };
  $scope.newgame = function() {
    $scope.model = {
      year: 1,
      log: [],
      candraw: true,
      gameover: null,
      bag: [],
      current: [],
      current_str: '',
      used: [],
      tresory: [],
      employment: 5,
      public_safety: 5,
      wealth: 5,
      health: 5,
      popularity: 5,
      private_enterprise_cuts: 0,
      national_security_cuts: 0,
      social_welfare_cuts: 0,
      private_enterprise_fin: [],
      national_security_fin: [],
      social_welfare_fin: []
    };
    $scope.model.bag = ['b', 'b', 'b', 'b', 'r', 'r', 'u', 'u', 'w', 'y'];
    $scope.model.log.unshift('Game initialized');
  };
  $scope.model = {};
  if ($localStorage['ngAusterity']) {
    $scope.model = angular.copy($localStorage);
    $scope.model.log.unshift('Game loaded from localStorage.');
  } else {
    $scope.newgame();
  }
  $scope.$watchCollection('model.current', function() {
    var current_copy = angular.copy($scope.model.current);
    $scope.model.current_str = _(current_copy).sort().join('');
  });
})

;

