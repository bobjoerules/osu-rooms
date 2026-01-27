// Type extensions for React Native components
import 'react-native';

declare module 'react-native' {
    export interface SwitchProps {
        /**
         * Custom prop for web to style the active thumb color.
         * This is not part of the official React Native API but is supported on web.
         */
        activeThumbColor?: string;
    }
}
