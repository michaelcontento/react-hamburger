import React from 'react/addons';
import { Navigation } from 'react-router';

const PureRenderMixin = React.addons.PureRenderMixin;
let registry = {};

function toggleFunc(name, action) {
    const navigation = registry[name];

    if (!navigation) {
        window.console.error(
            '[Hamburger.Toggle] No navigation found for name: ',
            name
        );
        return;
    }

    action = (action || 'all');
    const canClose = (action === 'all' || action === 'close');
    const canOpen = (action === 'all' || action === 'open');
    const isOpen = navigation.isOpen();

    if ((isOpen && canClose) || (!isOpen && canOpen)) {
        navigation.toggle();
    }
}

const Toggle = React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        action: React.PropTypes.string
    },

    toggle: function(event) {
        event.preventDefault();
        toggleFunc(this.props.name, this.props.action);
    },

    render: function() {
        const props = {
            onClick: this.toggle,
            onTap: this.toggle
        };

        return React.DOM.span(props, this.props.children);
    }
});

const ToggleLink = React.createClass({
    mixins: [PureRenderMixin, Navigation],

    propTypes: {
        to: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,
        name: React.PropTypes.string.isRequired,
        action: React.PropTypes.string
    },

    toggle: function(event) {
        event.preventDefault();
        toggleFunc(this.props.name, this.props.action);
        this.transitionTo(this.props.to, this.props.params);
    },

    render: function() {
        const props = {
            onClick: this.toggle,
            onTap: this.toggle
        };

        return React.DOM.a(props, this.props.children);
    }
});

const Menu = React.createClass({
    mixins: [PureRenderMixin],

    registryOwner: false,
    cachedContentDom: null,

    propTypes: {
        name: React.PropTypes.string.isRequired,
        contentId: React.PropTypes.string.isRequired,
        renderer: React.PropTypes.object.isRequired
    },

    componentWillMount: function() {
        if (registry[this.props.name]) {
            window.console.error(
                '[Hamburger.Menu] Another navigation already mounted with name:',
                this.props.name
            );
            return;
        }

        registry[this.props.name] = this;
        this.registryOwner = true;
    },

    componentWillUnmount: function() {
        if (this.registryOwner) {
            delete registry[this.props.name];
            this.registryOwner = false;
        }
    },

    contentDom: function() {
        if (!this.cachedContentDom) {
            this.cachedContentDom = document.getElementById(
                this.props.contentId
            );
        }

        if (!this.cachedContentDom) {
            window.console.error(
                '[Hamburger.Menu] There is no content element with id:',
                this.props.contentId
            );
        }

        return this.cachedContentDom;
    },

    toggle: function() {
        if (!this.contentDom()) {
            return;
        }

        this.rendererToggle(this.isOpen());
    },

    getInitialState: function() {
        return this.props.renderer.getInitialState.call(this);
    },

    rendererToggle: function(isOpen) {
        return this.props.renderer.toggle.call(this, isOpen);
    },

    isOpen: function() {
        return this.props.renderer.isOpen.call(this);
    },

    render: function() {
        return this.props.renderer.render.call(this);
    }
});

export default { Menu, Toggle, ToggleLink };
