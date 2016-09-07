JBNodes['kfeedbackSubmittedGoal'] = {
    title: '<i class="fa fa-trophy"></i> <span class="node-type">KFeedback Submit Goal</span>',
    previewUrl: '/theme/apps/kfeedback/jb/kfeedbackSubmittedGoalNode.png',
    ports: {
        timeoutNode: {
            label: 'timeout',
            title: 'When timeout',
            maxConnections: 1
        },
        nextNodeId: {
            label: 'then',
            title: 'When completed',
            maxConnections: 1
        }
    },

    customNodeType: 'kfeedbackSubmittedGoal',

    settingEnabled: false,

    initSettingForm: function (form) {
    },

    showSettingForm: function (form, node) {
    }
};
