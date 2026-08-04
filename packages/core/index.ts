/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Public entry point for the Quevy UI core package.
 *
 * @packageDocumentation
 */

export * from './base/index.js';
export * from './controllers/index.js';
export * from './styles/index.js';

export {
    query as queryDecorator,
    queryAll as queryAllDecorator,
    watch,
} from './decorators/index.js';

export {
    createEvent,
    dispatch,
    listen as eventListen,
} from './events/index.js';

export type {
    CreateEventOptions,
    EventListenerOptions,
    EventListener,
} from './events/index.js';

export {
    FocusableMixin,
    DisabledMixin,
    FormAssociatedMixin,
} from './mixins/index.js';

export type {
    Constructor as MixinConstructor,
    FocusableElement,
    DisableableElement,
    FormAssociatedElement,
} from './mixins/index.js';

export * from './utils/index.js';