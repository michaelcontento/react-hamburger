let registry = {};

export default {
    has(name) {
        return registry.hasOwnProperty(name);
    },

    set(name, obj) {
        registry[name] = obj;
    },

    get(name) {
        return registry[name];
    },

    delete(name) {
        delete registry[name];
    },

    toggle(name, action) {
        if (!this.has(name)) {
            window.console.error(
                '[Hamburger] No navigation found for name: ',
                name
            );
            return;
        }

        const navigation = this.get(name);
        action = (action || 'all');
        const canClose = (action === 'all' || action === 'close');
        const canOpen = (action === 'all' || action === 'open');
        const isOpen = navigation.isOpen();

        if ((isOpen && canClose) || (!isOpen && canOpen)) {
            navigation.toggle();
        }
    }
};
