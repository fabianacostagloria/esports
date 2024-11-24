import { TouchableOpacity, TouchableOpacityProps, ImageBackground, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import { THEME } from "../../theme";

// Interface defining the structure of game data
export interface GameCardProps {
    id: string;
    title: string;
    _count: {
        ads: number;
    };
    bannerUrl: string; // This field contains the relative path of the image
}

interface Props extends TouchableOpacityProps {
    data: GameCardProps;
}

// Function that resolves the image path
const getImage = (bannerUrl: string) => {
    // The relative image path needs to be mapped to require
    switch (bannerUrl) {
        case "./../../assets/games/game-1.png":
            return require("../../assets/games/game-1.png");
        case "./../../assets/games/game-2.png":
            return require("../../assets/games/game-2.png");
        case "./../../assets/games/game-3.png":
            return require("../../assets/games/game-3.png");
        case "./../../assets/games/game-4.png":
            return require("../../assets/games/game-4.png");
        case "./../../assets/games/game-5.png":
            return require("../../assets/games/game-5.png");
        case "./../../assets/games/game-6.png":
            return require("../../assets/games/game-6.png");
        default:
            return null; // Default image or no image
    }
};

export function GameCard({ data, ...rest }: Props) {
    // Get the correct image path from bannerUrl
    const imageSource = getImage(data.bannerUrl);

    return (
        <TouchableOpacity style={styles.container} {...rest}>
            {imageSource ? (
                <ImageBackground style={styles.cover} source={imageSource}>
                    <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
                        <Text style={styles.name}> {data.title} </Text>
                        <Text style={styles.ads}> {data._count.ads} ads </Text>
                    </LinearGradient>
                </ImageBackground>
            ) : (
                // If the image is not found, you can display a default image or a placeholder
                <Text>Image not available</Text>
            )}
        </TouchableOpacity>
    );
}
