## sdc-pubsub

sdc-pubsub [npm](https://www.npmjs.com/package/sdc-pubsub) package.

### Installation

Installing using npm:

```
npm install sdc-pubsub
```

### Loading It Up
#### CommonJS
```javascript
import {PluginPubSub} from 'sdc-pubsub'
```
#### Global Variable

```html
<!-- index.html -->
<script src="./node_Modules/sdc-pubsub/dist/sdc-pubsub.js"></script>
```

```javascript
// script.js
var pubsub = window.sdcPubSub.PluginPubSub;
```

### Usage
#### Initialize a pubsub client
```javascript
// eventsClientId = client id to be used by the event bus, received from query params
// parentUrl = event bus location url for communication, received from query params
// eventsToWaitFor = list of events names that the event hub should wait for their completion.
//                   the client should send an "ACTION_COMPLETED" event to the hub in order to notify the event hub to continue with the flow.
//                   For example: [ “CHECK_IN” ]

var client = new PluginPubSub('eventsClientId, parentUrl, eventsToWaitFor')
```

#### Notify about events
```javascript
client.notify(“READY”)
```

#### Register for an event
```javascript
// When lisetning to event we have to specify the specific event we want to act once it being received.
// eventData.type will hold the event name that was notified by someone else
client.on((eventData,event) => {
      if(eventData.type == ”WINDOW_OUT”) {
		             //do logic
       }
   }
)
```

### Dependencies

None.

### Tests

None.

### Authors

* Idan Amit: [https://wiki.onap.org/display/~idanamit](hhttps://wiki.onap.org/display/~idanamit)


### Links

* SDC onap wiki [https://wiki.onap.org/x/_TX0](https://wiki.onap.org/x/_TX0)
* Generic designer support document [https://wiki.onap.org/display/DW/Generic+Designer+Support](https://wiki.onap.org/display/DW/Generic+Designer+Support)
* Repository [https://gerrit.onap.org/r/gitweb?p=sdc/sdc-pubsub.git;a=summary](https://gerrit.onap.org/r/gitweb?p=sdc/sdc-pubsub.git;a=summary)


### License

Copyright 2018 AT&T, Inc.

Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
