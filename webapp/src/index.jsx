// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';

import en from 'i18n/en.json';
import es from 'i18n/es.json';

import Icon from './components/icon.jsx';
import PostTypeJitsi from './components/post_type_jitsi';
import {startMeeting} from './actions';

function getTranslations(locale) {
    switch (locale) {
    case 'en':
        return en;
    case 'es':
        return es;
    }
    return {};
}

class PluginClass {
    initialize(registry, store) {
        registry.registerTranslations(getTranslations);
        registry.registerChannelHeaderButtonAction(
            <Icon/>,
            (channel) => {
                startMeeting(channel.id)(store.dispatch, store.getState);
            },
            'Start Jitsi Meeting'
        );
        registry.registerPostTypeComponent('custom_jitsi', PostTypeJitsi);
    }
}

global.window.registerPlugin('jitsi', new PluginClass());
