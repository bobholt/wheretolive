/*jshint expr:true */
define(function(require) {
  'use strict';

  var expect = require('test/lib/expect');
  var MessageBus = require('core/MessageBus');

  describe('MessageBus', function() {

    describe('#on()', function() {

      it('should fire a callback when its event is called', function() {

        var spy = sinon.spy();

        MessageBus.on('triggeredEvent', spy);

        MessageBus.trigger('triggeredEvent');

        expect(spy).to.have.been.called;

      });

      it('should fire the callback each time it is called', function() {

        var spy = sinon.spy();

        MessageBus.on('triggeredEvent', spy);

        MessageBus.trigger('triggeredEvent');
        MessageBus.trigger('triggeredEvent');
        MessageBus.trigger('triggeredEvent');

        expect(spy).to.have.been.calledThrice;

      });

    });

    describe('#off()', function() {

      it('should prevent the callback from firing after it is called', function() {

        var spy = sinon.spy();

        MessageBus.on('triggeredEvent', spy);

        MessageBus.trigger('triggeredEvent');

        MessageBus.off('triggeredEvent');

        MessageBus.trigger('triggeredEvent');
        MessageBus.trigger('triggeredEvent');

        expect(spy).to.have.been.calledOnce;

      });

    });

    describe('#trigger()', function() {

      it('should trigger callbacks attached to listeners', function() {

        var spy = sinon.spy();

        MessageBus.on('triggeredEvent', spy);

        MessageBus.trigger('triggeredEvent');

        expect(spy).to.have.been.called;

      });

    });

    describe('#once()', function() {

      it('should only fire an callback once', function() {

        var spy = sinon.spy();

        MessageBus.once('triggeredEvent', spy);

        MessageBus.trigger('triggeredEvent');
        MessageBus.trigger('triggeredEvent');
        MessageBus.trigger('triggeredEvent');

        expect(spy).to.have.been.calledOnce;

      });

    });

    // Not testing #listenTo() or stopListening()

  });

});