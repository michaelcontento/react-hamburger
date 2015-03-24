import React from 'react/addons';

import Registry from './Registry';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
    mixins: [PureRenderMixin],

    registryOwner: false,
    cachedContentDom: null,

    propTypes: {
        name: React.PropTypes.string.isRequired,
        contentId: React.PropTypes.string.isRequired,
        renderer: React.PropTypes.object.isRequired
    },

    componentWillMount: function() {
        if (Registry.has(this.props.name)) {
            window.console.error(
                '[Hamburger] Another navigation already mounted with name:',
                this.props.name
            );
            return;
        }

        Registry.set(this.props.name, this);
        this.registryOwner = true;
    },

    componentWillUnmount: function() {
        if (this.registryOwner) {
            Registry.delete(this.props.name);
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
                '[Hamburger] There is no content element with id:',
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
