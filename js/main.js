$(function(){

    (function() {
        var slider = $('.otz_block_in').bxSlider({
            mode: 'horizontal',
            auto: true,
            speed: 1000,
            pause: 5000,
            minSlides: 3,
            maxSlides: 3,
            slideWidth: 288,
            moveSlides: 1,
            slideMargin: 20,
            controls: true,
            pager: false,
            useCSS: false,
            onSlideAfter: function(){
                if(this.auto){
                    slider.startAuto();
                }
            }
        });
    })();

    var texts = $('.tabs-body > div'),
        tabs = $('.tabs-nav a').click(function() {

        var $this = $(this),
            index = $this.parent().index();

        tabs.removeClass('active');
        $this.addClass('active');
        texts.removeClass('active');
        texts.eq(index).addClass('active');
    });

    $('.top-but').megaPopup({
        classes : "popup-form",
        includeForm : true,
        AfterLoad : 
        function () {
            var s3_form_class = 's3_form';
            $('.' + s3_form_class + '_init_calendar').datepicker(); 
            var initFrom = $( '.' + s3_form_class + '_init_calendar_from' ),
                initTo = $( '.' + s3_form_class + '_init_calendar_to' );
                initTotal = $( '.' + s3_form_class + '_init_calendar_interval_total' );
            
            function setTotalValue () {
                initTotal.val('от ' + initFrom.val() + ' до ' + initTo.val());
            };
            
            initFrom.datepicker({
                defaultDate: '+1w',
                changeMonth: true,
                numberOfMonths: 1,
                onClose: function( selectedDate ) {
                    initTo.datepicker( 'option', 'minDate', selectedDate );
                    setTotalValue()
                }
            });
            initTo.datepicker({
                defaultDate: '+1w',
                changeMonth: true,
                numberOfMonths: 1,
                onClose: function( selectedDate ) {
                    initFrom.datepicker( 'option', 'maxDate', selectedDate );
                    setTotalValue()
                }
            });
        }
        
    });

});