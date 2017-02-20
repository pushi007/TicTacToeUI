$(function() {

    Morris.Area({
        element: 'morris-Quarter-chart',
		 data: [
				{
            period: '2014 Q1',
            Acquirer: 15,
            Issuer: 30,
            ReferralPartner: 51
        },{
            period: '2014 Q2',
            Acquirer: 33,
            Issuer: 25,
            ReferralPartner: 48
        },{
            period: '2014 Q3',
            Acquirer: 4,
            Issuer: 57,
            ReferralPartner: 20
        },{
            period: '2014 Q4',
            Acquirer: 11,
            Issuer: 41,
            ReferralPartner: 18
        }, {
            period: '2015 Q1',
            Acquirer: 10,
            Issuer: 10,
            ReferralPartner: 31
        }, {
            period: '2015 Q2',
            Acquirer: 55,
            Issuer: 12,
            ReferralPartner: 21
        }, {
            period: '2015 Q3',
            Acquirer: 6,
            Issuer: 28,
            ReferralPartner: 42
        }, /*{
            period: '2015 Q4',
            Acquirer: 7,
            Issuer: 20,
            ReferralPartner: 20
        }*/],
        xkey: 'period',
        ykeys: ['Acquirer', 'Issuer', 'ReferralPartner'],
        labels: ['Acquirer', 'Issuer', 'Referral Partner'],
		xLabels: 'month',
        pointSize: 2,
        hideHover: 'auto',
        resize: true
      
    });

   /* Morris.Donut({
        element: 'morris-donut-chart',
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
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: 'Jan 2015',
            a: 100,
            b: 90
        }, {
            y: 'Feb 2015',
            a: 75,
            b: 65
        }, {
            y: 'Mar 2015',
            a: 50,
            b: 40
        }, {
            y: 'Apr 2015',
            a: 75,
            b: 65
        }, {
            y: 'May 2015',
            a: 50,
            b: 40
        }, {
            y: 'Jun 2015',
            a: 75,
            b: 65
        }, {
            y: 'Jul 2015',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['ABC Card', 'XYZ Card'],
        hideHover: 'auto',
        resize: true
    });*/

});
