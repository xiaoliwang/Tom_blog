"use strict";
var should = require('should'),
    request = require('co-supertest');
require('co-mocha');

describe('test',function(){
    describe('test2',function(){
        var agent;
        before(function *(){
            agent = request.agent(server);
        });
        it('lalala', function *(){
            yield agent
                .get('/setname')
                .expect(200)
        });
    });
});