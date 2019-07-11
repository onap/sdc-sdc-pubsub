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
import { BasePubSub } from './base-pubsub';

declare const window: Window;

export class PluginPubSub extends BasePubSub {

    constructor(pluginId: string, parentUrl: string, eventsToWait?: string[]) {
        super(pluginId);
        this.register('sdc-hub', window.parent, parentUrl);
        this.subscribe(eventsToWait);
    }

    public subscribe(eventsToWait?: string[]) {
        const registerData = {
            pluginId: this.clientId,
            eventsToWait: eventsToWait || []
        };

        this.notify('PLUGIN_REGISTER', registerData);
    }

    public unsubscribe() {
        const unregisterData = {
            pluginId: this.clientId
        };

        this.notify('PLUGIN_UNREGISTER', unregisterData);
    }
}
