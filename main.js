$(function() {
    $('#opportunities-pane').find('.widget').matchHeight({byRow:false});
    $('#sales-marketing-pane').find('.widget').matchHeight({byRow:false});
});

/* Number Counter */
$(document).ready(function(){
    $('.counter').each(function() {
        var $this = $(this),
            countTo = $this.attr('data-count');

        $({ countNum: $this.text()}).animate({
                countNum: countTo
            },
            {
                duration: 700,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                    //alert('finished');
                }

            });
    });
});

/* Populate Campaign Names in Filter */
function populateCampaigns(){
    var all = ['','Campaign 1','Campaign 2','Campaign 3'];
    var active = ['','Campaign 1','Campaign 2'];
    var inactive = ['','Campaign 3'];
    var $names = $('#campaignNames');
    var $select = $('#campaignSelect');
    var namesList = '';

    /* ** FIX ** */
    if($select.val() === 'all'){
        for(var x=1; x<all.length; x++){
            namesList += '<a href=\"javascript:switchCampaign(\''+x+'\');\">' + all[x] + '</a><br>';
        }
    }
    else if($select.val() === 'active'){
        for(var x=1; x<active.length; x++){
            namesList += '<a href=\"javascript:switchCampaign(\''+x+'\');\">' + active[x] + '</a><br>';
        }
    }
    else if($select.val() === 'inactive'){
        for(var x=1; x<inactive.length; x++){
            namesList += '<a href=\"javascript:switchCampaign(\'3\');\">' + inactive[x] + '</a><br>';
        }
    }
    else {
        namesList += '';
    }
    $names.html(namesList);
}

/* Link Menus*/
$('[data-toggle=tab]').click(function(){

    var category = '[data-category="' + $(this).attr('data-category') + '"]';
    var main = '#mainNav a' + category;
    var side = '#sideNav a' + category;

    $('#header').find('.category').removeClass('active');
    $('span' + category).parent().addClass('active');

    /* hides associated pane when active tab is clicked again
    if ($(this).parent().hasClass('active')){
        $('#home-pane').toggleClass('active');
        $('#headerTitle').slideDown();
        $('#header').find('.category').addClass('active');

        $($(this).attr('href')).toggleClass('active');
    }*/

        $('#headerTitle').slideUp();
        /* link side and main nav menus */
        if($(this).attr("data-parent") === "mainNav"){
            $('#sideNav').find('li').removeClass('active');
            $(side).parent().toggleClass('active');
        }
        else{
            $('#mainNav').find('li').removeClass('active');
            $(main).parent().toggleClass('active');
        }
});

/* Return Home */
function closeDisplay(){
    var cat = $('.tab-content').find('.active').attr('data-category');
    var curr = $('#breadcrumbCurrent').html();

    if(cat !== 'home' || curr !== ''){
        $('#mainDisplay').load("Main.html");
        $('#home-pane').css('visibility','visible');
        $('#mainNav a[data-category="home"]').click();
        $('#headerTitle').slideDown();
        $('#breadcrumbCurrent').html('');

        $('#modResultsBtn').removeClass('active');
        $('#modResultsPane').hide();
        $('#modCaret').removeClass('down');
    }
}

function switchCampaign(num){
    var $mainDisplay = $('#mainDisplay');
    var $breadcrumb = $('#breadcrumbCurrent');
    var $home = $('#mainNav a[data-category="home"]');
    /*var campaignFile = 'Campaign' + num + '.html';
    $('#mainDisplay').load(campaignFile);*/
    var cat = $('.tab-content').find('.active').attr('data-category');

    switch(num){
        case '1':
        $mainDisplay.html("");
        $mainDisplay.load("Campaign1.html");
            $home.click();
            $('#opportunities-pane').find('.widget').matchHeight({byRow:false});
            $('#sales-marketing-pane').find('.widget').matchHeight({byRow:false});
            $breadcrumb.html('Campaign 1');
            break;
        case '2':
        $mainDisplay.html("");
            $mainDisplay.load('Campaign2.html');
            $home.click();
            $('#opportunities-pane').find('.widget').matchHeight({byRow:false});
            $('#sales-marketing-pane').find('.widget').matchHeight({byRow:false});
            $breadcrumb.html('Campaign 2');
            break;
        case '3':
        $mainDisplay.html("");
            $mainDisplay.load('Campaign3.html');
            $home.click();
            $('#opportunities-pane').find('.widget').matchHeight({byRow:false});
            $('#sales-marketing-pane').find('.widget').matchHeight({byRow:false});
            $breadcrumb.html('Campaign 3');
            break;
        case 'All':
        $mainDisplay.html("");
            $mainDisplay.load('Main.html');
            $('#home-pane').css('visibility','hidden');
            $home.click();
            $('#opportunities-pane').find('.widget').matchHeight({byRow:false});
            $('#sales-marketing-pane').find('.widget').matchHeight({byRow:false});
            $breadcrumb.html('');
            break;
        default:
            break;
    }

    $('a[data-category="'+cat+'"]').click();
}

/* Toggle Modify Results Pane */
function openModResults(){
    $('#modResultsBtn').toggleClass('active');
    $('#modResultsPane').toggle();
    $('#modCaret').toggleClass('down');
}
