$(function() {    
 
	var data = [
      { y: 'Jan 15', a: 50, b: 90},
      { y: 'Feb 15', a: 65,  b: 75},
      { y: 'Mar 15', a: 50,  b: 50},
      { y: 'Apr 15', a: 75,  b: 60},
      { y: 'May 15', a: 80,  b: 65},
      { y: 'Jun 15', a: 90,  b: 70},
      { y: 'Jul 15', a: 100, b: 75},
      { y: 'Aug 15', a: 115, b: 75},
      { y: 'Sep 15', a: 120, b: 85},
      { y: 'Oct 15', a: 145, b: 85},
      { y: 'Nov 15', a: 160, b: 95},
      { y: 'Dec 15', a: 170, b: 115}
    ],
    config = {
      data: data,
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Available Credit', 'Balance'],
      fillOpacity: 0.6,
      hideHover: 'auto',
      behaveLikeLine: true,
      resize: true,
      pointFillColors:['#ffffff'],
      pointStrokeColors: ['black'],
      /*lineColors:['green','red']*/
	  barColors: ['#0B62A4','#4DA74D'] 
  };
 
config.element = 'CreditCard';
config.stacked = true;
Morris.Bar(config);
 
/*Morris.Line({
  element: 'CreditCard',
  data: [
    { mth: 'Jan', a: 15, b: 10 },
    { mth: 'Feb', a: 25,  b: 25 },
    { y: '2008', a: 30,  b: 30 },
    { y: '2009', a: 40,  b: 35 },
    { y: '2010', a: 50,  b: 40 },
    { mth: 'Mar', a: 75,  b: 65 },
    { mth: 'Apr', a: 100, b: 90 }
  ],
  xkey: 'mth',
  ykeys: ['a', 'b'],
  labels: ['Available Credit' , 'Balance' ]
});*/
  
	Morris.Bar({
    element: 'Merchant-Revenue-chart',
    data: [
	{CC: 'Cash Deposits', MTD: 90, YTD: 140},
      {CC: 'Card Deposits',  MTD: 115,  YTD: 130},
          
    ],
    xkey: 'CC',
    ykeys: ['MTD', 'YTD'],
    labels: ['MTD', 'YTD'],
     
    hideHover: 'auto',
	resize: true,
	
	fillOpacity: 0.6,
    barColors: ['#0B62A4','#4DA74D'] 
      

  
  }); 

});
