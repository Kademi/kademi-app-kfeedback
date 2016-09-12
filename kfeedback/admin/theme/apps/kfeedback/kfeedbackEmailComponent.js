(function ($) {
    var KEditor = $.keditor;
    var flog = KEditor.log;

    KEditor.components['kfeedbackEmail'] = {
        settingEnabled: true,

        settingTitle: 'KFeedback Settings',

        initSettingForm: function (form, keditor) {
            flog('initSettingForm "kfeedbackEmail" component');

            form.append(
                '<div class="form-horizontal">' +
                '   <div class="form-group">' +
                '       <label for="task-list-height" class="col-sm-12">Height</label>' +
                '       <div class="col-sm-12">' +
                '           <input type="number" id="task-list-height" class="form-control" value="" />' +
                '       </div>' +
                '   </div>' +
                '</div>'
            );

            form.find('#task-list-height').on('change', function () {
                var number = this.value;
                var component = keditor.getSettingComponent();
                var dynamicElement = component.find('[data-dynamic-href]');

                if (number === undefined || number === null || number === '') {
                    number = '';
                } else {
                    if (isNaN(number) || +number <= 200) {
                        number = 200;
                        this.value = number;
                    }
                }

                component.attr('data-height', this.value);
                keditor.initDynamicContent(dynamicElement);
            });
        },

        showSettingForm: function (form, component, keditor) {
            flog('showSettingForm "kfeedbackEmail" component', form, component, keditor);

            var dataAttributes = keditor.getDataAttributes(component, ['data-type'], false);
            form.find('#task-list-height').val(dataAttributes['data-height']);
        }
    };

})(jQuery);