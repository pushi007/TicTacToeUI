 /* Panel Expan Collapse
 ----------------------------------------------*/
 function panelExpandCollapse() {

	 $('.panel-heading span').click(function (){


		 var $this = $(this);

	if(!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
		$this.parents('.panel').css('min-height','0px');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
		$this.parents('.panel').css('min-height','auto');
	}
		return false;
    });

 }
