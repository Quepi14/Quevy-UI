import { state } from "lit/decorators.js";
import type { QvElement, MixinConstructor } from "@quevy/core";
import { localeStore, resolveLocale, type QvLocale } from "./locale.js";

export interface LocalizedElement {
    readonly locale: QvLocale;
}

export function LocalizedMixin<TBase extends MixinConstructor<QvElement>>(
    base: TBase,
): TBase & MixinConstructor<LocalizedElement> {
    abstract class Mixin extends base implements LocalizedElement {
        @state() private _locale: QvLocale = 'id';
        private unsubscribeLocale?: () => void;

        public get locale(): QvLocale {
            return this._locale;
        }

        public override onConnected(): void {
            super.onConnected?.();
            this._locale = resolveLocale(this as Element);
            this.unsubscribeLocale = localeStore.subscribe(() => {
                this._locale = resolveLocale(this as Element);
            });
        }

        public override onDisconnected(): void {
            this.unsubscribeLocale?.();
            super.onDisconnected?.();
        }
    }

    return Mixin;
}