$(function() {    
/*
    Morris.Donut({
        element: 'Acquirer-Payment-chart',
        data: [{
            label: "Paid $",
            value: 20
        }, {
            label: "Pending $",
            value: 30
        }, {
            label: "Settlement $",
            value: 50
        }],
        resize: true
    });*/

    Morris.Bar({
        element: 'Merchants-Enrolled-chart',
		 data: [
			{
            period: '2015 Q1',
            Merchants: 10 ,
			 
        }, {
            period: '2015 Q2',
            Merchants: 55 ,
			 
        }, {
            period: '2015 Q3',
            Merchants: 28 
        }, {
            period: '2015 Q4',
            Merchants: 20 
        }, 
		],
        xkey: 'period',
        ykeys: ['Merchants'],
        labels: ['Merchants'],
		xLabels: 'month',
       
        hideHover: 'auto',
		fillOpacity: 0.6,
   /* barColors: ['#4DA74D'],*/
 
        resize: true 
      
    });
	/*Morris.Bar({
    element: 'Acquirer-Revenue-chart',
    data: [
      {month: 'Jan 15', YTDCardDeposit: 1000, YTDCashDeposit: 5500, MTDCardDeposit: 2800, MTDCashDeposit: 4000},
      {month: 'Feb 15', YTDCardDeposit: 2000, YTDCashDeposit: 6500, MTDCardDeposit: 6800, MTDCashDeposit: 3000},
      {month: 'Mar 15', YTDCardDeposit: 3000, YTDCashDeposit: 3500, MTDCardDeposit: 4800, MTDCashDeposit: 2000},
      {month: 'Apr 15', YTDCardDeposit: 4000, YTDCashDeposit: 2500, MTDCardDeposit: 3800, MTDCashDeposit: 1000},
	  {month: 'May 15', YTDCardDeposit: 1000, YTDCashDeposit: 5500, MTDCardDeposit: 2800, MTDCashDeposit: 4000},
      {month: 'Jun 15', YTDCardDeposit: 2000, YTDCashDeposit: 6500, MTDCardDeposit: 6800, MTDCashDeposit: 3000},
      {month: 'Jul 15', YTDCardDeposit: 3000, YTDCashDeposit: 3500, MTDCardDeposit: 4800, MTDCashDeposit: 2000},
      {month: 'Aug 15', YTDCardDeposit: 4000, YTDCashDeposit: 2500, MTDCardDeposit: 3800, MTDCashDeposit: 1000},
	  {month: 'Sep 15', YTDCardDeposit: 4000, YTDCashDeposit: 2500, MTDCardDeposit: 3800, MTDCashDeposit: 1000},
	  {month: 'Oct 15', YTDCardDeposit: 1000, YTDCashDeposit: 5500, MTDCardDeposit: 2800, MTDCashDeposit: 4000},
      {month: 'Nov 15', YTDCardDeposit: 2000, YTDCashDeposit: 6500, MTDCardDeposit: 6800, MTDCashDeposit: 3000},
      {month: 'Dec 15', YTDCardDeposit: 3000, YTDCashDeposit: 3500, MTDCardDeposit: 4800, MTDCashDeposit: 2000}
       
    ],
    xkey: 'month',
    ykeys: ['YTDCardDeposit', 'YTDCashDeposit', 'MTDCardDeposit', 'MTDCashDeposit'],
    labels: ['YTD Card Deposit', 'YTD Cash Deposit', 'MTD Card Deposit', 'MTD Cash Deposit'],
    barRatio: 0.4,
    xLabelAngle: 35,
    hideHover: 'auto',
	resize: true,
	barColors: function (row, series, type) {
		if (type === 'bar') {
		  var blue = Math.ceil(255 * row.y / this.ymax);
		  
		  return 'rgb(0,0,'+ blue +')';
		}
    	else {
      		return '#000';
    	}
  	}
  
  });*/
	
	Morris.Bar({
    element: 'Acquirer-Revenue-chart',
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
      
	/*barColors: function (row, series, type) {
		if (type === 'bar') {
		  var blue = Math.ceil(255 * row.y / this.ymax);
		  
		  return 'rgb(0,0,'+ blue +')';
		}
    	else {
      		return '#000';
    	}
  	}*/
  
  }); 

});
