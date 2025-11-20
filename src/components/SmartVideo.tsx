import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import Video, { ReactVideoProps } from 'react-native-video';
import { Colors } from '../constants/styles';
import { Icon } from './Icon';

interface SmartVideoProps extends ReactVideoProps {
    containerStyle?: StyleProp<ViewStyle>;
}

export const SmartVideo: React.FC<SmartVideoProps> = ({
    source,
    style,
    containerStyle,
    resizeMode = 'cover',
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoadStart = () => {
        setIsLoading(true);
        setHasError(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <View style={[styles.container, containerStyle, style]}>
            <Video
                source={source}
                style={[StyleSheet.absoluteFill, styles.video]}
                onLoadStart={handleLoadStart}
                onLoad={handleLoad}
                onError={handleError}
                resizeMode={resizeMode}
                {...props}
            />

            {isLoading && !hasError && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            )}

            {hasError && (
                <View style={styles.errorContainer}>
                    <Icon name="alert-circle" library="feather" size={32} color="white" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        overflow: 'hidden',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    errorContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
});
