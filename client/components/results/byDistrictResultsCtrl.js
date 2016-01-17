angular.module('ByDistrictResults', ['HandleRequests', 'dataCache'])
  .controller('ByDistrictResultsController', ['$scope', 'SendRequest', '$rootScope', 'DataCache',
    function($scope, SendRequest, $rootScope, DataCache) {
      $scope.getVotes = $rootScope.getMemberAndVotes;
      $scope.sunlightData = DataCache.zipSearchReps;
      console.log($scope.sunlightData);
      $scope.state = $scope.sunlightData[0].state_name;
      $scope.fullname = $scope.sunlightData.first_name + ' ' + $scope.sunlightData.last_name;

      $scope.sunlightData.forEach(function (rep) {
        rep.imageUrl = 'https://theunitedstates.io/images/congress/225x275/' + rep.bioguide_id + '.jpg';
        SendRequest.get('api/repById/' + rep.bioguide_id)
        .then (function (response) {
          for (var key in response.data) {
            rep[key] = response.data[key];
          }
        });
      });

      // Angular likes to call drawParty and drawPresent six times each for some reason.
      // Tracking whether or not it's been called yet can work around the issue.
      var presentMade = [];
      var partyMade = [];

      var drawCircle = function(id, limit, color) {
        console.log(id, limit, color);
        var circle = new ProgressBar.Circle(id, {
          color: color,
          strokeWidth: 6,
          trailWidth: 1,
          duration: 800,
          svgStyle: {
            display: 'inline',
            width: '15%'
          },
          text: {
            value: '0 Votes'
          },
          step: function(state, bar) {
            bar.setText((bar.value() * '100').toFixed(0) + '%');
          }
        });

        circle.animate(.5, function() {
          circle.animate(limit);
        });
      };

      $scope.drawPresent = function(index, missed) {
        if (missed && !presentMade[index]) {
          presentMade[index] = true;
          drawCircle('#present' + index, (100 - missed) / 100, 'coral');
        }
      };

      $scope.drawParty = function(index, party) {
        if (party && !partyMade[index]) {
          partyMade[index] = true;
          drawCircle('#party' + index, party / 100, 'green');
        }
      };

      $scope.test = function(index) {

        if (!circleMade[index]) {
          circleMade[index] = true;

}
        return 'hi';
      }

      $scope.party = {
        'R': 'Republican',
        'D': 'Democrat'
      }
      $scope.getDistrict = function() {
        var result;
        $scope.sunlightData.forEach(function(data) {
          if (data.district) {
            result = data.district;
          }
        });
        return result;
      };

      $scope.getImgUrl = function (id) {
        console.log('getting image url for', id);
        return 'https://theunitedstates.io/images/congress/225x275/' + id + '.jpg';
      };

      $scope.district = $scope.getDistrict();
      console.log($scope.district);


            //Circular animation
  // var nonMissedVotes = (100 - 10)/100;
  // var circle = new ProgressBar.Circle('#voteProgress', {
  //     color: '#FCB03C',
  //     strokeWidth: 6,
  //     trailWidth: 1,
  //     duration: 800,
  //     text: {
  //         value: '0 Votes',
  //         style: {
  //           color: 'coral',
  //           'font-size': 'x-large',
  //           left: '50%',
  //           top: '45%'
  //         }
  //     },
  //     step: function(state, bar) {
  //       bar.setText((bar.value() * '100').toFixed(0) + '%');
  //     }
  // });

  // circle.animate(.5, function() {
  //     console.log(nonMissedVotes);
  //     circle.animate(nonMissedVotes);
  // });

    }
  ]);

// EXAMPLE SUNLIGHT REP
// $$hashKey: "object:95"
// bioguide_id: "M001143"
// birthday: "1954-07-12"
// chamber: "house"
// contact_form: "https://mccollum.house.gov/contact-me/email-me"
// crp_id: "N00012942"
// district: 4
// facebook_id: "153386471383393"
// fax: "202-225-1968"
// fec_ids: Array[1]
// first_name: "Betty"
// gender: "F"
// govtrack_id: "400259"
// icpsr_id: 20122
// in_office: true
// last_name: "McCollum"
// middle_name: "Louise"
// name_suffix: null
// nickname: null
// oc_email: "Rep.Mccollum@opencongress.org"
// ocd_id: "ocd-division/country:us/state:mn/cd:4"
// office: "2256 Rayburn House Office Building"
// party: "D"
// phone: "202-225-6631"
// state: "MN"
// state_name: "Minnesota"
// term_end: "2017-01-03"
// term_start: "2015-01-06"
// thomas_id: "01653"
// title: "Rep"
// twitter_id: "BettyMcCollum04"
// votesmart_id: 3812
// website: "http://mccollum.house.gov"
// youtube_id: null

// EXAMPLE DB REP (originally from NY TIMES)
// "id": "M001143",
// "thomas_id": "1653",
// "api_uri": "http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/M001143.json",
// "first_name": "Betty",
// "middle_name": null,
// "last_name": "McCollum",
// "party": "D",
// "twitter_account": "BettyMcCollum04",
// "facebook_account": "repbettymccollum",
// "facebook_id": "153386471383393",
// "url": "http://mccollum.house.gov",
// "rss_url": "http://mccollum.house.gov/rss.xml",
// "domain": "mccollum.house.gov",
// "dw_nominate": "-0.402",
// "ideal_point": "-0.914146111",
// "seniority": "14",
// "next_election": "2014",
// "total_votes": "1192",
// "missed_votes": "31",
// "total_present": "2",
// "state": "MN",
// "district": "4",
// "missed_votes_pct": "2.60",
// "votes_with_party_pct": "93.37"