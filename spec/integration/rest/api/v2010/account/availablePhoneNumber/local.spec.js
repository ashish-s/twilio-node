'use strict';

var _ = require('lodash');
var Holodeck = require('../../../../../holodeck');
var Request = require('../../../../../../../lib/http/Request');
var Response = require('../../../../../../../lib/http/Response');
var Twilio = require('../../../../../../../lib').Twilio;


var client;
var holodeck;

describe('Local', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('AC' + _.join(_.fill(new Array(32), 'a'), ''), 'AUTHTOKEN', holodeck);
  });
  it('should generate valid list request', function() {
    holodeck.mock(new Response(500, ''));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .availablePhoneNumbers('US')
                                  .local.list();
    promise = promise.then(function() {
      throw new Error('failed');
    }, function(error) {
      expect(error.constructor).toBe(Error.prototype.constructor);
    });

    promise.done();

    var solution = {
      accountSid: 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      countryCode: 'US'
    };
    var url = _.template(
      'https://api.twilio.com/2010-04-01/Accounts/<%= accountSid %>/AvailablePhoneNumbers/<%= countryCode %>/Local.json'
    )(solution);


    holodeck.assertHasRequest(new Request({
      method: 'GET',
      url: url
    }));
  });
  it('should generate valid read_full response', function() {
    var body = JSON.stringify({
        'available_phone_numbers': [
            {
                'address_requirements': 'none',
                'beta': false,
                'capabilities': {
                    'MMS': true,
                    'SMS': false,
                    'voice': true
                },
                'friendly_name': '(808) 925-1571',
                'iso_country': 'US',
                'lata': '834',
                'latitude': '19.720000',
                'longitude': '-155.090000',
                'phone_number': '+18089251571',
                'postal_code': '96720',
                'rate_center': 'HILO',
                'region': 'HI'
            }
        ],
        'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/Local.json?PageSize=1'
    });
    holodeck.mock(new Response(200, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .availablePhoneNumbers('US')
                                  .local.list();
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
  it('should generate valid read_empty response', function() {
    var body = JSON.stringify({
        'available_phone_numbers': [],
        'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/Local.json?PageSize=1'
    });
    holodeck.mock(new Response(200, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .availablePhoneNumbers('US')
                                  .local.list();
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
});

