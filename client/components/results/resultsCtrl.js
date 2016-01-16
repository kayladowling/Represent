angular.module('Results', [])
.controller('ResultsController',['$scope', '$rootScope', 'searchFactory', function($scope, $rootScope, searchFactory){
  $scope.showPagination = true;
  $scope.pages = {
    min: 1,
    max: 10
  };
  
  //Circular animation
  var nonMissedVotes = (100 - $rootScope.memberInfo.missedVotesPerc)/100;
  console.log($rootScope.memberInfo.votesWithParty);
  var circle = new ProgressBar.Circle('#voteProgress', {
      color: '#FCB03C',
      strokeWidth: 6,
      trailWidth: 1,
      duration: 800,
      text: {
          value: '0 Votes',
          style: {
            color: 'coral',
            'font-size': 'x-large',
            left: '50%',
            top: '45%'
          }
      },
      step: function(state, bar) {
        bar.setText((bar.value() * '100').toFixed(0) + '%');
        // console.log("ORIGINAL " + (bar.value() * '100'));
      }
  });

  circle.animate(.5, function() {
      console.log(nonMissedVotes);
      circle.animate(nonMissedVotes);
  });
var withParty = ( $rootScope.memberInfo.votesWithParty / 100);
  var circle2 = new ProgressBar.Circle('#votesWithParty', {
      color: $rootScope.memberInfo.party === 'D' ? '#5274A6' : '#D94D4D',
      strokeWidth: 6,
      trailWidth: 1,
      duration: 800,
      text: {
          value: '0 Votes',
          style: {
            color: 'coral',
            'font-size': 'x-large',
            left: '50%',
            top: '45%'
          }
      },
      step: function(state, bar) {
        bar.setText((bar.value() * 100).toFixed(0) + '%');
        
      }
  });

  circle2.animate(.5, function() {
      console.log(withParty);
      circle2.animate(withParty);
  });

  //Pagination
  $scope.changePage = function(page) {
    console.log(page);
    $scope.prevMax = $scope.pages.max;
    $scope.pages.max = page * 10;
    $scope.pages.min =  (page * 10) - 10 + 1;
  };

  $scope.showAll = function() {
    $scope.showPagination = false;
    $scope.pages.max = 100;
    $scope.pages.min =  1;
  }

  $scope.showTen = function() {
    $scope.showPagination = true;
    $scope.search = "";
    $scope.pages.max = 10;
    $scope.pages.min =  1;
  }

}])
.run(function($rootScope){
  var init = function(){
    if(localStorage.getItem('memberData') !== null){
      var data = JSON.parse(localStorage.getItem('memberData')); 
      $rootScope.memberInfo = data.member;
      $rootScope.memberBio = data.memberBio[0].split(';');
      $rootScope.memberImageUrl = "https://theunitedstates.io/images/congress/225x275/" + data.member.id + ".jpg";
      $rootScope.memberFacebookUrl = "http://www.facebook.com/" + data.member.facebook;
      $rootScope.memberTwitterUrl = "http://www.twitter.com/" + data.member.twitter;
      console.log(data.member);
      data = JSON.parse(localStorage.getItem('currMemberVotes'));
      $rootScope.currentMember = data;
    }
  }
  $rootScope.$on('$stateChangeStart', function(){
    init();
  })
});

