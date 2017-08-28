# QuickStartApp

Scriptr.io QuickStartApp to show basic features of the platform
- Device Data Live Streaming
- Data Transformation
- Data Storage
- Data Querying
- Data processing
- Data transformation
- Data Charting

## Usage
This app assumes the user mobile phone as his device.
  - login to your scriptr account
  - Create 2 channels "requestChannel", "responseChannel". Check the "Allow anonymous publishing" & the "Allow anonymous subscription".
  - Open the quickstart/simulator/phone.html, find wsClientProvider.setToken(....), put inside it your account anonymous token and save.
  - From your modevice open the quickstart/simulator/phone.html file. You will get a deviceId.
  - On your laptop open the quickstart/dashboard/index.html file.
  - Go to the quickstart/dashboard/index.html, a dashboard editor will open.
  

------------
- Click on the settings icon of the Speed speedometer widget loaded.
- Update:
  - message tag field with {"speedometer_speed_&lt;value of device id you got on your mobile&gt;"}
  - api params field with {"deviceId": "&lt;value of device id you got on your mobile&gt;"}
- Save your new average speed speedometer config for the live speed calculations.

------------
- Click on the settings icon of the Average Speed speedometer widget loaded.
- Update 
  -  message tag field with {"speedometer__average_speed_&lt;value of device id you got on your mobile&gt;"}
  - api params field with {"deviceId": "&lt;value of device id you got on your mobile&gt;"}
- Save your new average speed speedometer config for the live average speed calculations.
  
------------
- click on the settings icon of the accelerometer widget.
- update
  - message tag field with {accelerometer_&lt;value of device id you got on your mobile&gt;"}
  - save your new accelerometer config for live motion changes.**

------------
- click on settings icon of the line chart widget.
- update
  - message tag field with {linechart_&lt;value of device id you got on your mobile&gt;"}
  - save your new line chart config for speed over time charting.
------------
  - Go To The Quickstart/Api/Subscriber And Subscribe It To The Requestchannel.

## How it works
    ### Simulator
   - The phone will open a websocket connection to scriptr.io 
   - Every 1 second, the device motion will be pushed to the requestChannel, move your phone or rotate to send significant data.
   - On position change, device position will be published over the requestChannel
### Scriptr.io
### acceleration
   - The api/subscriber, will detect if acceleration data is received and will call the entities/devicemanager to publishAcceleration.
   - The entities/devicemanager will publish the acceleration in the format expected by the accelerometer, and will build its id to be "accelerometer_"+<deviceId>
### position
   - the api/subscripber will call the devicemanager to process location data:
         - Calculate speed (entities/process/speed & lib/geolib)
         - Store latest location entry & speed
         - Calculate average speed (entities/process/speed & lib/aggregates)
         - & Store last 10 registered speed calculation and latest average speed for the device.
         - publish location to the map in the dashboard as expected by the map widget format.
### speed
- The average speed speedometer in the dashboard/index.html file will get the data of the average speed on first load from api/getLiveAverageSpeed.
- The devicemanager will publish the average speed whenever it is calculated:
```javascript
        var deviceAggregates =  aggregates.getAggregates(data.deviceId); 
        var avgSpeedId = "speedometer_average_speed_"+"_"+ data.deviceId
        //Publish average speed whenever calculated
        publish("responseChannel", {"id": avgSpeedId, "result": parseFloat(deviceAggregates.average) * 1000});
```
- Same thing for speed.

Note: The quickstart app has a dependency the UIComponents module checked-out from scriptrdotio/UIComponents public repo & momentjs module

