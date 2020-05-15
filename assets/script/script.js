(function($){

    function masterplan() {
        var $masterplan = $(this),
            $navList = $masterplan.find('.masterplan__list')
            $navItem = $navList.find('.masterplan__list-item'),
            $svg = $masterplan.find('svg'),
            $svgPath = $svg.find('path'),
            $masterplanSelect = $masterplan.find('.masterplan__select'),
            $selectOption = $masterplanSelect.find('option');

        $svgPath.addClass('active');

        $navItem.each(function() {
            var $thisNav = $(this),
                path = $thisNav.data('href'),
                $thisPath = $svg.find("[data-masterplan='#" + path + "']");            

            $thisNav.mouseover(function() {
                $navItem.not($thisNav).add($svgPath.not($thisPath)).removeClass('active');
                $thisNav.add($thisPath).addClass('active');
                $masterplanSelect.find("[value='" + path + "']").prop('selected', true);

                if (!$thisPath.length) {
                    $svgPath.addClass('active');
                }
            })
        })

        $svgPath.each(function() {
            var $thisPath = $(this);

            $thisPath.mouseover(function() {
                if ($thisPath.data('masterplan')) {
                    var path = $thisPath.data('masterplan').split('#')[1];
                    
                    $svgPath.add($navItem).removeClass('active');
                    $svg.find("[data-masterplan='#" + path + "']").add($navList.find("[data-href='" + path + "']")).addClass('active');
                    $masterplanSelect.find("[value='" + path + "']").prop('selected', true);
                }
            })
        })

        $masterplanSelect.on('change', function() {
            var $thisOption = $(this).find(':selected'),
                path = $thisOption.val();

            $svgPath.add($navItem).removeClass('active');
            $svg.find("[data-masterplan='#" + path + "']").add($navList.find("[data-href='" + path + "']")).addClass('active');
        })
    }

    $(document).ready(function() {
        $('.masterplan').each(masterplan);
    })

})(jQuery)