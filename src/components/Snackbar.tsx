import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Platform,
    SafeAreaView,
} from 'react-native';
import { Colors, Typography, Spacing, Shadows, BorderRadius } from '../constants/styles';
import { Icon } from './Icon';

type SnackbarType = 'success' | 'error' | 'info';

interface SnackbarOptions {
    message: string;
    type?: SnackbarType;
    duration?: number;
    action?: {
        label: string;
        onPress: () => void;
    };
}

// Singleton manager to control snackbar from anywhere
class SnackbarManager {
    private static showFn: ((options: SnackbarOptions) => void) | null = null;

    static setRef(show: (options: SnackbarOptions) => void) {
        this.showFn = show;
    }

    static show(options: SnackbarOptions) {
        if (this.showFn) {
            this.showFn(options);
        } else {
            console.warn('Snackbar not initialized');
        }
    }
}

export const Snackbar: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState<SnackbarOptions>({ message: '' });
    const translateY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        SnackbarManager.setRef(show);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const show = (newOptions: SnackbarOptions) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        setOptions(newOptions);
        setVisible(true);

        // Animate in
        Animated.parallel([
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                friction: 8,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();

        // Auto hide
        const duration = newOptions.duration || 4000;
        timerRef.current = setTimeout(hide, duration);
    };

    const hide = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 100,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setVisible(false);
        });
    };

    if (!visible) return null;

    const getBackgroundColor = () => {
        switch (options.type) {
            case 'success':
                return '#10B981'; // Green
            case 'error':
                return '#EF4444'; // Red
            case 'info':
            default:
                return '#3B82F6'; // Blue
        }
    };

    const getIconName = () => {
        switch (options.type) {
            case 'success':
                return 'check-circle';
            case 'error':
                return 'alert-circle';
            case 'info':
            default:
                return 'info';
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} pointerEvents="box-none">
            <Animated.View
                style={[
                    styles.container,
                    {
                        backgroundColor: getBackgroundColor(),
                        transform: [{ translateY }],
                        opacity,
                    },
                ]}
            >
                <View style={styles.content}>
                    <Icon
                        name={getIconName()}
                        library="feather"
                        size={20}
                        color="#FFFFFF"
                    />
                    <Text style={styles.message} numberOfLines={2}>
                        {options.message}
                    </Text>
                </View>

                {options.action && (
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                            options.action?.onPress();
                            hide();
                        }}
                    >
                        <Text style={styles.actionText}>{options.action.label}</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.closeButton} onPress={hide}>
                    <Icon name="x" library="feather" size={18} color="#FFFFFF" />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};

export { SnackbarManager };

const styles = StyleSheet.create({
    safeArea: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
    },
    container: {
        margin: Spacing.lg,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...Shadows.lg,
        minHeight: 50,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    message: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        marginLeft: Spacing.xs,
    },
    actionButton: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: BorderRadius.sm,
        marginRight: Spacing.sm,
    },
    actionText: {
        color: '#FFFFFF',
        fontSize: Typography.fontSize.xs,
        fontWeight: Typography.fontWeight.bold,
    },
    closeButton: {
        padding: Spacing.xs,
    },
});
