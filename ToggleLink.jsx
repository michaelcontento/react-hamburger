import React from 'react/addons';
import assign from 'react/lib/Object.assign';
import { Navigation, Link } from 'react-router';

import Registry from './Registry';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
    mixins: [PureRenderMixin, Navigation],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        action: React.PropTypes.string
    },

    toggle: function(event) {
        event.stopPropagation();
        event.preventDefault();

        Registry.toggle(this.props.name, this.props.action);

        this.transitionTo(this.props.to, this.props.params);
    },

    render: function() {
        const props = assign({}, this.props, {
            onClick: this.toggle,
            onTap: this.toggle
        });

        delete props.name;
        delete props.action;

        return (
            <Link {...props}>
                {this.props.children}
            </Link>
        );
    }
});
