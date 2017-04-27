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
  gauge-value     | 75	 | Sets the value of the gauge. | int | NO
  custom-sectors  | [{color : "#A3CD3B", lo : 0, hi : 25}, { color : "#FF4A43", lo : 25, hi : 100 }] | array of objects with color, hi, lo attributes. | [] of objects | NO
  value-font-color     | '#999'	 | color of the value text. | string | NO
  min       | 0    | 	minimum value.		| float | NO
  max       | 100    | 	maximum value.	| float | NO

 
