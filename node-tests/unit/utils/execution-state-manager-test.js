'use strict';

const assert = require('assert');
const ExecutionStateManager = require('../../../lib/utils/execution-state-manager');

describe('ExecutionStateManager', function() {
  beforeEach(function() {
    this.stateManager = new ExecutionStateManager;
    this.moduleQueue = ['foo', 'bar', 'baz', 'boo', 'far', 'faz'];
  });

  describe('moduleQueue', function() {
    it('is shared when no browserId passed to setModuleQueue', function() {
      this.stateManager.setSharedModuleQueue(this.moduleQueue);

      assert.deepEqual(this.stateManager.getSharedModuleQueue(), this.moduleQueue, 'the correct moduleQueue was returned');
    });

    it('returns the next module from the shared moduleQueue and state is preserved', function() {
      this.stateManager.setSharedModuleQueue(this.moduleQueue);

      assert.equal(this.stateManager.getNextModuleSharedModuleQueue(), 'foo', 'correctly returns the next module');
      assert.deepEqual(this.stateManager.getSharedModuleQueue(), ['bar', 'baz', 'boo', 'far', 'faz'], 'the moduleQueue state was updated');
    });

    it('get next module returns null if shared moduleQueue is not set', function() {
      assert.equal(this.stateManager.getNextModuleSharedModuleQueue(), null, 'returns null when moduleQueue has not been set');
    });

    it('had different queue set when when browserId is specified', function() {
      const anotherQueue = ['1','2','3','4'];
      this.stateManager.setBrowserModuleQueue(this.moduleQueue, 1);
      this.stateManager.setBrowserModuleQueue(anotherQueue, 2);

      assert.deepEqual(this.stateManager.getBrowserModuleQueue(1), this.moduleQueue);
      assert.deepEqual(this.stateManager.getBrowserModuleQueue(2), anotherQueue);
    });

    it('returns the next module from the browser specific moduleQueue and state is preserved', function() {
      this.stateManager.setBrowserModuleQueue(this.moduleQueue, 1);

      assert.equal(this.stateManager.getNextModuleBrowserModuleQueue(1), 'foo', 'correctly returns the next module');
      assert.deepEqual(this.stateManager.getBrowserModuleQueue(1), ['bar', 'baz', 'boo', 'far', 'faz'], 'the moduleQueue state was updated');
    });

    it('get next module returns null if browser moduleQueue is not set', function() {
      assert.equal(this.stateManager.getNextModuleBrowserModuleQueue(1), null, 'returns null when moduleQueue has not been set');
    });
  });
});