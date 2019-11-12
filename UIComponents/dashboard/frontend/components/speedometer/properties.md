## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  gauge-radius     | 120 |	sets the size of the gauge. | NO
  min-val          | 0 | 	Minimum value to be shown in gauge scale. | NO                 
  max-val    	     | 220 |	Maximum value to be shown in gauge scale. | NO
  needle-val       | 	0 | Sets the value of needle to be pointed.  | NO                    
  tick-space-min-val | 10 |	space between the major ticks of the gauge.    | NO              
  tick-space-maj-val | 20 |	space between the sub ticks of the gauge.  	| NO				 
  gauge-units      | "kmh"| 	Unit of the values to be shown(ex. Kmph,%).  				 | NO
  tick-col-maj      |  "#C64DFF" | 	sets colour of the major tick.  					| NO		 
  tick-col-min      | "#999999" | 	sets colour of the sub tick.						| NO		 
  outer-edge-col    | "#f4f4f4" | 	sets the colour of outer circle of the gauge.  				| NO 		
  pivot-col        | "#434a54" |	sets colour of the pivot. | NO  									 
  inner-col        | 	"#ffffff" | sets colour of inner body of the gauge. 				| NO	 
  units-label-col   | "#C64DFF" |  	sets colour of units label.  					| NO			 
  tick-label-col    | "#656D78" |	sets colour of labels of the ticks.			| NO				 
  needle-col       | 	"#C64DFF" | sets colour of the needle.  		| NO						 
  default-fonts    | undefined |	sets the default fonts in gauge.						     | NO
  api             | undefined | 	Name of the api to call backend data. | 					 Required if calling data from backend
  transport       | 	undefined | method used to call api (can take "https" or "wss").		| NO 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  msg-tag          | undefined | 	Subscribe to socket messages with tag name.		     | NO
  api-params      | undefined   | 	api parameters. | NO  					
  
  