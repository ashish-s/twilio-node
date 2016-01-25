'use strict';

var _ = require('lodash');
var Holodeck = require('../../../holodeck');
var Request = require('../../../../../lib/http/Request');
var Response = require('../../../../../lib/http/Response');
var Twilio = require('../../../../../lib').Twilio;


var client;
var holodeck;

describe('PhoneNumber', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('AC' + _.join(_.fill(new Array(32), 'a'), ''), 'AUTHTOKEN', holodeck);
  });
  it('should generate valid fetch request', function() {
    holodeck.mock(new Response(500, ''));

    var promise = client.lookups.v1.phoneNumbers('+987654321').fetch();
    promise = promise.then(function() {
      throw new Error('failed');
    }, function(error) {
      expect(error.constructor).toBe(Error.prototype.constructor);
    });

    promise.done();

    var solution = {
      phoneNumber: '+987654321'
    };
    var url = _.template(
      'https://lookups.twilio.com/v1/PhoneNumbers/<%= phoneNumber %>'
    )(solution);


    holodeck.assertHasRequest(new Request({
      method: 'GET',
      url: url
    }));
  });
  it('should generate valid fetch response', function() {
    var body = JSON.stringify({
        'carrier': {
            'error_code': null,
            'mobile_country_code': '310',
            'mobile_network_code': '456',
            'name': 'verizon',
            'type': 'mobile'
        },
        'country_code': 'US',
        'national_format': '(510) 867-5309',
        'phone_number': '+15108675309',
        'url': 'https://lookups.twilio.com/v1/PhoneNumbers/phone_number'
    });
    holodeck.mock(new Response(200, body));

    var promise = client.lookups.v1.phoneNumbers('+987654321').fetch();
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
});

