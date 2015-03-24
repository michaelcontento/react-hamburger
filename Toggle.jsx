import React from 'react/addons';
import assign from 'react/lib/Object.assign';

import Registry from './Registry';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        action: React.PropTypes.string
    },

    toggle: function(event) {
        event.stopPropagation();
        event.preventDefault();

        Registry.toggle(this.props.name, this.props.action);
    },

    render: function() {
        const props = assign({}, this.props, {
            onClick: this.toggle,
            onTap: this.toggle
        });

        delete props.name;
        delete props.action;

        return (
            <a {...props}>
                {this.props.children}
            </a>
        );
    }
});
