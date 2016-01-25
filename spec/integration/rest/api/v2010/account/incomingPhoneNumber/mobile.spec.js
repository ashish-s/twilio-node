'use strict';

var _ = require('lodash');
var Holodeck = require('../../../../../holodeck');
var Request = require('../../../../../../../lib/http/Request');
var Response = require('../../../../../../../lib/http/Response');
var Twilio = require('../../../../../../../lib').Twilio;


var client;
var holodeck;

describe('Mobile', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('AC' + _.join(_.fill(new Array(32), 'a'), ''), 'AUTHTOKEN', holodeck);
  });
  it('should generate valid list request', function() {
    holodeck.mock(new Response(500, ''));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .incomingPhoneNumbers
                                  .mobile.list();
    promise = promise.then(function() {
      throw new Error('failed');
    }, function(error) {
      expect(error.constructor).toBe(Error.prototype.constructor);
    });

    promise.done();

    var solution = {
      ownerAccountSid: 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    };
    var url = _.template(
      'https://api.twilio.com/2010-04-01/Accounts/<%= ownerAccountSid %>/IncomingPhoneNumbers/Mobile.json'
    )(solution);


    holodeck.assertHasRequest(new Request({
      method: 'GET',
      url: url
    }));
  });
  it('should generate valid read_full response', function() {
    var body = JSON.stringify({
        'end': 0,
        'first_page_uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/Mobile.json?Page=0&PageSize=50',
        'incoming_phone_numbers': [
            {
                'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                'address_requirements': 'none',
                'api_version': '2010-04-01',
                'beta': null,
                'capabilities': {
                    'mms': false,
                    'sms': true,
                    'voice': false
                },
                'date_created': 'Tue, 08 Sep 2015 16:21:16 +0000',
                'date_updated': 'Tue, 08 Sep 2015 16:21:16 +0000',
                'friendly_name': '61429099450',
                'phone_number': '+61429099450',
                'sid': 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                'sms_application_sid': '',
                'sms_fallback_method': 'POST',
                'sms_fallback_url': '',
                'sms_method': 'POST',
                'sms_url': '',
                'status_callback': '',
                'status_callback_method': 'POST',
                'trunk_sid': null,
                'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json',
                'voice_application_sid': '',
                'voice_caller_id_lookup': false,
                'voice_fallback_method': 'POST',
                'voice_fallback_url': null,
                'voice_method': 'POST',
                'voice_url': null
            }
        ],
        'last_page_uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/Mobile.json?Page=0&PageSize=50',
        'next_page_uri': null,
        'num_pages': 1,
        'page': 0,
        'page_size': 50,
        'previous_page_uri': null,
        'start': 0,
        'total': 1,
        'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/Mobile.json'
    });
    holodeck.mock(new Response(200, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .incomingPhoneNumbers
                                  .mobile.list();
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
  it('should generate valid read_empty response', function() {
    var body = JSON.stringify({
        'end': 0,
        'first_page_uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/Mobile.json?Page=0&PageSize=50',
        'incoming_phone_numbers': [],
        'last_page_uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/Mobile.json?Page=0&PageSize=50',
        'next_page_uri': null,
        'num_pages': 1,
        'page': 0,
        'page_size': 50,
        'previous_page_uri': null,
        'start': 0,
        'total': 1,
        'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/Mobile.json'
    });
    holodeck.mock(new Response(200, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .incomingPhoneNumbers
                                  .mobile.list();
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
  it('should generate valid create request', function() {
    holodeck.mock(new Response(500, ''));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .incomingPhoneNumbers
                                  .mobile.create('+987654321');
    promise = promise.then(function() {
      throw new Error('failed');
    }, function(error) {
      expect(error.constructor).toBe(Error.prototype.constructor);
    });

    promise.done();

    var solution = {
      ownerAccountSid: 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    };
    var url = _.template(
      'https://api.twilio.com/2010-04-01/Accounts/<%= ownerAccountSid %>/IncomingPhoneNumbers/Mobile.json'
    )(solution);

    var values = {
      PhoneNumber: '+987654321',
    }

    holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url,
        data: values,
    }));
  });
  it('should generate valid create response', function() {
    var body = JSON.stringify({
        'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'address_requirements': 'none',
        'api_version': '2010-04-01',
        'beta': false,
        'capabilities': {
            'mms': true,
            'sms': false,
            'voice': true
        },
        'date_created': 'Thu, 30 Jul 2015 23:19:04 +0000',
        'date_updated': 'Thu, 30 Jul 2015 23:19:04 +0000',
        'friendly_name': '(808) 925-5327',
        'phone_number': '+18089255327',
        'sid': 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'sms_application_sid': '',
        'sms_fallback_method': 'POST',
        'sms_fallback_url': '',
        'sms_method': 'POST',
        'sms_url': '',
        'status_callback': '',
        'status_callback_method': 'POST',
        'trunk_sid': null,
        'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json',
        'voice_application_sid': '',
        'voice_caller_id_lookup': false,
        'voice_fallback_method': 'POST',
        'voice_fallback_url': null,
        'voice_method': 'POST',
        'voice_url': null
    });
    holodeck.mock(new Response(200, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .incomingPhoneNumbers
                                  .mobile.create('+987654321');
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
});

