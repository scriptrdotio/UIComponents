# Dashboard Builder 

## About Dashboard Builder:
 
  The dashboard builder is an editor that allows users to visually create dashboards which are basically HTML files containing one or more charts. These charts are configurable (look & feel, behavior, data source, etc...).
  
  
## Requirements:

  UIComponents
  
  Scriptr Login module
  
  Scriptr Underscore module

## Configuring Dashboard Builder:
  
 You can configure your application using "UIComponents/config/scriptrTransport.js" file to set your token and your channels.
 
## Getting started:

  
## Dashboard Builder Options:

You can change the Dashboard Builder options using the "UIComponents/dashboardBuilder/view/dashboard.html" file.

The available options are:


## Options:

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
  load-tree     | false	 | If set to true the Tree will automatically load | true  | NO
   tree-search-criteria  | null | A criteria should be passed for the tree to automatically load | "model.Car"  | required if load-tree is true
  devices-model     | null	 | Name of the API to get data . | "modules/devicemodels/api/getSensors"  | NO

 
