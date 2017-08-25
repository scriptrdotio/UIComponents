# QuickStartApp

Scriptr.io QuickStartApp to show basic features of the platform
    - Device Data Live Streaming
    - Data Transformation
    - Data Storage
    - Data Querying
    - Data Charting

## Usage
This app assumes the user mobile phone as his device.
  - login to your scriptr account
  - Create 2 channels "requestChannel", "responseChannel". Check the "Allow anonymous publishing" & the "Allow anonymous subscription".
  - Open the quickstart/simulator/phone.html, find wsClientProvider.setToken(....), put inside it your account anonymous token and save.
  - From your modevice open the quickstart/simulator/phone.html file. You will get a deviceId.
  - On your laptop open the quickstart/dashboard/index.html file.
  - Go to the quickstart/dashboard/index.html, a dashboard editor will open. 
  - Click on the settings icon of the speedometer widget loaded.
  - Update the api params field with {"deviceId": "<value of device id you got on your mobile>"}
  - Update the Message tag field with {accelerometer_<value of device id you got on your mobile>"}
  - Save your new speedometer config.
  - Click on the settings icon of the accelerometer widget loaded.
  - Update the Message tag field with {accelerometer_<value of device id you got on your mobile>"}
  - Save your new accelerometer config.
  - Go to the quickstart/api/subscriber and subscribe it to the requestChannel.
  
## How it works
    ### Simulator
   - The phone will open a websocket connection to scriptr.io 
   - Every 1 second, the device motion will be pushed to the requestChannel.
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
         - publish location to the map in the dashboard as expected by the map widget format.
### speed
- The speedometer in the dashboard/index.html file will get the data on first load from api/getLiveData.
- The devicemanager will also publish the speed whenever it is calculated:

        var speedoId = "speedometer"+"_"+ data.deviceId
        //Publish live speed
        publish("responseChannel", {"id": speedoId, "result":       
        parseFloat(data.speed) * 1000});



