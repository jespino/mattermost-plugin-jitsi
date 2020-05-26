import React from 'react';
import moment from 'moment';
import {FormattedMessage} from 'react-intl';

import {Svgs} from '../../constants';

import PropTypes from 'prop-types';
import {makeStyleFromTheme} from 'mattermost-redux/utils/theme_utils';

export default class PostTypeJitsi extends React.PureComponent {
    static propTypes = {

        /*
         * The post to render the message for.
         */
        post: PropTypes.object.isRequired,

        /*
         * Logged in user's theme.
         */
        theme: PropTypes.object.isRequired,

        /*
         * Creator's name.
         */
        creatorName: PropTypes.string.isRequired,

        /*
         * Actions
         */
        actions: PropTypes.shape({
            enrichMeetingJwt: PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        mentionKeys: []
    };

    constructor(props) {
        super(props);

        this.state = {
            meetingJwt: null
        };
    }

    componentDidMount() {
        const {post} = this.props;
        if (post.props.jwt_meeting) {
            this.props.actions.enrichMeetingJwt(post.props.meeting_jwt).then((response) => {
                this.setState({meetingJwt: response.data.jwt});
            });
        }
    }

    render() {
        const style = getStyle(this.props.theme);
        const post = this.props.post;
        const props = post.props || {};

        let subtitle;

        let meetingLink = props.meeting_link;
        if (this.state.meetingJwt) {
            meetingLink += '?jwt=' + this.state.meetingJwt;
        } else if (props.jwt_meeting) {
            meetingLink += '?jwt=' + props.meeting_jwt;
        }

        const preText = (
            <FormattedMessage
                id='jitsi.creator-has-started-a-meeting'
                defaultMessage='{creator} has started a meeting'
                values={{creator: this.props.creatorName}}
            />
        );
        let untilDate = '';
        if (props.jwt_meeting) {
            let date = moment.unix(props.jwt_meeting_valid_until);
            if (date.isValid()) {
                date = date.format('dddd, MMMM Do YYYY, h:mm:ss a');
            } else {
                date = props.jwt_meeting_valid_until;
            }
            untilDate = (
                <div style={style.validUntil}>
                    <FormattedMessage
                        id='jitsi.link-valid-until'
                        defaultMessage='Meeting link valid until: '
                    />
                    <b>{date}</b>
                </div>
            );
        }

        const content = (
            <div>
                <a
                    className='btn btn-lg btn-primary'
                    style={style.button}
                    target='_blank'
                    rel='noopener noreferrer'
                    href={meetingLink}
                >
                    <i
                        style={style.buttonIcon}
                        dangerouslySetInnerHTML={{__html: Svgs.VIDEO_CAMERA_3}}
                    />
                    <FormattedMessage
                        id='jitsi.join-meeting'
                        defaultMessage='JOIN MEETING'
                    />
                </a>
            </div>
        );

        if (props.meeting_personal) {
            subtitle = (
                <span>
                    <FormattedMessage
                        id='jitsi.personal-meeting-id'
                        defaultMessage='Personal Meeting ID (PMI): '
                    />
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={meetingLink}
                    >
                        {props.meeting_id}
                    </a>
                </span>
            );
        } else {
            subtitle = (
                <span>
                    <FormattedMessage
                        id='jitsi.meeting-id'
                        defaultMessage='Meeting ID: '
                    />
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={meetingLink}
                    >
                        {props.meeting_id}
                    </a>
                </span>
            );
        }

        let title = (
            <FormattedMessage
                id='jitsi.default-title'
                defaultMessage='Jitsi Meeting'
            />
        );
        if (props.meeting_topic) {
            title = props.meeting_topic;
        }

        return (
            <div>
                {preText}
                <div style={style.attachment}>
                    <div style={style.content}>
                        <div style={style.container}>
                            <h1 style={style.title}>
                                {title}
                            </h1>
                            {subtitle}
                            <div>
                                <div style={style.body}>
                                    {content}
                                    {untilDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const getStyle = makeStyleFromTheme((theme) => {
    return {
        attachment: {
            marginLeft: '-20px',
            position: 'relative'
        },
        content: {
            borderRadius: '4px',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: '#BDBDBF',
            margin: '5px 0 5px 20px',
            padding: '2px 5px'
        },
        container: {
            borderLeftStyle: 'solid',
            borderLeftWidth: '4px',
            padding: '10px',
            borderLeftColor: '#89AECB'
        },
        body: {
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingRight: '5px',
            width: '100%'
        },
        title: {
            fontSize: '16px',
            fontWeight: '600',
            height: '22px',
            lineHeight: '18px',
            margin: '5px 0 1px 0',
            padding: '0'
        },
        button: {
            fontFamily: 'Open Sans',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            lineHeight: '19px',
            marginTop: '12px',
            borderRadius: '4px',
            color: theme.buttonColor
        },
        buttonIcon: {
            paddingRight: '8px',
            fill: theme.buttonColor
        },
        validUntil: {
            marginTop: '10px'
        }
    };
});
