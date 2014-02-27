/*jshint expr:true */
define(function(require) {

  'use strict';

  var expect = require('test/lib/expect');

  var Message = require('core/Message');
  var MessageBus = require('core/MessageBus');
  var Router = require('core/Router');

  describe('Router', function() {

    describe('#goToPage()', function() {

      it('should fire the pageBeforeChange event with the page argument', function() {

        var requireStub = sinon.stub(window, 'require');
        var triggerStub = sinon.stub(MessageBus, 'trigger');

        Router.goToPage('test1');

        expect(triggerStub).to.have.been.calledWith(Message.PageBeforeChange, 'test1');

        requireStub.restore();
        triggerStub.restore();
      });

      it('should fire the pageChange event with the page argument', function() {

        var requireStub = sinon.stub(window, 'require');
        var triggerStub = sinon.stub(MessageBus, 'trigger');

        Router.goToPage('test2');

        expect(triggerStub).to.have.been.calledWith(Message.PageBeforeChange, 'test2');

        requireStub.restore();
        triggerStub.restore();
      });

      it('should fire the pageBeforeChange event followed by the pageChange event', function() {

        var requireStub = sinon.stub(window, 'require');
        var triggerStub = sinon.stub(MessageBus, 'trigger');

        Router.goToPage('test3');

        expect(triggerStub.withArgs(Message.PageBeforeChange)).to.have.been.calledBefore(triggerStub.withArgs(Message.pageChange));

        requireStub.restore();
        triggerStub.restore();
      });

    });
  });
});