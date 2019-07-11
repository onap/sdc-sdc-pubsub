/*-
 * ============LICENSE_START=======================================================
 * SDC
 * ================================================================================
 * Copyright (C) 2019 AT&T Intellectual Property. All rights reserved.
 * ================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============LICENSE_END=========================================================
 */
import {PluginPubSub} from './plugin-pubsub';

declare const window: Window;

describe('BasePubSub Tests', () => {
    let pluginPubSub: PluginPubSub;

    let testSub: string = 'testSub';
    let testParentUrl: string = 'http://127.0.0.1';
    let testEventsToWait: Array<string> = ['CHECK_IN', 'WINDOW_OUT'];

    beforeEach(() => {
       pluginPubSub = new PluginPubSub(testSub, testParentUrl, testEventsToWait);
    });

    describe('constructor tests', () => {
        it('should init class property', () => {
            expect(pluginPubSub.subscribers.size).toBe(1);
            expect(pluginPubSub.eventsCallbacks.length).toBe(0);
            expect(pluginPubSub.eventsToWait.size).toBe(0);
            expect(pluginPubSub.clientId).toBe('testSub');
        });
    });

    describe('subscribe function tests', () => {
        it('should call notify function with the PLUGIN_REGISTER event and the register data', () => {
            pluginPubSub.notify = jest.fn();

            let wantedRegisterData = {
                pluginId: testSub,
                eventsToWait: []
            };

            pluginPubSub.subscribe();

            expect(pluginPubSub.notify).toHaveBeenCalledWith('PLUGIN_REGISTER', wantedRegisterData);
        })
    });

    describe('unsubscribe function tests', () => {
        it('should call notify function with the PLUGIN_UNREGISTER event and the unregister data', () => {
            pluginPubSub.notify = jest.fn();

            let wantedUnregisterData = {
                pluginId: testSub,
            };

            pluginPubSub.unsubscribe();

            expect(pluginPubSub.notify).toHaveBeenCalledWith('PLUGIN_UNREGISTER', wantedUnregisterData);
        })
    });
});